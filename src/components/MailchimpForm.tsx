import { useState } from 'react';

export function MailchimpForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convert Mailchimp POST URL to JSONP URL to avoid CORS
    const email = formData.get('EMAIL');
    const fname = formData.get('FNAME');
    const lname = formData.get('LNAME');
    const birthdayMonth = formData.get('BIRTHDAY[month]');
    const birthdayDay = formData.get('BIRTHDAY[day]');
    
    // Build the URL with query parameters
    const baseUrl = 'https://facebook.us16.list-manage.com/subscribe/post-json';
    const params = new URLSearchParams({
      u: '6d651e20f4f5c65efaf6b1682',
      id: '06f70d04e6',
      EMAIL: email as string,
      FNAME: fname as string || '',
      LNAME: lname as string || '',
      'BIRTHDAY[month]': birthdayMonth as string || '',
      'BIRTHDAY[day]': birthdayDay as string || '',
    });
    
    const url = `${baseUrl}?${params.toString()}`;
    
    // Use JSONP to submit without CORS issues
    const script = document.createElement('script');
    const callbackName = 'mailchimpCallback' + Date.now();
    
    (window as any)[callbackName] = (data: any) => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      
      if (data.result === 'success') {
        setStatus('success');
        setMessage('Success! Check your email to confirm your subscription.');
        form.reset();
      } else {
        setStatus('error');
        setMessage(data.msg || 'Something went wrong. Please try again.');
      }
    };
    
    script.src = `${url}&c=${callbackName}`;
    document.body.appendChild(script);
  };

  return (
    <div className="space-y-4 h-full overflow-auto">
      <div className="mailchimp-form-container">
        <h2>Subscribe</h2>
        <p className="mb-4">Join our mailing list to stay updated with Pelican Club news, releases, and exclusive content.</p>
        
        {status === 'success' ? (
          <div className="success-message bg-[#e8f5e9] border-4 border-black p-6 text-center">
            <h3 className="text-2xl mb-2">🎉 Success!</h3>
            <p className="mb-4">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="bg-black text-white px-6 py-2 border-2 border-black hover:bg-gray-800 transition-colors"
            >
              Subscribe Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-right text-xs mb-2">
              <span className="text-red-600">*</span> indicates required
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                required
                className="w-full px-3 py-2 border-3 border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">First Name</label>
              <input
                type="text"
                name="FNAME"
                id="mce-FNAME"
                className="w-full px-3 py-2 border-3 border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-LNAME">Last Name</label>
              <input
                type="text"
                name="LNAME"
                id="mce-LNAME"
                className="w-full px-3 py-2 border-3 border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div className="mc-field-group">
              <label htmlFor="mce-BIRTHDAY-month">Birthday</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  pattern="[0-9]*"
                  placeholder="MM"
                  size={2}
                  maxLength={2}
                  name="BIRTHDAY[month]"
                  id="mce-BIRTHDAY-month"
                  className="w-16 px-3 py-2 border-3 border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                <span>/</span>
                <input
                  type="text"
                  pattern="[0-9]*"
                  placeholder="DD"
                  size={2}
                  maxLength={2}
                  name="BIRTHDAY[day]"
                  id="mce-BIRTHDAY-day"
                  className="w-16 px-3 py-2 border-3 border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                <span className="text-xs ml-2">( mm / dd )</span>
              </div>
            </div>
            
            {/* Hidden anti-bot field */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input
                type="text"
                name="b_6d651e20f4f5c65efaf6b1682_06f70d04e6"
                tabIndex={-1}
                defaultValue=""
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-black text-white px-6 py-3 border-3 border-black hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            
            {status === 'error' && (
              <div className="bg-[#ffebee] border-3 border-red-600 p-4 text-red-800" dangerouslySetInnerHTML={{ __html: message }} />
            )}
          </form>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .mailchimp-form-container h2 {
            font-family: 'Garamond', 'EB Garamond', serif !important;
            margin-bottom: 10px;
          }
          
          .mailchimp-form-container label {
            display: block;
            margin-bottom: 6px;
            font-family: 'Garamond', 'EB Garamond', serif !important;
          }
          
          .mailchimp-form-container input {
            font-family: 'Garamond', 'EB Garamond', serif !important;
            border-width: 3px !important;
          }
          
          .mailchimp-form-container button {
            font-family: 'Garamond', 'EB Garamond', serif !important;
          }
        `
      }} />
    </div>
  );
}
