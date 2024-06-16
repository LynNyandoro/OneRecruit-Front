import React, { useState } from 'react';
import { Box, Button, Heading, Flex, FormControl, Input, FormLabel, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    gender: '',
    age: '',
    password: '',
    role: 'Candidate',
    cv: null
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });
  };

  const handleSubmit = async () => {
    const { firstName, lastName, username, email, gender, age, password, role, cv } = formData;

    // Construct the URL with query parameters
    const url = `http://localhost:9081/user/add?firstName=${firstName}&lastName=${lastName}&username=${username}&email=${email}&gender=${gender}&age=${age}&password=${password}&role=${role}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/signin');
      } else {
        toast({
          title: 'Failed to create account.',
          description: 'Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create account.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error:', error);
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth="90%"
        width={{ base: '90%', md: '70%', lg: '50%' }}
        p={6}
        my={12}
        as="form"
      >
        <Heading
          color={'gray.800'}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          m={2}
        >
          Sign Up Now
        </Heading>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            id="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            id="email"
            placeholder="your-email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Gender</FormLabel>
          <Input
            id="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Age</FormLabel>
          <Input
            id="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <FormControl my={3} mb="2%" isRequired>
          <FormLabel>Upload CV</FormLabel>
          <Input
            id="cv"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  );
};

export default Signup;
