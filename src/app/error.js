"use client";

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      color: '#0a2e5d',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(10, 46, 93, 0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#e11d48' }}>
          Something went wrong!
        </h2>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '30px' }}>
          We encountered an unexpected error while loading this page. Our team has been notified.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#0a2e5d',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              backgroundColor: '#f1f5f9',
              color: '#0a2e5d',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: '600',
              border: '1px solid #cbd5e1',
              transition: 'background-color 0.2s'
            }}
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
