import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { useTelegram } from './hooks/useTelegram';
import CreateNewEvent from './components/CreateNewEvent';
import EventList from './components/EventList';

const API_URL = 'http://localhost:3000/api';

function App() {
  const { tg, user } = useTelegram();
  const [events, setEvents] = useState([]);

  const fetchEvents = useCallback(async () => {
    const res = await axios.get(`${API_URL}/events?telegramId${user.id}`);
    setEvents(res.data.events);
  }, [user]);

  useEffect(() => {
    tg.ready();

    fetchEvents();
  }, [tg, fetchEvents]);

  async function deleteEvent(eventId) {
    try {
      const res = await axios.delete(
        `${API_URL}/events/${eventId}?telegramId${user.id}`,
      );
      setEvents(res.data.events);
    } catch (error) {}
  }

  async function createNewEvent(name, month, day) {
    try {
      const res = await axios.post(
        `${API_URL}/api/events?telegramId${user.id}`,
        {
          name,
          day,
          month,
        },
      );
      setEvents(res.data.events);
    } catch (error) {}
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <CreateNewEvent createNewEvent={createNewEvent} />
        <EventList events={events} deleteEvent={deleteEvent} />
      </div>
    </div>
  );
}

export default App;
