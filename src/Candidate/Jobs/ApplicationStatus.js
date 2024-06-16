import {
    Box,
    Stack,
    Divider,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Heading, Center, Text, Badge
  } from '@chakra-ui/react';
  
  export default function Status() {
    return (
      
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Job Title
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3} m={5}>
              Description  
          </Text>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              STATUS
            </Badge>
          </Stack>
        </Box>
      </Center>
    );
  }