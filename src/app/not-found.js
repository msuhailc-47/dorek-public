import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a2e5d',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '120px', 
        fontWeight: 'bold', 
        margin: '0', 
        color: '#d4af37',
        lineHeight: '1'
      }}>
        404
      </h1>
      <h2 style={{ 
        fontSize: '32px', 
        marginBottom: '20px',
        fontWeight: '600'
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        fontSize: '18px', 
        color: '#a3b8cc', 
        maxWidth: '500px', 
        marginBottom: '40px' 
      }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" style={{
        display: 'inline-block',
        backgroundColor: '#d4af37',
        color: '#0a2e5d',
        padding: '12px 30px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'all 0.3s ease'
      }}>
        Return to Home
      </Link>
    </div>
  );
}
