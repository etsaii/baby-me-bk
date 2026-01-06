import React from 'react';
import EventBlock from './EventBlock';

const DayColumn = ({ events, timeRange, totalMinutes }) => {
  return (
    <div className="flex-1 relative bg-white" style={{ height: `${totalMinutes}px` }}>
      {events.map((event, index) => (
        <EventBlock
          key={`${event.title}-${index}`}
          event={event}
          timeRange={timeRange}
        />
      ))}
    </div>
  );
};

export default DayColumn;
