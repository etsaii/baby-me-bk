import React, { useState, useEffect } from 'react';
import DayColumn from './DayColumn';
import TimeAxis from './TimeAxis';
import DayNavigation from './DayNavigation';
import Filters from './Filters';
import {
  groupEventsByWeekday,
  parseEventTimes,
  calculateEventColumns
} from '../utils/timeUtils';
import { applyFilters, getDefaultFilters, getUniqueNeighborhoods, getNeighborhoodCounts } from '../utils/filterUtils';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_RANGE = {
  startMinutes: 525,  // 8:45 AM
  endMinutes: 1080    // 6:00 PM
};

/**
 * Get today's weekday name
 */
const getTodayWeekday = () => {
  const today = new Date();
  const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // Convert to our weekday array (Monday = 0)
  const weekdayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return WEEKDAYS[weekdayIndex];
};

const processEvents = (events) => {
  const grouped = groupEventsByWeekday(events);
  const processed = {};

  WEEKDAYS.forEach(day => {
    const dayEvents = grouped[day]
      .map(event => {
        const { startMinutes, endMinutes } = parseEventTimes(event);
        return { ...event, startMinutes, endMinutes };
      })
      .filter(e => e.startMinutes !== null && e.endMinutes !== null);

    processed[day] = calculateEventColumns(dayEvents);
  });

  return processed;
};

const Calendar = ({ events }) => {
  const [selectedDay, setSelectedDay] = useState(getTodayWeekday);
  const [filters, setFilters] = useState(getDefaultFilters());
  const [processedEvents, setProcessedEvents] = useState({});

  const totalMinutes = TIME_RANGE.endMinutes - TIME_RANGE.startMinutes;
  const currentDayEvents = processedEvents[selectedDay] || [];
  
  // Get events for the selected day only
  const selectedDayEvents = events?.filter(event => event.weekday === selectedDay) || [];
  // Count neighborhoods for selected day with activity type filters applied (but not neighborhood filters)
  const neighborhoodCounts = getNeighborhoodCounts(selectedDayEvents, filters);
  // Get neighborhoods and sort by count (descending)
  const neighborhoods = getUniqueNeighborhoods(selectedDayEvents).sort((a, b) => {
    const countA = neighborhoodCounts[a] || 0;
    const countB = neighborhoodCounts[b] || 0;
    return countB - countA; // Descending order
  });

  useEffect(() => {
    if (!events?.length) {
      setProcessedEvents({});
      return;
    }

    // Apply filters to events before processing
    const filteredEvents = applyFilters(events, filters);
    const processed = processEvents(filteredEvents);
    setProcessedEvents(processed);
  }, [events, filters]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header section: Filters + Day Navigation */}
      <div className="flex-shrink-0 bg-mint-50 sticky top-0 z-20">
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          neighborhoods={neighborhoods}
          neighborhoodCounts={neighborhoodCounts}
        />
        <DayNavigation
          weekdays={WEEKDAYS}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
          eventCounts={processedEvents}
        />
      </div>

      <div className="flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="flex">
          <div className="w-12 sm:w-16 md:w-20 flex-shrink-0 border-r border-gray-200 p-1.5 sm:p-2">
            <h2 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700">Time</h2>
          </div>
          <div className="flex-1 p-2">
            <div className="text-center">
              <h2 className="text-sm md:text-base font-semibold text-gray-700">
                {selectedDay}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-auto" style={{ minHeight: `${totalMinutes}px`, height: `${totalMinutes}px` }}>
        <div className="flex relative" style={{ height: `${totalMinutes}px` }}>
          <TimeAxis
            startMinutes={TIME_RANGE.startMinutes}
            endMinutes={TIME_RANGE.endMinutes}
            totalMinutes={totalMinutes}
          />
          <DayColumn
            events={currentDayEvents}
            timeRange={TIME_RANGE}
            totalMinutes={totalMinutes}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
