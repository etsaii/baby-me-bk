import React from 'react';
import { minutesToTimeString } from '../utils/timeUtils';
import { getActivityColors } from '../utils/colorUtils';

const EventModal = ({ event, onClose }) => {
  const colors = getActivityColors(event['activity-type']);
  const startTime = event.startMinutes ? minutesToTimeString(event.startMinutes) : event['start time'];
  const endTime = event.endMinutes ? minutesToTimeString(event.endMinutes) : event['end time'];

  const Field = ({ label, value, multiline }) => {
    if (!value) return null;
    return (
      <div>
        <span className="font-semibold text-gray-700">{label}:</span>
        {multiline ? (
          <p className="mt-1 text-gray-600 whitespace-pre-wrap">{value}</p>
        ) : (
          <span className="ml-2 text-gray-600">{value}</span>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${colors.headerBg} text-white p-3 sm:p-4 rounded-t-lg sticky top-0 z-10`}>
          <h2 className="text-lg sm:text-xl font-bold">{event.title}</h2>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          <Field label="Time" value={`${startTime}${endTime ? ` - ${endTime}` : ''}`} />
          <Field label="Location" value={event.location} />
          <Field label="Neighborhood" value={event.neighborhood} />
          <Field label="Activity Type" value={event['activity-type']} />
          <Field label="Age Range" value={event['age-range']} />
          <Field label="Price" value={event.price} />
          <Field label="Description" value={event.description} multiline />
        </div>

        <div className="p-3 sm:p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className={`px-6 py-3 sm:px-4 sm:py-2 ${colors.headerBg} text-white rounded hover:opacity-90 active:opacity-75 touch-manipulation min-h-[44px] sm:min-h-0 text-sm sm:text-base`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
