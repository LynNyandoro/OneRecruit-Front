import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Select,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const generateUsername = (firstName, lastName) => {
  const randomNum = Math.floor(Math.random() * 1000);
  return `${firstName.toLowerCase()}_${lastName.toLowerCase()}${randomNum}`;
};

const generatePassword = (length = 12) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

export default function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  useEffect(() => {
    if (firstName && lastName) {
      setUsername(generateUsername(firstName, lastName));
    }
  }, [firstName, lastName]);

  useEffect(() => {
    setPassword(generatePassword());
  }, []);

  const handleSubmit = () => {
    if (firstName && lastName && email && gender && age && role) {
      axios.get(`http://localhost:9081/user/add?firstName=${firstName}&lastName=${lastName}&email=${email}&gender=${gender}&age=${age}&role=${role}`)
        .then(response => {
          console.log(response.data);
          // Clear form fields
          setFirstName('');
          setLastName('');
          setEmail('');
          setGender('');
          setAge('');
          setRole('');
          setPassword(generatePassword());
          // Show toast notification
          toast({
            title: 'Account created.',
            description: 'Account has been successfully created.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(error => {
          console.error(error);
          toast({
            title: 'Error.',
            description: 'Failed to create account.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: 'Error.',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const roleOptions = [
    { value: 'candidate', label: 'Candidate' },
    { value: 'recruiter', label: 'Recruiter' },
  ];

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
        maxW={'100%'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create User
        </Heading>
        <HStack>
          <FormControl id="first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              aria-label="First Name"
            />
          </FormControl>
          <FormControl id="last-name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              aria-label="Last Name"
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              isReadOnly
              aria-label="Username"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl id="gender" isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              aria-label="Gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              aria-label="Age"
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              isReadOnly
              aria-label="Password"
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl id="role" isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              id="role"
              placeholder="Select role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Role"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{ bg: 'red.500' }}
            onClick={() => {
              setFirstName('');
              setLastName('');
              setEmail('');
              setGender('');
              setAge('');
              setRole('');
              setPassword('');
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{ bg: 'blue.500' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
