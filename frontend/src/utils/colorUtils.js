/**
 * Get color scheme for an activity type
 * @param {string} activityType - The activity type
 * @returns {Object} { border, bg, hoverBg, text } - Color classes
 */
export function getActivityColors(activityType) {
  const colorMap = {
    'Arts / Crafts': {
      border: 'border-purple-500',
      bg: 'bg-purple-100',
      hoverBg: 'hover:bg-purple-200',
      text: 'text-purple-800',
      headerBg: 'bg-purple-500'
    },
    'Music / Movement': {
      border: 'border-blue-500',
      bg: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-200',
      text: 'text-blue-800',
      headerBg: 'bg-blue-500'
    },
    'Open Play': {
      border: 'border-orange-500',
      bg: 'bg-orange-100',
      hoverBg: 'hover:bg-orange-200',
      text: 'text-orange-800',
      headerBg: 'bg-orange-500'
    },
    'Outdoor / Nature': {
      border: 'border-green-500',
      bg: 'bg-green-100',
      hoverBg: 'hover:bg-green-200',
      text: 'text-green-800',
      headerBg: 'bg-green-500'
    },
    'Storytime': {
      border: 'border-pink-500',
      bg: 'bg-pink-100',
      hoverBg: 'hover:bg-pink-200',
      text: 'text-pink-800',
      headerBg: 'bg-pink-500'
    },
    'Movies': {
      border: 'border-red-500',
      bg: 'bg-red-100',
      hoverBg: 'hover:bg-red-200',
      text: 'text-red-800',
      headerBg: 'bg-red-500'
    },
    'Postnatal Fitness': {
      border: 'border-amber-500',
      bg: 'bg-amber-100',
      hoverBg: 'hover:bg-amber-200',
      text: 'text-amber-800',
      headerBg: 'bg-amber-500'
    },
    'Stroller Walk': {
      border: 'border-indigo-500',
      bg: 'bg-indigo-100',
      hoverBg: 'hover:bg-indigo-200',
      text: 'text-indigo-800',
      headerBg: 'bg-indigo-500'
    }
  };

  // Default colors for events without activity type
  const defaultColors = {
    border: 'border-gray-500',
    bg: 'bg-gray-100',
    hoverBg: 'hover:bg-gray-200',
    text: 'text-gray-800',
    headerBg: 'bg-gray-500'
  };

  return colorMap[activityType] || defaultColors;
}

export function getActivityTypesForLegend() {
  const types = [
    'Arts / Crafts', 
    'Music / Movement', 
    'Open Play', 
    'Outdoor / Nature', 
    'Storytime',
    'Movies',
    'Postnatal Fitness',
    'Stroller Walk'
  ];
  return types.map(type => ({ type, colors: getActivityColors(type) }));
}
