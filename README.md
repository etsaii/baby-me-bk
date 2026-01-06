# Event Calendar

A single-page React application that displays events in a weekly calendar view. Events are grouped by day of the week and displayed vertically with overlapping events shown side-by-side.

## Features

- Weekly calendar view with all 7 days (Monday-Sunday)
- Events grouped by weekday
- Overlapping events displayed side-by-side in columns
- Time range automatically calculated (1 hour before earliest event to 1 hour after latest event)
- Click on any event to see full details
- Mobile-responsive design with horizontal scrolling
- Beautiful mint color theme

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`

4. To build for production:
   ```bash
   npm run build
   ```

## Data

Events are loaded from `frontend/public/events.json`. The application expects events with the following structure:

```json
{
  "title": "Event Title",
  "location": "Event Location",
  "neighborhood": "Neighborhood",
  "start time": "10:00 AM",
  "end time": "11:30 AM",
  "description": "Event description",
  "activity-type": "Activity Type",
  "age-range": "0-5",
  "price": "$25",
  "weekday": "Monday",
  "recurring": null
}
```

## Project Structure

```
events-cal/
├── frontend/
│   ├── public/
│   │   └── events.json      # Event data
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Calendar.jsx
│   │   │   ├── DayColumn.jsx
│   │   │   ├── EventBlock.jsx
│   │   │   ├── EventModal.jsx
│   │   │   └── TimeAxis.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── timeUtils.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## How It Works

1. Events are loaded from `events.json` on app startup
2. Events are grouped by weekday
3. Time strings (e.g., "10:00 AM") are parsed to minutes since midnight
4. Overlapping events are detected and assigned to columns
5. Calendar displays events positioned by their start/end times
6. Time range is calculated to show 1 hour before earliest event to 1 hour after latest event

## Styling

The application uses Tailwind CSS with a custom mint color theme. The design is fully responsive and works on mobile, tablet, and desktop devices.

## License

ISC
