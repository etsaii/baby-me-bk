import React, { useState } from 'react';
import { minutesToTimeString } from '../utils/timeUtils';
import { getActivityColors } from '../utils/colorUtils';
import EventModal from './EventModal';

const EventBlock = ({ event, timeRange }) => {
  const [showModal, setShowModal] = useState(false);

  if (!event.startMinutes || !event.endMinutes) return null;

  const colors = getActivityColors(event['activity-type']);
  const widthPercent = event.totalColumns ? 100 / event.totalColumns : 100;
  const leftPercent = event.column !== undefined ? event.column * widthPercent : 0;
  // Truncate title based on screen size - use CSS classes for responsive behavior
  const displayTitle = event.title.length > 30 ? `${event.title.substring(0, 30)}...` : event.title;

  return (
    <>
      <div
        className={`absolute border-l-4 ${colors.border} ${colors.bg} ${colors.hoverBg} cursor-pointer rounded shadow-sm transition-colors overflow-hidden touch-manipulation`}
        style={{
          top: `${event.startMinutes - timeRange.startMinutes}px`,
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
          height: `${event.endMinutes - event.startMinutes}px`,
          minHeight: '44px'
        }}
        onClick={() => setShowModal(true)}
      >
        <div className="p-1.5 md:p-1 text-xs">
          <div className="font-semibold text-gray-800 truncate leading-tight text-[11px] sm:text-xs">{displayTitle}</div>
          <div className="text-gray-600 text-[10px] md:text-xs mt-0.5">
            {minutesToTimeString(event.startMinutes)} - {minutesToTimeString(event.endMinutes)}
          </div>
          {event.location && <div className="text-gray-500 truncate text-[10px] md:text-xs mt-0.5">{event.location}</div>}
        </div>
      </div>

      {showModal && <EventModal event={event} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default EventBlock;
