import { useEffect, useState } from 'react';

export function ReturnWindow() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      // You could optionally verify the session status via an API call here
      // For now, we'll assume success if we reached this page with a session ID
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, []);

  return (
    <div className="p-8 space-y-6 text-center">
      {status === 'loading' && (
        <div className="animate-pulse italic">Verifying order...</div>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold italic" style={{ fontFamily: 'Garamond, serif' }}>
            Order Confirmed!
          </h2>
          <p className="text-sm italic">
            Thanks for supporting Pelican Club. Keep an eye on your email for shipping updates.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 border-2 border-black bg-[#FFB6C1] text-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-sm"
            >
              Return to Desktop
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-600 font-bold italic">
          Something went wrong with your order session.
        </div>
      )}
    </div>
  );
}