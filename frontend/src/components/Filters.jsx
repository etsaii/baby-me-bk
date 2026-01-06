import React, { useState, useRef, useEffect } from 'react';
import { getActivityTypesForLegend } from '../utils/colorUtils';

const Filters = ({ filters = {}, onFilterChange, neighborhoods = [], neighborhoodCounts = {} }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dropdownRef = useRef(null);
  const activityTypes = getActivityTypesForLegend();
  const selectedActivity = filters.activityType || [];
  const selectedNeighborhood = filters.neighborhood || [];
  const selectedPriceType = filters.priceType || [];

  const toggleActivityType = (type) => {
    const newSelected = selectedActivity.includes(type)
      ? selectedActivity.filter(t => t !== type)
      : [...selectedActivity, type];
    onFilterChange({ ...filters, activityType: newSelected });
  };

  const toggleNeighborhood = (neighborhood) => {
    const newSelected = selectedNeighborhood.includes(neighborhood)
      ? selectedNeighborhood.filter(n => n !== neighborhood)
      : [...selectedNeighborhood, neighborhood];
    onFilterChange({ ...filters, neighborhood: newSelected });
  };

  const togglePriceType = (priceType) => {
    const newSelected = selectedPriceType.includes(priceType)
      ? selectedPriceType.filter(p => p !== priceType)
      : [...selectedPriceType, priceType];
    onFilterChange({ ...filters, priceType: newSelected });
  };

  const getActivityEmoji = (type) => {
    const emojiMap = {
      'Arts / Crafts': '🎨',
      'Music / Movement': '🎵',
      'Open Play': '🧸',
      'Outdoor / Nature': '🌳',
      'Storytime': '📚',
      'Movies': '🎬',
      'Postnatal Fitness': '💪',
      'Stroller Walk': '🚶‍♀️'
    };
    return emojiMap[type] || '✨';
  };

  const getPriceEmoji = (priceType) => {
    const emojiMap = {
      'Free': '',
      'Paid': '💰'
    };
    return emojiMap[priceType] || '';
  };

  const hasActiveFilters = () => {
    return selectedActivity.length > 0 || selectedNeighborhood.length > 0 || selectedPriceType.length > 0;
  };

  const getFilterSummary = () => {
    const parts = [];
    
    if (selectedActivity.length > 0) {
      if (selectedActivity.length === 1) {
        parts.push(`${getActivityEmoji(selectedActivity[0])} ${selectedActivity[0]}`);
      } else {
        parts.push(`${selectedActivity.length} activities`);
      }
    }
    
    if (selectedPriceType.length > 0) {
      const priceLabels = selectedPriceType.map(p => p.charAt(0).toUpperCase() + p.slice(1));
      parts.push(priceLabels.join(', '));
    }
    
    if (selectedNeighborhood.length > 0) {
      if (selectedNeighborhood.length === 1) {
        parts.push(selectedNeighborhood[0]);
      } else {
        parts.push(`${selectedNeighborhood.length} neighborhoods`);
      }
    }
    
    return parts.join(' • ');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-50/50 border-b border-gray-100">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`w-full px-3 flex items-center justify-between ${isCollapsed && hasActiveFilters() ? 'py-2.5' : 'py-2'} hover:bg-gray-50/50 transition-colors touch-manipulation`}
        aria-label={isCollapsed ? 'Expand filters' : 'Collapse filters'}
      >
        <div className="flex-1 min-w-0 flex items-center gap-2 text-left">
          <h2 className="text-sm font-medium text-gray-700">Filters</h2>
          {isCollapsed && hasActiveFilters() && (
            <div className="text-xs text-gray-500 truncate">
              {getFilterSummary()}
            </div>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isCollapsed ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Content */}
      {!isCollapsed && (
        <div className="px-3 pb-3 space-y-3">
          <div>
            <div className="text-xs font-medium text-gray-600 mb-1.5">Activity Type</div>
            <div className="flex flex-wrap gap-1.5">
              {activityTypes.map(({ type, colors }) => {
                const isSelected = selectedActivity.includes(type);
                return (
                  <label
                    key={type}
                    className={`flex items-center gap-1.5 px-2.5 py-2 md:px-1.5 md:py-0.5 rounded text-xs cursor-pointer border transition-colors touch-manipulation min-h-[44px] md:min-h-0 ${
                      isSelected
                        ? `${colors.border} ${colors.bg} ${colors.text}`
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleActivityType(type)}
                      className="w-4 h-4 md:w-3 md:h-3"
                    />
                    <span>{getActivityEmoji(type)}</span>
                    <span className="whitespace-nowrap">{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-1.5">Price</div>
            <div className="flex flex-wrap gap-1.5">
              {['Free', 'Paid'].map(priceType => {
                const isSelected = selectedPriceType.includes(priceType.toLowerCase());
                return (
                  <label
                    key={priceType}
                    className={`flex items-center gap-1.5 px-2.5 py-2 md:px-1.5 md:py-0.5 rounded text-xs cursor-pointer border transition-colors touch-manipulation min-h-[44px] md:min-h-0 ${
                      isSelected
                        ? 'border-gray-300 bg-gray-100 text-gray-800'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => togglePriceType(priceType.toLowerCase())}
                      className="w-4 h-4 md:w-3 md:h-3"
                    />
                    <span>{getPriceEmoji(priceType)}</span>
                    {priceType}
                  </label>
                );
              })}
            </div>
          </div>

          {neighborhoods.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <div className="text-xs font-medium text-gray-600 mb-1.5">Neighborhood</div>
              <div className="flex flex-wrap gap-1.5 items-center">
                {selectedNeighborhood.map(neighborhood => (
                  <span
                    key={neighborhood}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-200"
                  >
                    {neighborhood}
                    <button
                      onClick={() => toggleNeighborhood(neighborhood)}
                      className="ml-0.5 hover:text-gray-900 touch-manipulation"
                      aria-label={`Remove ${neighborhood}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 rounded-full hover:border-gray-400 touch-manipulation min-h-[28px]"
                >
                  <span>+ Add</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full md:w-80 mt-1.5 bg-white border border-gray-200 rounded shadow-lg max-h-[60vh] md:max-h-60 overflow-y-auto">
                  {neighborhoods
                    .filter(n => !selectedNeighborhood.includes(n))
                    .map(neighborhood => {
                      const count = neighborhoodCounts[neighborhood] || 0;
                      return (
                        <button
                          key={neighborhood}
                          onClick={() => toggleNeighborhood(neighborhood)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-gray-50 active:bg-gray-100 touch-manipulation text-left"
                        >
                          <span className="text-sm text-gray-700">{neighborhood}</span>
                          <span className="text-xs text-gray-400">{count}</span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;

