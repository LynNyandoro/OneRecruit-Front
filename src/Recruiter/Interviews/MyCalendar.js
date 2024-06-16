import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Flex, Stack, Heading, useColorModeValue, Icon, Center } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  
  const calendarStyle = {
    backgroundColor: useColorModeValue('white', 'gray.800'), 
    color: useColorModeValue('black', 'white'),
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
  };

  
  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: 'orange',
        color: 'white', 
        borderRadius: '4px', 
        border: 'none' 
      }
    };
  };

  return (
    <Stack
      spacing={4}
      w={'auto'}
      //maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      m={4}>
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} textAlign={'center'}>
      Scheduled Interviews
      </Heading>
      <br/>
      <div style={{ height: 500 }} m={100}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={calendarStyle} 
          eventPropGetter={eventStyleGetter}
        />
      </div> 
      </Stack>
  );
};

export default MyCalendar;
