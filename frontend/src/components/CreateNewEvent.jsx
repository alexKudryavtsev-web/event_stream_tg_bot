import React from 'react';
import { useState } from 'react';

function CreateNewEvent({ createNewEvent }) {
  const [name, setName] = useState('');
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);

  async function handleCreateEventButton() {
    await createNewEvent(name, month, day);

    setName('');
    setDay(1);
    setMonth(1);
  }

  return (
    <div className="mb-4">
      <div className="flex mt-2">
        <div className="flex-1 p-1">
          <input
            className="w-full shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
            placeholder="новое событие"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onClick={handleCreateEventButton}
            className="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
          >
            ок
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewEvent;
