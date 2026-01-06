import React from 'react';

const DayNavigation = ({ weekdays, selectedDay, onDaySelect, eventCounts = {} }) => {
  return (
    <div className="w-full border-b border-gray-200 bg-gray-100 overflow-x-auto">
      <div className="flex min-w-max md:min-w-0 md:w-full">
        {weekdays.map(day => {
          const isSelected = selectedDay === day;
          const eventCount = eventCounts[day]?.length || 0;
          return (
            <button
              key={day}
              onClick={() => onDaySelect(day)}
              className={`min-w-[80px] md:flex-1 py-2 px-2.5 font-semibold text-xs md:text-sm transition-all relative flex flex-col items-center touch-manipulation ${
                isSelected
                  ? 'bg-mint-100 text-mint-700 shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:bg-gray-200'
              }`}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 3)}</span>
              <span className={`text-xs mt-1 ${isSelected ? 'text-mint-600 font-medium' : 'text-gray-400'}`}>
                {eventCount} {eventCount === 1 ? 'event' : 'events'}
              </span>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint-600"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DayNavigation;

