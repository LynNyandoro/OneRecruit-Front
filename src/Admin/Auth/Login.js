// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Stack,
//   Link,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const signin = async () => {
//     try {
//       const response = await axios.post('http://localhost:9081/login', {
//         username,
//         password,
//       });

//       localStorage.setItem('authToken', response.data.token);
//       navigate('/recruiter/home');
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         setError('Invalid username or password');
//       } else {
//         setError('An error occurred. Please try again later.');
//       }
//     }
//   };

//   return (
//     <Flex
//       minH={'100vh'}
//       align={'center'}
//       justify={'center'}
//       bg={useColorModeValue('gray.50', 'gray.800')}
//     >
//       <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//         <Stack align={'center'}>
//           <Heading fontSize={'4xl'}>Welcome Recruiter</Heading>
//           <Text fontSize={'lg'} color={'gray.600'}>
//             Sign in to your account
//           </Text>
//         </Stack>
//         <Box
//           rounded={'lg'}
//           bg={useColorModeValue('white', 'gray.700')}
//           boxShadow={'lg'}
//           p={8}
//         >
//           <Stack spacing={4}>
//             <FormControl id="username">
//               <FormLabel htmlFor="username">Username</FormLabel>
//               <Input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="password">
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <Input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </FormControl>
//             {error && <Text color="red.500">{error}</Text>}
//             <Stack spacing={10}>
//               <Stack
//                 direction={{ base: 'column', sm: 'row' }}
//                 align={'start'}
//                 justify={'space-between'}
//               >
//                 <Checkbox>Remember me</Checkbox>
//                 <Link color={'blue.400'}>Forgot password?</Link>
//               </Stack>
//               <Button
//                 bg={'orange.400'}
//                 color={'white'}
//                 _hover={{
//                   bg: 'orange.500',
//                 }}
//                 onClick={signin}
//               >
//                 Sign in
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// }
// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Stack,
//   Link,
//   Button,
//   Heading,
//   useColorModeValue,
//   useToast,
//   Text,
//   Image,
//   InputGroup,
//   InputAddon,
// } from '@chakra-ui/react';
// import React, { useRef, useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FiUser } from 'react-icons/fi';
// import { RiLockPasswordFill } from 'react-icons/ri'
// import AuthService from '../../AuthService/AuthService';




// export default function SignInDetail() {
//   // const userRef = useRef();
//   // const errRef = useRef();
//   const [username, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [errMsg, setErrMsg] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loggedin, setLoggedIn] = useState(false)
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   //  token =  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJub2FocnVmYmFuZGEzNEBnbWFpbC5jb20iLCJpYXQiOjE2NzY4NDIwOTMsImV4cCI6MTY3NjkyODQ5M30.64LdBGuhh4ulvbi2_AlzETiNOLstSQB4eS6CQTo3hklMlcpN591tE3mgt2Q30Uq7MT0uy3Epg5kXk4GLS1ZD_Q

//   const login = async () => {
//     setErrMsg('')
//     const res = validation();
//     if (!res) {
//       console.log('validation failed')
//       toast({
//         title: 'Failed',
//         description: "Please enter details",
//         status: 'error',
//         duration: 6000,
//       });
//       return;

//     }
//     try {
//       setLoading(true);
//       setSuccess(true);


//       const response = await AuthService.Login({ username, password })

//       if (response.data.success) {
//         setSuccess(response.data.success);
//         localStorage.setItem("@token", response.data.value);
//         navigate('/admin/home')
//         toast({
//           title: 'Success',
//           description: 'Logged in successfully',
//           status: 'success',
//           duration: 6000,

//         });

//         setLoading(false)
//       }

//       else {
//         setLoading(false);
//         setSuccess(false);
//         toast({
//           title: "Failed To Log In",
//           description: "User Log In Failed: Incorrect Username / Password",
//           status: "error",
//         });
//       }

//     } catch (error) {
//       setSuccess(true);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         toast({
//           title: "Error",
//           description: `Server responded with ${error.message}`,
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//         setLoading(false)
//       } else if (error.request) {
//         // The request was made but no response was received
//         toast({
//           title: "Network Error",
//           description: "No response from server",
//           status: "error",
//           duration: 8000,
//           isClosable: true,
//         });
//         setLoading(false)
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         toast({
//           title: "Error",
//           description: `Error: ${error.message}`,
//           status: "error",
//           duration: 8000,
//           isClosable: true,
//         });
//         setLoading(false)
//       }

//     }


//   }
//   useEffect(() => {

//   }, [loading])

//   const validation = () => {

//     const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//     if (!username) {
//       setEmailError('username is Required');
//       return false;
//     }


//     if (!password) {
//       setPasswordError('Password is required');
//       return false;
//     }

//     return true

//   }

//   return (

//     <Flex
//       minW={'full'}
//       h="100vh"
//       w="100%"
//       bgSize={'cover'}
//       bgPosition={'right'}
//     >


//       <Stack spacing={6} mx={'auto'} maxW={'md'} py={12} px={6}>


//         <Stack align={'center'} >
//           <Heading fontSize={'25px'} color={'white'}>Sms-opt-out</Heading>

//         </Stack>
//         <Box
//           rounded={'lg'}
//           bg={useColorModeValue('white', 'gray.700')}
//           boxShadow={'lg'}
//           p={8}>
//           <Text textAlign={'center'} mt={-2}>Sign in</Text>
//           <Stack spacing={4}>
//             <FormControl id="email">
//               <FormLabel>Username</FormLabel>
//               <InputGroup>
//                 <InputAddon children={<FiUser />} />
//                 <Input type="text" placeholder='Enter username' onChange={(e) => setUserName(e.target.value)}
//                   onFocus={() => { setEmailError('') }} borderColor={emailError ? 'red.400' : 'gray.300'}
//                 />
//               </InputGroup>
//               <Text color={'red'}>{emailError} </Text>
//             </FormControl>
//             <FormControl id="password">
//               <FormLabel>Password</FormLabel>
//               <InputGroup>
//                 <InputAddon children={<RiLockPasswordFill />} />
//                 <Input type="password" onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => { setPasswordError('') }} borderColor={passwordError ? 'red.400' : 'gray.300'}
//                 />
//               </InputGroup>
//               <Text color={'red'}>{passwordError}</Text>
//             </FormControl>
//             <Stack spacing={10}>
//               <Stack
//                 direction={{ base: 'column', sm: 'row' }}
//                 align={'start'}
//                 justify={'space-between'}>
//               </Stack>
//               <Button
//                 isLoading={loading}
//                 loadingText='Loading'
//                 colorScheme='teal'
//                 variant='outline'
//                 spinnerPlacement='end'

//                 onClick={login}
//                 bg={'orange.400'}
//                 color={'white'}
//                 _hover={{
//                   bg: 'orange.500',
//                 }}>
//                 Sign In
//               </Button>
//               {/* <Text align={'center'} fontSize='15px' color='black'>Do you have an account? </Text> */}
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>

//     </Flex>
//   );
// }

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signin = async () => {
    try {
      const response = await axios.post('http://localhost:9081/login', {
        username,
        password,
      });
      
      // Assuming the token is returned in the response data
      const token = response.data.token;

      // Set token in axios defaults
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Store token in localStorage
      localStorage.setItem('authToken', token);

      navigate('/recruiter/home');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

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
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <Text color="red.500">{error}</Text>}
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'orange.400'}
                color={'white'}
                _hover={{
                  bg: 'orange.500',
                }}
                onClick={signin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
