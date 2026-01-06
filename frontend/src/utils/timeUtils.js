/**
 * Parse time string (e.g., "10:00 AM", "2:30 PM") to minutes since midnight
 * @param {string} timeStr - Time string in format "HH:MM AM/PM"
 * @returns {number} Minutes since midnight (0-1439)
 */
export function parseTimeToMinutes(timeStr) {
  if (!timeStr) return null;
  
  // Remove any asterisks or extra characters
  const cleanTime = timeStr.replace(/\*/g, '').trim();
  
  // Match pattern like "10:00 AM" or "2:30 PM"
  const match = cleanTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to time string
 * @param {number} minutes - Minutes since midnight
 * @returns {string} Time string in format "HH:MM AM/PM"
 */
export function minutesToTimeString(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
}

/**
 * Parse event times and return start/end in minutes
 * @param {Object} event - Event object with "start time" and "end time"
 * @returns {Object} { startMinutes, endMinutes }
 */
export function parseEventTimes(event) {
  const startMinutes = parseTimeToMinutes(event['start time']);
  let endMinutes = parseTimeToMinutes(event['end time']);
  
  // Default to 30 minutes duration if no end time
  if (startMinutes !== null && endMinutes === null) {
    endMinutes = startMinutes + 30;
  }
  
  return { startMinutes, endMinutes };
}

/**
 * Check if two events overlap in time
 * @param {Object} event1 - First event with startMinutes and endMinutes
 * @param {Object} event2 - Second event with startMinutes and endMinutes
 * @returns {boolean} True if events overlap
 */
export function eventsOverlap(event1, event2) {
  return !(
    event1.endMinutes <= event2.startMinutes ||
    event2.endMinutes <= event1.startMinutes
  );
}

/**
 * Group events by weekday
 * @param {Array} events - Array of event objects
 * @returns {Object} Object with weekday keys and event arrays as values
 */
export function groupEventsByWeekday(events) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const grouped = {};
  
  // Initialize all weekdays
  weekdays.forEach(day => {
    grouped[day] = [];
  });
  
  // Group events
  events.forEach(event => {
    const weekday = event.weekday;
    if (weekday && grouped[weekday]) {
      grouped[weekday].push(event);
    }
  });
  
  return grouped;
}

/**
 * Calculate column layout for overlapping events
 * @param {Array} events - Array of events for a day (with startMinutes and endMinutes)
 * @returns {Array} Events with added column and totalColumns properties
 */
export function calculateEventColumns(events) {
  if (events.length === 0) return [];
  
  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => a.startMinutes - b.startMinutes);
  
  // Initialize columns
  const columns = [];
  
  sortedEvents.forEach(event => {
    // Find the first column where this event doesn't overlap
    let placed = false;
    for (let i = 0; i < columns.length; i++) {
      const columnEvents = columns[i];
      const overlaps = columnEvents.some(e => eventsOverlap(e, event));
      
      if (!overlaps) {
        columnEvents.push(event);
        event.column = i;
        placed = true;
        break;
      }
    }
    
    // If no column found, create a new one
    if (!placed) {
      columns.push([event]);
      event.column = columns.length - 1;
    }
  });
  
  // Add totalColumns to each event
  sortedEvents.forEach(event => {
    event.totalColumns = columns.length;
  });
  
  return sortedEvents;
}