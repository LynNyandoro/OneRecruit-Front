import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const toast =useToast();
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:9081/login');
  //       setUsers(response.data);
  //     } catch (error) {
  //       setError('An error occurred while fetching user data. Please try again.');
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // const handleChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const matchingUser = users.find(
  //     (user) => user.username === credentials.username && user.password === credentials.password
  //   );
  //   if (matchingUser) {
  //     console.log(matchingUser);
  //     navigate('/recruiter/home')
      
  //   } else {
  //     setError('Invalid username or password. Please try again.');
  //   }
  // };

  const [username, setUsername] = useState('')
  const [password, setPass] = useState('')


  // const loin = () =>{

  //   axios.get('http://localhost:9081/login', 
  //     {
  //       params:{
  //         username,
  //         password
  //       }
       
  //     }).then(response =>{
  //       if (response.data.sucess) {
  //         console.log("mmmm", response)
  //         navigate('/recruiter/home')
  //       }else{

  //       }
  //     }).catch(error=>{

  //     })
  // }

  const loin = async (e) => {
    e.preventDefault();
  try {
    const response = await axios.post('http://localhost:9081/login', 
         {
            username:username,
            password:password     
          });
          if (response.data.success) {
            
            toast({
              title: 'Success',
              description: 'successs done' ,
              status: 'success',
              duration: 3000,
  
            });
            setLoading(false)
          } else {
            toast({
              title: 'Failed',
              description: response.data.message,
              status: 'error',
              duration: 3000,
  
            });
            setLoading(false)
          }
  } catch (error) {
    console.error('error found',error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      toast({
        title: "Error",
        description: `Server responded with ${error.response.status}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false)
    } else if (error.request) {
      // The request was made but no response was received
      toast({
        title: "Network Error",
        description: "Please Check your Internet Connection",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
      setLoading(false)
    } else {
      // Something happened in setting up the request that triggered an Error
      toast({
        title: "Network Error",
        description: `Error: ${error.message}`,
        status: "error",
        duration: 8000,
        isClosable: true,
      });

    }

    
  }
  }


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Welcome Recruiter</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={loin}>
          <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPass(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>
              {error && <Text color="red.500">{error}</Text>}
                <Button
                  type='submit'
                  bg={'orange.400'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
          </form>
            
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;