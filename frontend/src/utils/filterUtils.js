export function isEventFree(event) {
  if (!event.price) return true; // No price = free
  const price = event.price.toLowerCase();
  return price === 'free' || price.includes('included') || price === 'donation';
}

export function applyFilters(events, filters) {
  if (!events?.length) return events;

  return events.filter(event => {
    if (filters?.activityType?.length && !filters.activityType.includes(event['activity-type'])) {
      return false;
    }
    if (filters?.neighborhood?.length && !filters.neighborhood.includes(event.neighborhood)) {
      return false;
    }
    if (filters?.priceType?.length) {
      const isFree = isEventFree(event);
      if (filters.priceType.includes('free') && !isFree) return false;
      if (filters.priceType.includes('paid') && isFree) return false;
    }
    return true;
  });
}

export function getDefaultFilters() {
  return { activityType: [], neighborhood: [], priceType: [] };
}

export function getUniqueNeighborhoods(events) {
  if (!events?.length) return [];
  const neighborhoods = events
    .map(e => e.neighborhood)
    .filter(n => n != null && n !== '');
  return [...new Set(neighborhoods)].sort();
}

export function getNeighborhoodCounts(events, filters = {}) {
  if (!events?.length) return {};
  
  // Filter by activity type only (not neighborhood) to show counts for all neighborhoods
  const filteredEvents = events.filter(event => {
    if (filters?.activityType?.length && !filters.activityType.includes(event['activity-type'])) {
      return false;
    }
    return true;
  });
  
  const counts = {};
  filteredEvents.forEach(event => {
    if (event.neighborhood) {
      counts[event.neighborhood] = (counts[event.neighborhood] || 0) + 1;
    }
  });
  return counts;
}

