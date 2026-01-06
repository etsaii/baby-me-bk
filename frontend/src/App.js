import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch('/events.json');
        if (!response.ok) {
          throw new Error('Failed to load events');
        }
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="min-h-screen bg-mint-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-3 sm:px-4 pt-2.5 sm:pt-4 pb-1 sm:pb-1.5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Brooklyn Baby and Me Events</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{events.length} events</p>
        </div>
      </header>
      <main className="h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
        <Calendar events={events} />
      </main>
    </div>
  );
};

export default App;
