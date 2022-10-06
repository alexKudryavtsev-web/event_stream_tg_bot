import { useCallback, useEffect } from 'react';
import axios from 'axios';

import { useTelegram } from './hooks/useTelegram';
import { useState } from 'react';
import { convertDateToString } from './utils/convertDateToString';

function App() {
  const { tg, user } = useTelegram();
  const [events, setEvents] = useState([]);
  const [newEvent, setEvent] = useState('');
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);

  const fetchEvents = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:3000/api/events?telegramId${user.id}`,
    );

    setEvents(res.data.events);
  }, [user]);

  useEffect(() => {
    tg.ready();

    fetchEvents();
  }, [tg, fetchEvents]);

  async function handleDeleteButton(eventId) {
    const res = await axios.delete(
      `http://localhost:3000/api/events/${eventId}?telegramId${user.id}`,
    );

    setEvents(res.data.events);
  }

  async function createNewEventHandler() {
    try {
      console.log(day, month);
      const res = await axios.post(
        `http://localhost:3000/api/events?telegramId${user.id}`,
        {
          name: newEvent,
          day: day,
          month: month,
        },
      );

      setEvents(res.data.events);
      setEvent('');
      setDay(1);
      setMonth(1);
    } catch (error) {}
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <div className="flex mt-2">
            <div className="flex-1 p-1">
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
                placeholder="новое событие"
                value={newEvent}
                onChange={(e) => setEvent(e.target.value)}
              />
              <div className="flex w-full pt-2">
                <input
                  className="w-1/2 shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
                  placeholder="дата"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                />
                <select
                  className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-grey-darker"
                  placeholder="месяц"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  <option value={1}>январь</option>
                  <option value={2}>февраль</option>
                  <option value={3}>март</option>
                  <option value={4}>апрель</option>
                  <option value={5}>май</option>
                  <option value={6}>юинь</option>
                  <option value={7}>июль</option>
                  <option value={8}>август</option>
                  <option value={9}>сентябрь</option>
                  <option value={10}>октябрь</option>
                  <option value={11}>ноябрь</option>
                  <option value={12}>декабрь</option>
                </select>
              </div>
            </div>
            <div className="p-1">
              <button
                onClick={createNewEventHandler}
                className="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              >
                ок
              </button>
            </div>
          </div>
        </div>
        <div>
          {events.map((event) => (
            <div key={event.id} className="flex mb-4 items-center">
              <p className="w-full text-grey-darkest">
                <span className="font-bold lowercase">
                  {convertDateToString(event.day, event.month)}:{' '}
                </span>
                {event.name}
              </p>
              <button
                onClick={() => handleDeleteButton(event.id)}
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              >
                удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
