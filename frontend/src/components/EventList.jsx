import React from 'react';
import EventItem from './EventItem';

function EventList({ events, deleteEvent }) {
  return (
    <div>
      {events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          name={event.name}
          day={event.day}
          month={event.month}
          deleteEvent={deleteEvent}
        />
      ))}
    </div>
  );
}

export default EventList;
