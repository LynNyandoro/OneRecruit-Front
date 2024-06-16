import React from 'react';
import MyCalendar from './MyCalendar';

const Interviews = () => {
  const events = [
    {
      id: 0,
      title: 'Meeting',
      start: new Date(2024, 5, 10, 9, 0),
      end: new Date(2024, 5, 10, 10, 0),
    },
    {
      id: 1,
      title: 'Lunch',
      start: new Date(2024, 5, 12, 12, 0),
      end: new Date(2024, 5, 12, 13, 0),
    },
    // Add more events as needed
  ];

  return (
    <div>
      <MyCalendar events={events} />
    </div>
  );
};

export default Interviews;
