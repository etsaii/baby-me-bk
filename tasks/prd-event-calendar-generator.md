# Product Requirements Document: Event Calendar Generator

## Introduction/Overview

This feature enables users to convert event data from Google Sheets or web pages (via URL) into iCalendar (.ics) files that can be imported into calendar applications (Google Calendar, Apple Calendar, Outlook, etc.). The primary goal is to solve the problem of manually creating calendar events from various data sources by providing an automated conversion tool.

The application will be a simple single-page React webapp that allows users to connect Google Sheets or input URLs (like Brooklyn Public Library event pages), extract event information, and generate downloadable .ics files. The generated .ics files will support subscription-based updates, allowing calendar applications to automatically refresh event data.

**Problem Statement:** Users often find event information in spreadsheets or on websites but need these events in their calendar applications. Manually creating calendar events from these sources is time-consuming and error-prone.

**Goal:** Build a simple single-page React webapp that converts Google Sheets data or web page content (via URL) into .ics files with subscription support for automatic updates.

## Goals

1. Enable users to input URLs for publicly visible Google Sheets to extract event data
2. Enable users to input URLs to extract event data from web pages
3. Extract event data (title, date, time, location, description) from Google Sheets and web pages
4. Generate valid .ics files that can be imported into calendar applications
5. Support subscription-based .ics files that allow calendar apps to automatically fetch updates
6. Provide a user-friendly interface for manual data correction when automatic parsing fails
7. Support combining multiple data sources (Google Sheets and URLs) into a single .ics file
8. Enable users to edit event details (title, date, time, location, description) after extraction
9. Enable users to edit or remove the source of events
10. Structure the application architecture to support future expansion (other spreadsheet formats, additional source types)

## User Stories

1. **As a user**, I want to input a URL for a publicly visible Google Sheet containing event data so that I can convert it to a calendar format.

2. **As a user**, I want to input a URL (like a Brooklyn Public Library events page) to extract events from a website, so I can add those events to my calendar.

3. **As a user**, I want to add multiple sources (both Google Sheets and URLs) to combine events from different places into one calendar file.

4. **As a user**, I want to see a preview of the events extracted from my sources before generating the .ics file, so I can verify the data is correct.

5. **As a user**, I want to download a .ics file that I can import into my calendar application (Google Calendar, Apple Calendar, Outlook, etc.).

6. **As a user**, I want the .ics file to support automatic updates, so my calendar app can refresh event data without me manually regenerating the file.

7. **As a user**, I want to manually correct or fill in missing event data when automatic parsing fails, so I can still generate a complete .ics file.

8. **As a user**, I want to see clear error messages when my data source format is incorrect or cannot be parsed, so I know how to fix it.

9. **As a user**, I want to edit event details (title, date, time, location, description) after they've been extracted, so I can customize events to my needs.

10. **As a user**, I want to change or remove which source an event came from, so I can organize events by source even if they were parsed incorrectly.

## Functional Requirements

### Data Source Connection

1. The system must allow users to input a URL for a publicly visible Google Sheet to extract event data.
2. The system must validate that the provided Google Sheet URL is publicly accessible and readable.
3. The system must allow users to specify which sheet/tab within a Google Sheets document to use (if multiple tabs exist) via URL parameters or a separate input field.
4. The system must allow users to input a URL to extract events from a web page.
5. The system must validate that the provided URL (for Google Sheets or web pages) is accessible and can be fetched.
6. The system must allow users to add multiple data sources (Google Sheets URLs and/or web page URLs) to combine into one .ics file.
7. The system must allow users to remove individual data sources from their list before generating the .ics file.

### Data Extraction & Parsing

9. The system must extract event data from Google Sheets, including:
   - Event title/name (required)
   - Date and time (required)
   - Location/venue (optional)
   - Description/details (optional)
   - Any other available columns (optional)

10. The system must extract event data from web pages (via URL), including:
    - Event title/name (required)
    - Date and time (required)
    - Location/venue (optional)
    - Description/details (optional)
    - Any other available information (optional)

11. The system must automatically detect column headers in the Google Sheet to map data fields.

12. The system must automatically detect event information on web pages using common HTML patterns, structured data (JSON-LD, microdata), or semantic HTML elements.

13. The system must allow users to manually map spreadsheet columns to event fields (title, date, time, location, description) if automatic detection fails.

14. The system must allow users to manually select or highlight event elements on a web page if automatic detection fails (optional enhancement).

15. The system must validate that required fields (event title, date, time) are present for each extracted event.

16. The system must handle date/time parsing in common formats (ISO 8601, MM/DD/YYYY, DD/MM/YYYY, etc.) from both spreadsheets and web pages.

17. The system must display a preview of extracted events from all sources before .ics generation, showing all parsed data and indicating the source of each event.

18. The system must handle web scraping with respect to robots.txt and rate limiting to avoid overloading target websites.

### Error Handling & Manual Correction

19. The system must display events that failed to parse or have missing required fields, indicating which source they came from.

20. The system must provide an interface for users to manually fill in or correct missing or invalid event data.

21. The system must show clear error messages indicating which events have issues, what fields are missing or invalid, and which data source they originated from.

22. The system must allow users to skip problematic events if they choose.

23. The system must handle web scraping errors gracefully (network errors, inaccessible pages, parsing failures) and provide meaningful error messages to users.

### Event Editing & Management

39. The system must allow users to edit any event field (title, date, time, location, description) after events have been extracted from sources.

40. The system must provide an inline editing interface for event fields that allows users to modify event details directly in the preview table/grid.

41. The system must validate edited event data (e.g., date/time formats) before allowing users to save changes.

42. The system must allow users to edit or change the source assignment of an event, including:
    - Reassigning an event to a different source
    - Changing the source label/name for an event
    - Removing the source association from an event

43. The system must allow users to remove individual events from the calendar before generating the .ics file.

44. The system must provide a clear visual indication (e.g., delete button, checkbox) for removing events.

45. The system must allow users to undo event removal (restore removed events) before generating the .ics file.

46. The system must maintain a list of removed events that can be restored, until the user generates the .ics file or clears the session.

47. The system must update the event count summary when events are edited, removed, or restored.

### .ics File Generation

24. The system must generate valid iCalendar (.ics) format files compliant with RFC 5545.

25. The system must include all successfully parsed events from all sources (Google Sheets and URLs) in the generated .ics file.

26. The system must support subscription-based .ics files by including a URL that calendar applications can poll for updates.

27. The system must provide a downloadable .ics file to the user.

28. The system must generate a unique subscription URL for each generated .ics file that points back to the application's update endpoint.

29. The system must track which events came from which source to enable proper updates when subscription URLs are accessed.

### Application Architecture

30. The system must be structured as a single-page React application.

31. The system must be architected with modular data source connectors to support:
   - Google Sheets sources
   - URL-based sources (web scraping)
   - Future expansion for other spreadsheet formats (CSV, Excel)
   - Multiple data sources combined into one .ics file

32. The system must maintain separation of concerns between data source connectors, data parsers, and .ics file generators to enable easy extension.

33. The system must use a unified event data model that works across all source types (Google Sheets and URLs).

### User Interface

34. The system must provide a simple, intuitive interface for the entire workflow (add sources → preview → edit/remove → download).

35. The system must display loading states during Google Sheets data fetching and web scraping operations.

36. The system must display the number of events successfully parsed and the number of events with errors, broken down by source.

37. The system must provide a clear interface for adding multiple sources (Google Sheets and URLs) with visual indicators showing which sources have been added.

38. The system must allow users to see which events came from which source in the preview interface.

39. The system must provide editing controls (edit buttons, inline editing) for each event in the preview interface.

40. The system must provide remove/delete controls for each event in the preview interface.

41. The system must display confirmation dialogs or undo options when users remove events to prevent accidental deletions.

## Non-Goals (Out of Scope)

1. **CSV/Excel File Upload**: Direct file uploads for CSV or Excel files are out of scope. Only Google Sheets integration is supported in the initial version.

2. **User Accounts/Persistence**: The application does not need to store user accounts or save user preferences. Each session is independent.

3. **Private Google Sheets**: Only publicly visible Google Sheets (shared with "Anyone with the link") are supported. Private sheets requiring authentication are out of scope.

4. **Backend Database**: No persistent storage of user data or generated .ics files is required. The application generates files on-demand.

5. **Real-time Collaboration**: Multiple users editing the same calendar or collaborative features are out of scope.

6. **Calendar App Integration**: Direct integration with calendar applications (beyond generating .ics files) is out of scope. Users must manually import the .ics file.

7. **Bulk Event Operations**: Advanced bulk editing features (e.g., batch edit multiple events, find/replace, bulk source reassignment) are out of scope for the initial version.

8. **Advanced Web Scraping Features**: 
   - JavaScript-rendered content requiring headless browsers (unless necessary for target sites)
   - Authentication-required web pages
   - Sites with complex anti-scraping measures
   - Real-time scraping of dynamic content that changes frequently

## Design Considerations

### User Interface Flow

1. **Landing/Input Screen**:
   - Two primary input options: "Add Google Sheet URL" input field and "Add Web Page URL" input field
   - Brief instructions on what the tool does
   - Information about required fields (title, date, time)
   - Note that Google Sheets must be publicly visible (shared with "Anyone with the link")
   - List of added sources (if any) with ability to remove them

2. **Source Configuration**:
   - **For Google Sheets**: URL input field with validation, sheet/tab selector (if multiple tabs), column mapping interface (if automatic detection fails), indication of fetch status
   - **For Web Page URLs**: URL input field with validation, option to test/validate URL before adding, indication of scraping status

3. **Preview & Correction Screen**:
   - Table/grid view of extracted events from all sources
   - Visual indicators showing which source each event came from
   - Visual indicators for successfully parsed events vs. events with errors
   - Inline editing capability for all event fields (title, date, time, location, description)
   - Edit source button/dropdown for each event to reassign or change source
   - Remove/delete button for each event with confirmation or undo option
   - Summary showing: "X events parsed successfully, Y events need attention, Z events removed" broken down by source
   - Option to add more sources before generating .ics file
   - List of removed events with option to restore them

4. **Download Screen**:
   - Success message
   - Download button for .ics file
   - Instructions on how to import into calendar applications
   - Information about subscription URL (if applicable)
   - List of sources included in the .ics file
   - Summary of events included (total count, breakdown by source)
   - Option to go back and edit events before downloading

### UI/UX Requirements

- Clean, minimal design suitable for a single-page application
- Responsive design that works on desktop and tablet devices
- Clear visual feedback for all user actions (loading, success, error states)
- Accessible form controls and error messages
- Mobile-friendly interface (though primary use case is desktop)

## Technical Considerations

### Technology Stack

- **Frontend Framework**: React (single-page application)
- **Google Sheets API**: Google Sheets API v4 for reading publicly accessible spreadsheet data (no authentication required for public sheets)
- **Web Scraping**: 
  - Server-side web scraping library (e.g., Cheerio, Puppeteer, or Playwright for JavaScript/Node.js)
  - HTML parsing and structured data extraction (JSON-LD, microdata, schema.org)
  - Consider using a headless browser if JavaScript-rendered content is needed
- **iCalendar Generation**: Library for generating RFC 5545 compliant .ics files (e.g., `ical-generator` for JavaScript/Node.js or similar)
- **Backend Requirements**: 
  - Google Sheets API integration (for public sheets, no authentication needed)
  - Web scraping service/endpoint
  - .ics file generation endpoint
  - Subscription URL endpoint (for calendar apps to poll for updates)
  - CORS handling for web scraping (may need proxy or server-side scraping)

### Architecture Patterns

1. **Modular Data Source Connectors**: Create an abstraction layer for data sources (e.g., `DataSourceConnector` interface) with implementations for:
   - `GoogleSheetsConnector`: Handles Google Sheets URL parsing and data fetching from publicly accessible sheets
   - `URLConnector`: Handles web scraping and HTML parsing
   - Future: `CSVConnector`, `ExcelConnector`, etc.

2. **Parser Abstraction**: Separate parsing logic from data source logic:
   - `GoogleSheetsParser`: Parses spreadsheet rows into event objects
   - `WebPageParser`: Parses HTML content into event objects (using structured data, semantic HTML, or pattern matching)
   - Both parsers output the same unified event data model

3. **.ics Generator Service**: Centralized service for generating .ics files that can handle events from multiple sources, combining them into a single calendar file.

4. **Source Manager**: Component/service that manages multiple data sources, tracks their status, and coordinates fetching/parsing from all sources.

5. **Event Manager**: Component/service that manages the event collection, handles editing operations, tracks removed events, and maintains event-source associations.

### Dependencies

- Google Sheets API client library (for accessing public sheets without authentication)
- Web scraping library (Cheerio for server-side HTML parsing, or Puppeteer/Playwright if JavaScript rendering is needed)
- HTML parsing and structured data extraction libraries (for JSON-LD, microdata, schema.org)
- iCalendar generation library
- React and React Router (if navigation is needed, though single-page suggests minimal routing)
- HTTP client library for fetching web pages (axios, node-fetch, etc.)

### Security Considerations

- No storage of sensitive user data
- Subscription URLs should be unique and not easily guessable
- Rate limiting may be needed for subscription endpoint to prevent abuse
- Web scraping must respect robots.txt and implement rate limiting to avoid overloading target websites
- Validate and sanitize user-provided URLs to prevent SSRF (Server-Side Request Forgery) attacks
- Implement timeout limits for web scraping and Google Sheets API requests to prevent hanging requests
- Validate that Google Sheets URLs point to publicly accessible sheets and handle access errors gracefully
- Consider implementing a proxy or server-side scraping to avoid CORS issues and protect user privacy

### Performance Considerations

- Efficient parsing of large spreadsheets (handle 100+ events)
- Efficient web scraping with timeout limits and error handling
- Lazy loading or pagination for preview if event count is very high
- Caching of Google Sheets data during the session to avoid repeated API calls (public sheets can be accessed without authentication)
- Caching of scraped web page content during the session to avoid repeated requests
- Parallel processing of multiple sources when possible
- Consider implementing request queuing for web scraping to manage concurrent requests

## Success Metrics

1. **Functionality**: 
   - Successfully generate valid .ics files from Google Sheets and URLs that can be imported into major calendar applications (Google Calendar, Apple Calendar, Outlook)
   - 95%+ of test spreadsheets with standard formats are parsed correctly without manual intervention
   - 80%+ of common event listing web pages (like library event pages) are successfully scraped and parsed
   - Successfully combine events from multiple sources (Google Sheets + URLs) into a single .ics file

2. **User Experience**:
   - Users can complete the entire workflow (add sources → preview → edit/remove → download) in under 5 minutes for typical sources (10-50 events from spreadsheets or web pages)
   - Web scraping completes within 10 seconds for typical event listing pages
   - Clear error messages enable users to correct 90%+ of parsing issues without external help
   - Users can successfully add and combine multiple sources (Google Sheets and URLs) in a single session
   - Users can edit, remove, and manage events efficiently with intuitive controls
   - Event editing operations (edit, remove, restore) complete within 1 second for responsive user experience

3. **Technical**:
   - Application loads in under 3 seconds
   - .ics file generation completes in under 5 seconds for sources with up to 100 events
   - Web scraping requests complete within 10 seconds for typical pages
   - Subscription URLs successfully provide updated .ics files when polled by calendar applications
   - Web scraping respects rate limits and robots.txt guidelines

4. **Adoption** (if tracking is implemented):
   - Number of .ics files generated
   - Number of successful calendar imports
   - User feedback on ease of use

## Open Questions

1. **Subscription URL Implementation**: 
   - Should subscription URLs be permanent or expire after a certain period?
   - How should the application handle updates when source data changes (Google Sheet or web page)? Should it poll sources periodically, or only when the subscription URL is accessed?
   - How should the application handle web pages that change frequently? Should it re-scrape on each subscription URL access?

2. **Column Mapping**:
   - Should the application remember column mappings for frequently used spreadsheet formats, or require mapping each time?
   - How should the application handle spreadsheets with non-standard column names?

3. **Date/Time Format Detection**:
   - What level of date/time format detection is needed? Should the app support international date formats?
   - How should the application handle timezone information from spreadsheets and web pages?

4. **Web Scraping Strategy**:
   - What HTML patterns should be prioritized for event detection? (e.g., structured data like JSON-LD, schema.org Event markup, common CSS classes, semantic HTML)
   - Should the application support JavaScript-rendered content (requiring headless browsers like Puppeteer), or focus on static HTML only?
   - How should the application handle websites with pagination or "load more" buttons for event listings?
   - Should users be able to provide CSS selectors or XPath to help identify event elements on specific websites?

5. **Event Editing & Management**:
   - Should edited events maintain a link to their original source, or become "manual" events after editing?
   - When a user edits an event's source, should the system update the source association or create a new source entry?
   - Should removed events be permanently deleted from the session, or maintained in a "trash" that persists until .ics generation?
   - Should the system support bulk editing operations (e.g., edit multiple events at once) in future versions?

6. **Error Recovery**:
   - Should users be able to save their progress if they need to correct many events, or is it always a single-session workflow?

7. **Web Scraping Legal/Ethical**:
   - What is the policy for handling websites that explicitly prohibit scraping in their terms of service?
   - Should the application check robots.txt before scraping, and how should it handle disallowed URLs?

8. **Deployment**:
   - Will this be a client-side only application, or require a backend server for web scraping and .ics generation?
   - If backend is required, what hosting platform is preferred?
   - How should CORS be handled for web scraping? (Server-side scraping vs. proxy vs. CORS proxy service)
   - Can Google Sheets API calls be made directly from the client for public sheets, or should they go through a backend?

