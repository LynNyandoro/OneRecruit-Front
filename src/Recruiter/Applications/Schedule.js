// src/ScheduleInterview.js
import React from 'react';
import { Box, Button, Center, Stack, Text, Input, useToast } from '@chakra-ui/react';

const ScheduleInterview = ({ handleClose }) => {
  const toast = useToast();

  const handleSchedule = () => {
    // Simulated scheduling logic
    const scheduledDate = new Date().toDateString(); // Replace with actual scheduling logic

    // Display toast notification
    toast({
      title: 'Interview Scheduled',
      description: `Interview scheduled for ${scheduledDate}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Close the scheduling pop-up
    handleClose();
  };

  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
    >
      <Box
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
        width="400px"
        textAlign="center"
      >
        <Text fontSize="xl" mb={4}>
          Schedule Interview
        </Text>
        <Stack spacing={3}>
          <Input placeholder="Date" type="date" />
          <Input placeholder="Time" type="time" />
          <Input placeholder="Location" />
        </Stack>
        <Stack mt={4} direction="row" spacing={4} justify="center">
          <Button onClick={handleClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={handleSchedule}>
            Schedule
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default ScheduleInterview;
