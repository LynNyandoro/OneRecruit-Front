import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

export default function Post() {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [skills, setSkills] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    if (!jobTitle || !description || !qualifications || !skills || !workExperience || !expiryDate) {
      toast({
        title: 'Error.',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const jobData = {
      jobTitle,
      description,
      qualifications,
      skills,
      workExperience,
      expiryDate,
    };

    try {
      const response = await fetch('http://localhost:9081/job/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        toast({
          title: 'Job posted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log('Job posted successfully');
        // Clear form fields after successful submission
        setJobTitle('');
        setDescription('');
        setQualifications('');
        setSkills('');
        setWorkExperience('');
        setExpiryDate('');
      } else {
        toast({
          title: 'Failed to post job.',
          description: 'Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.error('Failed to post job');
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to post job.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    // Clear form fields on cancel
    setJobTitle('');
    setDescription('');
    setQualifications('');
    setSkills('');
    setWorkExperience('');
    setExpiryDate('');
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Post New Job
        </Heading>
        <FormControl id="jobTitle" isRequired>
          <FormLabel>Job Title</FormLabel>
          <Input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Job Description</FormLabel>
          <Textarea
            borderColor="gray.300"
            _hover={{
              borderRadius: 'gray.300',
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5} // Adjust rows as needed
          />
        </FormControl>
        <FormControl id="qualifications" isRequired>
          <FormLabel>Qualifications</FormLabel>
          <Textarea
            borderColor="gray.300"
            _hover={{
              borderRadius: 'gray.300',
            }}
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            rows={5} // Adjust rows as needed
          />
        </FormControl>
        <FormControl id="skills" isRequired>
          <FormLabel>Skills</FormLabel>
          <Textarea
            borderColor="gray.300"
            _hover={{
              borderRadius: 'gray.300',
            }}
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows={5} // Adjust rows as needed
          />
        </FormControl>
        <FormControl id="workExperience" isRequired>
          <FormLabel>Work Experience</FormLabel>
          <Input
            type="text"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
          />
        </FormControl>
        <FormControl id="expiryDate" isRequired>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
