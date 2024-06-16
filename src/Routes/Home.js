import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import lo2 from 'C:/Users/lnyandoro/Desktop/Attachment/AI Recruitment - Copy/recruit/src/Main.jpg';
import { useNavigate } from 'react-router-dom';

export default function SplitScreen() {
  const navigate = useNavigate();

  const handleJobSeekerClick = () => {
    navigate('/candidate/home');
  };

  const handleAdminClick = () => {
    navigate('/recruitlogin');
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '15%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'orange.400',
                zIndex: -1,
              }}
              >
              Welcome to
            </Text>
            <br />{' '}
            <Text color={'orange.400'} as={'span'}>
              OneRecruit
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Hire or get hired at NetOne - The World In One. OneRecruit, recruitment
            made easy, for both job seekers and recruiters.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'orange.400'}
              color={'white'}
              _hover={{
                bg: 'orange.500',
              }}
              onClick={handleJobSeekerClick}>
              Job Seeker
            </Button>
            <Button
              rounded={'full'}
              onClick={handleAdminClick}>
              Admin
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={lo2}
        />
      </Flex>
    </Stack>
  );
}
