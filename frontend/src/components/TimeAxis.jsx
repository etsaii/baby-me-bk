import React from 'react';
import { minutesToTimeString } from '../utils/timeUtils';

const TimeAxis = ({ startMinutes, endMinutes, totalMinutes }) => {
  const startHour = Math.floor(startMinutes / 60);
  const endHour = Math.ceil(endMinutes / 60);
  const hours = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    const hourMinutes = hour * 60;
    if (hourMinutes >= startMinutes && hourMinutes <= endMinutes) {
      hours.push(hourMinutes);
    }
  }

  return (
    <div
      className="w-12 sm:w-16 md:w-20 flex-shrink-0 border-r border-gray-200 relative bg-gray-50 sticky left-0 z-10"
      style={{ height: `${totalMinutes}px` }}
    >
      {hours.map((hourMinutes) => (
        <div
          key={hourMinutes}
          className="absolute left-0 right-0 border-t border-gray-200"
          style={{ top: `${hourMinutes - startMinutes}px` }}
        >
          <span className="absolute left-0.5 sm:left-1 top-0 text-[10px] sm:text-xs text-gray-600 transform -translate-y-1/2 bg-gray-50 px-0.5 sm:px-1">
            {minutesToTimeString(hourMinutes)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeAxis;
