import React from 'react';
import { convertDateToString } from '../utils/convertDateToString';

function EventItem({ id, name, day, month, deleteEvent }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="w-full text-grey-darkest">
        <span className="font-bold lowercase">
          {convertDateToString(day, month)}:{' '}
        </span>
        {name}
      </p>
      <button
        onClick={() => deleteEvent(id)}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
      >
        удалить
      </button>
    </div>
  );
}

export default EventItem;
