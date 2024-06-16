import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  SimpleGrid,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';

import ScheduleInterview from './Schedule'; // Assuming you have a component for scheduling interviews

export default function Applications() {
  const [candidates, setCandidates] = useState([]); // State to hold candidates data
  const [isInterviewScheduled, setIsInterviewScheduled] = useState(false); // State to manage interview scheduling
  const backgroundColor = useColorModeValue('gray.50', 'gray.800'); // Adjusted to use Chakra UI's color mode

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Fetch candidates from API endpoint
        const response = await axios.get('http://localhost:9081/job-application/shortListed');
        setCandidates(response.data); // Update state with fetched candidates
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates(); // Call the fetchCandidates function on component mount
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Function to handle opening interview scheduling
  const handleOpenSchedule = () => {
    setIsInterviewScheduled(true);
  };

  // Function to handle closing interview scheduling
  const handleCloseSchedule = () => {
    setIsInterviewScheduled(false);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      maxW={'100%'}
      w={'auto'}
      bg={backgroundColor} // Using Chakra UI's color mode for background color
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={4}
      mx={'auto'}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Shortlisted Candidates</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          A curated list of candidates carefully selected by our AI system. Each
          candidate has been matched with precision against the job
          requirements, ensuring that only the most suitable individuals are
          presented to you.
        </Text>
      </Stack>

      <br />

      {/* Display candidates in a responsive grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {candidates.map((candidate) => (
          <Center key={candidate.id}>
            <Box
              maxW={'320px'}
              w={'full'}
              bg={backgroundColor}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Avatar
                size={'xl'}
                src={candidate.avatarUrl} // Assuming candidate object has avatarUrl property
                alt={'Avatar Alt'}
                mb={4}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: 'green.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3,
                }}
              />
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {candidate.fullName}
              </Heading>
              <Text fontWeight={600} color={'gray.500'} mb={4}>
                {candidate.job}
              </Text>
              <Text
                textAlign={'center'}
                color={'gray.700'}
                px={3}
              >
                {candidate.education}
                <br />
                <Text
                  textTransform="uppercase"
                  padding={2}
                  fontWeight={500}
                >
                  Work Experience: {candidate.workExperience}
                </Text>
              </Text>
              <Stack
                id='skills'
                align={'center'}
                justify={'center'}
                direction={'row'}
                mt={6}
              >
                {/* Display candidate skills as badges */}
                {candidate.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    px={2}
                    py={1}
                    bg={'gray.50'}
                    fontWeight={'400'}
                    mr={2}
                  >
                    {skill}
                  </Badge>
                ))}
              </Stack>
              <Stack mt={8} direction={'row'} spacing={4}>
                {/* Buttons to reject or accept candidates */}
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  _focus={{
                    bg: 'gray.200',
                  }}
                >
                  REJECT
                </Button>
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500',
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}
                  onClick={handleOpenSchedule} // Open interview scheduling
                >
                  ACCEPT
                </Button>
              </Stack>
              {/* Conditionally render interview scheduling component */}
              {isInterviewScheduled && (
                <ScheduleInterview handleClose={handleCloseSchedule} />
              )}
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </Box>
  );
}
