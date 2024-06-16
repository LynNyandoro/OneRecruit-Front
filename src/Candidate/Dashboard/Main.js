import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  SimpleGrid,
  Container,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useColorModeValue
} from '@chakra-ui/react';

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [username, setUsername] = useState('jdoe'); // Replace with actual username or obtain dynamically
  const toast = useToast();

  // Ensure useColorModeValue is called at the top level
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:9081/job/all');
        setJobs(response.data.all);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: 'Error fetching jobs.',
          description: 'Failed to load job listings. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  const handleApply = (jobTitle) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
  };

  const confirmApplication = async () => {
    toast({
      title: 'Application Submitted',
      description: `Your application for ${selectedJob} has been submitted successfully.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <Center mt={20}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      maxW={'100%'}
      w={'auto'}
      bg={bgColor}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={4}
      mx={'auto'}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Available Jobs</Heading>
        <Text color={'gray.600'} bg={bgColor} fontSize={'xl'}>
          Explore and apply to our latest job openings. Each position is carefully curated to match your career aspirations.
        </Text>
      </Stack>

      <br />

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {jobs.map((job) => (
          <Center key={job.id}>
            <Box
              maxW={'320px'}
              w={'full'}
              bg={'gray.200'}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {job.jobTitle}
              </Heading>
              <Text fontSize={'small'} fontWeight={200} color={'gray.800'} mb={4}>
                {job.description}
              </Text>
              <Text color={'gray.600'} px={3}>
                <Stack id='skills' align={'center'} justify={'center'} direction={'row'} mt={6}>
                  <Badge fontSize={'small'} px={2} py={1} bg={'gray.50'} fontWeight={'400'} rounded={'lg'} mr={2}>
                    {job.qualifications}
                  </Badge>
                </Stack>
                <Text textTransform="uppercase" padding={2} fontWeight={500}>
                  Work Experience: {job.workExperience}
                </Text>
              </Text>
              <Stack id='skills' align={'center'} justify={'center'} direction={'row'} mt={6}>
                <Badge px={2} py={1} bg={'gray.50'} rounded={'lg'} fontWeight={'400'} mr={2}>
                  {job.skills}
                </Badge>
              </Stack>
              <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'orange.500'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{ bg: 'orange.400' }}
                  _focus={{ bg: 'orange.400' }}
                  onClick={() => handleApply(job.jobTitle)}
                >
                  Apply
                </Button>
              </Stack>
            </Box>
          </Center>
        ))}
      </SimpleGrid>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Application Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You are applying for</Text>
            <Text>Job Title: {selectedJob}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={confirmApplication}>
              Confirm Application
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
