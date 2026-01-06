# Task List: Event Calendar Generator

## Relevant Files

### Backend Files
- `backend/package.json` - Backend dependencies and scripts
- `backend/server.js` or `backend/index.js` - Main server entry point
- `backend/api/routes/sheets.js` - Google Sheets API route handlers
- `backend/api/services/googleSheets.js` - Google Sheets API client service
- `backend/api/services/sheetParser.js` - Spreadsheet data parsing logic
- `backend/api/utils/urlParser.js` - Extract sheet ID from Google Sheets URLs
- `backend/api/utils/validators.js` - URL and data validation utilities
- `backend/api/services/icsGenerator.js` - .ics file generation service
- `backend/.env.example` - Environment variables template
- `backend/.gitignore` - Backend gitignore file

### Frontend Files
- `frontend/package.json` - Frontend dependencies and scripts (Create React App)
- `frontend/src/App.js` or `frontend/src/App.jsx` - Main React application component
- `frontend/src/index.js` - React app entry point (Create React App)
- `frontend/src/components/UrlInput.jsx` - Component for inputting Google Sheets URLs
- `frontend/src/components/EventPreview.jsx` - Component for displaying extracted events
- `frontend/src/components/EventTable.jsx` - Table component for event list
- `frontend/src/services/api.js` - API client for backend communication
- `frontend/src/utils/eventHelpers.js` - Event data manipulation utilities
- `frontend/src/App.css` - Main application styles
- `frontend/src/setupProxy.js` - Proxy configuration for API requests (Create React App)
- `frontend/.env` - Frontend environment variables (REACT_APP_API_URL)

### Configuration Files
- `package.json` - Root package.json (if using monorepo)
- `.gitignore` - Root gitignore
- `README.md` - Project documentation
- `.env.example` - Root environment variables template

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `googleSheets.js` and `googleSheets.test.js` in the same directory).
- Use `npm test` or `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- For backend: Use Express.js or similar framework for API routes
- For frontend: Use Create React App (CRA) - initialized with `npx create-react-app frontend`
- Environment variables should be stored in `.env` files (not committed to git)
- Create React App uses `REACT_APP_` prefix for environment variables (e.g., `REACT_APP_API_URL`)
- Create React App proxy can be configured in `package.json` or using `setupProxy.js` with `http-proxy-middleware`

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

### MVP Phase (Core Functionality)

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/event-calendar-generator`)

- [x] 1.0 Project setup and infrastructure
  - [x] 1.1 Initialize backend project (Node.js/Express) with `npm init` or `yarn init`
  - [x] 1.2 Install backend dependencies: express, cors, dotenv, googleapis (or axios for direct API calls), ical-generator
  - [x] 1.3 Create backend directory structure: `api/routes/`, `api/services/`, `api/utils/`
  - [x] 1.4 Set up backend server entry point (`server.js` or `index.js`) with Express and basic middleware (CORS, JSON parsing)
  - [x] 1.5 Create `.env.example` file for backend with placeholder for `GOOGLE_SHEETS_API_KEY`
  - [x] 1.6 Initialize frontend React project using Create React App: `npx create-react-app frontend`
  - [x] 1.7 Install additional frontend dependencies: axios (or use fetch API)
  - [x] 1.8 Set up frontend directory structure: `src/components/`, `src/services/`, `src/utils/`
  - [x] 1.9 Configure Create React App proxy: add `"proxy": "http://localhost:3001"` to `frontend/package.json` (or create `src/setupProxy.js` with http-proxy-middleware)
  - [x] 1.10 Create root `.gitignore` to exclude `node_modules/`, `.env`, build files
  - [x] 1.11 Create basic `README.md` with setup instructions

- [x] 2.0 Backend API setup - Google Sheets integration
  - [x] 2.1 Create `api/utils/urlParser.js` to extract Google Sheets ID from various URL formats
  - [x] 2.2 Create `api/utils/validators.js` with URL validation function (check for valid Google Sheets URL format, prevent SSRF)
  - [x] 2.3 Create `api/services/googleSheets.js` service with function to fetch spreadsheet metadata (title, sheet names)
  - [x] 2.4 Add function in `googleSheets.js` to fetch values from a specific sheet/tab using Google Sheets API v4
  - [x] 2.5 Implement error handling for API calls (network errors, access denied, sheet not found)
  - [x] 2.6 Add timeout handling (10 seconds) for API requests
  - [x] 2.7 Create `api/routes/sheets.js` with POST `/api/sheets/validate` endpoint
  - [x] 2.8 Implement validation endpoint to check if sheet URL is valid and accessible
  - [x] 2.9 Create POST `/api/sheets/extract` endpoint in `sheets.js` route
  - [x] 2.10 Implement extract endpoint to fetch data from Google Sheet and return raw rows
  - [x] 2.11 Add route handlers to main server file and test endpoints are accessible
  - [x] 2.12 Set up environment variable for `GOOGLE_SHEETS_API_KEY` (get from Google Cloud Console)

- [x] 3.0 Frontend React application setup and basic UI
  - [x] 3.1 Update main `App.js` component (Create React App default) with basic structure
  - [x] 3.2 Set up basic CSS/styling in `App.css` for the application (minimal, clean design)
  - [x] 3.3 Create `components/UrlInput.jsx` component with input field for Google Sheets URL
  - [x] 3.4 Add submit button and basic form handling in `UrlInput` component
  - [x] 3.5 Create `services/api.js` with functions to call backend `/api/sheets/validate` and `/api/sheets/extract` endpoints
  - [x] 3.6 Add loading state handling in `UrlInput` component
  - [x] 3.7 Add basic error message display for invalid URLs or API errors
  - [x] 3.8 Create placeholder component structure for event preview (to be implemented in next task)
  - [x] 3.9 Test that frontend can successfully communicate with backend API

- [x] 4.0 MVP: Google Sheets data extraction and parsing
  - [x] 4.1 Create `api/services/sheetParser.js` with function to detect column headers (first row)
  - [x] 4.2 Implement automatic column mapping: detect columns matching "title", "date", "time", "location", "description" (case-insensitive, common variations)
  - [x] 4.3 Create unified event data model/interface (title, date, time, location, description, source, rowNumber, valid)
  - [x] 4.4 Implement row parsing function to convert spreadsheet rows into event objects
  - [x] 4.5 Add date parsing logic to handle common formats (ISO 8601, MM/DD/YYYY, DD/MM/YYYY)
  - [x] 4.6 Add time parsing logic to handle various time formats (HH:mm, h:mm AM/PM, etc.)
  - [x] 4.7 Implement validation: check for required fields (title, date, time) in each event
  - [x] 4.8 Add error tracking: mark events as invalid if required fields are missing or date/time parsing fails
  - [x] 4.9 Update `/api/sheets/extract` endpoint to use parser and return structured events with validation status
  - [x] 4.10 Return metadata with extract response (totalRows, validEvents, invalidEvents, errors array)
  - [x] 4.11 Test parser with sample Google Sheet containing various date/time formats

- [ ] 5.0 MVP: Event preview and basic .ics file generation
  - [ ] 5.1 Create `components/EventPreview.jsx` component to display extracted events
  - [ ] 5.2 Create `components/EventTable.jsx` component to show events in table format (title, date, time, location)
  - [ ] 5.3 Add visual indicators in table for valid vs invalid events (e.g., different row colors)
  - [ ] 5.4 Display error messages for invalid events showing which fields are missing/invalid
  - [ ] 5.5 Add summary display showing total events, valid events, invalid events count
  - [ ] 5.6 Create `api/services/icsGenerator.js` service using `ical-generator` library
  - [ ] 5.7 Implement function to convert event objects to iCalendar format (RFC 5545 compliant)
  - [ ] 5.8 Handle date/time formatting for .ics format (convert to UTC, proper format)
  - [ ] 5.9 Create POST `/api/ics/generate` endpoint that accepts events array and returns .ics file content
  - [ ] 5.10 Update frontend to call extract endpoint and display events in preview component
  - [ ] 5.11 Add "Generate .ics" button in preview component (functionality in next task)

- [ ] 6.0 MVP: Download .ics file functionality
  - [ ] 6.1 Update frontend to call `/api/ics/generate` endpoint when "Generate .ics" button is clicked
  - [ ] 6.2 Implement download functionality: create blob from .ics content and trigger browser download
  - [ ] 6.3 Set proper filename for downloaded .ics file (e.g., `events-calendar.ics`)
  - [ ] 6.4 Add success message after successful download
  - [ ] 6.5 Test end-to-end flow: input URL → extract events → preview → generate → download
  - [ ] 6.6 Verify downloaded .ics file can be imported into Google Calendar, Apple Calendar, or Outlook
  - [ ] 6.7 Test with various Google Sheets formats to ensure robustness

### Enhancement Phase (Additional Features)

- [ ] 7.0 Web scraping support for URL sources
  - [ ] 7.1 Install web scraping library (Cheerio for static HTML or Puppeteer/Playwright if needed)
  - [ ] 7.2 Create `api/services/webScraper.js` service with function to fetch HTML from URL
  - [ ] 7.3 Implement robots.txt checking before scraping
  - [ ] 7.4 Add timeout and rate limiting for web scraping requests
  - [ ] 7.5 Create `api/services/webPageParser.js` to extract event data from HTML
  - [ ] 7.6 Implement structured data extraction (JSON-LD, schema.org Event markup)
  - [ ] 7.7 Add fallback parsing using semantic HTML patterns and common CSS classes
  - [ ] 7.8 Create POST `/api/scrape/extract` endpoint for web page URL extraction
  - [ ] 7.9 Update frontend `UrlInput` component to support both Google Sheets and web page URLs
  - [ ] 7.10 Add URL type detection (Google Sheets vs web page) in frontend
  - [ ] 7.11 Test web scraping with sample event listing pages

- [ ] 8.0 Event editing and management UI
  - [ ] 8.1 Add inline editing capability to `EventTable` component (make cells editable)
  - [ ] 8.2 Implement edit state management for events (track which events are being edited)
  - [ ] 8.3 Add save/cancel buttons for editing individual events
  - [ ] 8.4 Create validation for edited event data (date/time format validation)
  - [ ] 8.5 Add delete/remove button for each event in the table
  - [ ] 8.6 Implement event removal functionality (remove from events array, maintain in "removed" list)
  - [ ] 8.7 Add "Restore" functionality for removed events (show removed events list, allow restoration)
  - [ ] 8.8 Update event count summary when events are edited or removed
  - [ ] 8.9 Add confirmation dialog or undo option when removing events
  - [ ] 8.10 Test editing and removal workflows

- [ ] 9.0 Multiple data sources support
  - [ ] 9.1 Create `SourceManager` service/component to manage multiple data sources
  - [ ] 9.2 Update state management to support multiple sources (array of sources with their events)
  - [ ] 9.3 Modify `UrlInput` component to allow adding multiple URLs (Google Sheets and web pages)
  - [ ] 9.4 Display list of added sources with ability to remove individual sources
  - [ ] 9.5 Add visual indicators showing which source each event came from
  - [ ] 9.6 Update event preview to show events from all sources combined
  - [ ] 9.7 Update summary to break down event counts by source
  - [ ] 9.8 Modify .ics generation to include events from all sources
  - [ ] 9.9 Test combining events from multiple Google Sheets and web pages

- [ ] 10.0 Subscription URL support
  - [ ] 10.1 Design subscription URL format (unique ID for each generated calendar)
  - [ ] 10.2 Create in-memory storage or simple file-based storage for subscription mappings (source URLs → events)
  - [ ] 10.3 Create GET `/api/subscribe/:subscriptionId` endpoint that returns .ics file
  - [ ] 10.4 Update `/api/ics/generate` to create subscription URL and include it in .ics file
  - [ ] 10.5 Implement subscription URL in .ics file using `X-WR-CALNAME` and refresh URL
  - [ ] 10.6 Add endpoint to refresh/re-fetch data from sources when subscription URL is accessed
  - [ ] 10.7 Update frontend to display subscription URL to user after .ics generation
  - [ ] 10.8 Add instructions on how to use subscription URL in calendar applications
  - [ ] 10.9 Test subscription URL with calendar applications (Google Calendar, Apple Calendar)

- [ ] 11.0 Error handling and manual correction
  - [ ] 11.1 Enhance error messages to be more descriptive (which field, what's wrong, which source)
  - [ ] 11.2 Add manual column mapping interface for Google Sheets (if auto-detection fails)
  - [ ] 11.3 Create UI for users to manually map spreadsheet columns to event fields
  - [ ] 11.4 Add interface for manually filling in missing event data (inline forms for invalid events)
  - [ ] 11.5 Implement "Skip" functionality for problematic events
  - [ ] 11.6 Add better error handling for network failures, timeouts, and API errors
  - [ ] 11.7 Create user-friendly error messages with suggestions for fixing issues
  - [ ] 11.8 Add retry functionality for failed API calls
  - [ ] 11.9 Test error scenarios and ensure graceful degradation

- [ ] 12.0 Polish and optimization
  - [ ] 12.1 Improve UI/UX: better styling, responsive design, loading animations
  - [ ] 12.2 Add pagination or virtual scrolling for large event lists (100+ events)
  - [ ] 12.3 Implement caching for Google Sheets data during session
  - [ ] 12.4 Add request queuing for multiple concurrent source fetches
  - [ ] 12.5 Optimize .ics file generation for large event sets
  - [ ] 12.6 Add keyboard shortcuts for common actions
  - [ ] 12.7 Improve accessibility (ARIA labels, keyboard navigation)
  - [ ] 12.8 Add unit tests for critical functions (parsers, validators, .ics generation)
  - [ ] 12.9 Add integration tests for API endpoints
  - [ ] 12.10 Performance testing with large spreadsheets (100+ events)
  - [ ] 12.11 Update README with usage instructions and examples
  - [ ] 12.12 Code cleanup and documentation

