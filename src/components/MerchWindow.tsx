import { useState, useEffect } from 'react';
import toteImage from '../assets/tote1.jpg';
import teeImage from '../assets/tee1.jpg';
import posterImage from '../assets/poster1.jpg';
import merchHeader from '../assets/pelicanclubmerchtitle.png';
import palmTreeSega from '../assets/palmtreesega.png';

type MerchItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
  sizes?: string[];
};

const items: MerchItem[] = [
  {
    id: 'tee',
    name: 'Pelican Club Tee',
    price: '$30',
    description: 'Classic Club tee with retro vibes.',
    image: teeImage,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'tote',
    name: 'Pelican Club Tote',
    price: '$25',
    description: 'Spacious Club tote for all your essentials.',
    image: toteImage,
  },
  {
    id: 'poster',
    name: 'Pelican Club Poster',
    price: '$20',
    description: 'Limited-edition Club print for your wall.',
    image: posterImage,
  },
];

export function MerchWindow() {
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [previewImage, setPreviewImage] = useState<{url: string, name: string} | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    tee: 'M'
  });
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({
    tee: 1, tote: 1, poster: 1
  });
  const [successSessionId, setSuccessSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      setSuccessSessionId(sessionId);
    }
  }, []);

  const handleBuy = async (itemId: string) => {
    try {
      setLoadingItem(itemId);
      setError(null);

      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId,
          size: selectedSizes[itemId],
          quantity: selectedQuantities[itemId] || 1
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to start checkout');
      }

      const data = await res.json();
      if (!data.clientSecret) throw new Error('Missing clientSecret');

      const stripe = (window as any).Stripe?.(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) throw new Error('Stripe.js is not loaded');

      const checkout = await stripe.initEmbeddedCheckout({
        fetchClientSecret: async () => data.clientSecret,
      });

      setShowCheckout(true);
      
      // Ensure the mount point exists in the DOM before mounting
      setTimeout(() => {
        const mountPoint = document.getElementById('embedded-checkout');
        if (mountPoint) {
          mountPoint.innerHTML = '';
          checkout.mount('#embedded-checkout');
        }
      }, 0);
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setLoadingItem(null);
    }
  };

  if (successSessionId) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 p-8 text-center bg-white border-2 border-black shadow-[inset_0_0_10px_rgba(0,0,0,0.05)]">
        <div className="text-4xl animate-bounce">🌴</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold italic" style={{ fontFamily: 'Garamond, serif' }}>
            You've made a successful purchase!
          </h2>
          <p className="text-sm italic opacity-80">
            Thanks for supporting Pelican Club. Keep an eye on your email for shipping updates.
          </p>
        </div>
        
        <div className="w-full bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Stripe Order Reference</p>
          <p className="text-[10px] font-mono break-all select-all">{successSessionId}</p>
        </div>

        <button 
          onClick={() => {
            // Clean up URL parameters without reloading the page
            const url = new URL(window.location.href);
            url.searchParams.delete('session_id');
            window.history.replaceState({}, '', url.pathname);
            setSuccessSessionId(null);
          }}
          className="px-8 py-2 border-2 border-black bg-[#FFB6C1] text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFC0CB] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 relative">
      {/* Image Preview Modal - Backdrop removed to allow "replacing" by clicking other items */}
      {previewImage && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 pointer-events-none">
          <div 
            className="bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-[400px] w-full max-h-[85vh] flex flex-col pointer-events-auto" 
            onClick={e => e.stopPropagation()}
          >
            <div className="h-8 bg-[#FFFEF9] border-b-4 border-black flex items-center justify-between px-3 shrink-0 cursor-default">
              <span className="italic text-sm font-bold" style={{ fontFamily: 'Garamond, serif' }}>
                {previewImage.name} Preview
              </span>
              <button onClick={() => setPreviewImage(null)} className="w-6 h-6 bg-black text-white hover:bg-gray-800 flex items-center justify-center text-lg leading-none">×</button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-white">
              <img src={previewImage.url} alt={previewImage.name} className="max-w-full max-h-[70vh] object-contain" style={{ imageRendering: 'pixelated' }} />
            </div>
          </div>
        </div>
      )}

      {!showCheckout ? (
        <>
          <img 
            src={palmTreeSega} 
            alt="" 
            className="absolute top-0 pointer-events-none" 
            style={{ 
              height: '150px', 
              width: 'auto', 
              right: '-16px',
              zIndex: 0,
              imageRendering: 'pixelated',
            }} 
          />
          <div className="space-y-2">
            <div className="flex justify-start mb-4">
              <img
                src={merchHeader} 
                alt="Pelican Club Merch" 
                className="-ml-4"
                style={{ 
                  height: '75px',
                  width: 'auto',
                  imageRendering: 'pixelated',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              />
            </div>
            <p className="text-sm italic opacity-80">Choose an item and start checkout right here.</p>
          </div>

          {error && (
            <div className="border-2 border-red-400 bg-red-50 text-red-700 px-3 py-2 text-sm rounded">
              {error}
            </div>
          )}

          <div className="grid gap-4 relative z-10">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="border-2 border-black bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex min-h-[250px] items-center"
                style={{ gap: '40px' }}
              >
                <div
                  onClick={() => item.image && setPreviewImage({url: item.image, name: item.name})}
                  style={{ width: '100px', height: '100px', minWidth: '100px', cursor: item.image ? 'zoom-in' : 'default' }} 
                  className="bg-gray-100 border border-black flex-shrink-0 flex items-center justify-center overflow-hidden hover:bg-gray-200 transition-colors shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]"
                >
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain', 
                        imageRendering: 'pixelated' 
                      }}
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400 text-center p-1">IMAGE PLACEHOLDER</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                    <p className="text-[10px] leading-tight opacity-80">{item.description}</p>
                    <p className="font-bold text-xs">{item.price}</p>
                  </div>
                  <div className="flex justify-end items-center gap-4">
                    <button
                      onClick={() => handleBuy(item.id)}
                      disabled={loadingItem !== null}
                      className="px-6 py-1.5 border-2 border-black bg-[#FFB6C1] text-black rounded-full shadow-[inset_1.5px_1.5px_0px_#fff,inset_-1.5px_-1.5px_0px_#808080,2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[inset_1.5px_1.5px_0px_#808080,inset_-1.5px_-1.5px_0px_#fff] hover:bg-[#FFC0CB] disabled:opacity-60 text-[12px] font-bold transition-all"
                    >
                      {loadingItem === item.id ? 'Starting...' : 'Buy Now'}
                    </button>

                    {item.sizes && (
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] font-bold uppercase">Size:</label>
                        <select 
                          value={selectedSizes[item.id] || ''} 
                          onChange={(e) => setSelectedSizes(prev => ({...prev, [item.id]: e.target.value}))}
                          className="text-[11px] border-2 border-black bg-white px-2 py-1 outline-none font-bold cursor-pointer rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          {item.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <label className="text-[11px] font-bold uppercase">Qty:</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="10"
                        value={selectedQuantities[item.id] || 1}
                        onChange={(e) => setSelectedQuantities(prev => ({...prev, [item.id]: Math.max(1, parseInt(e.target.value) || 1)}))}
                        className="w-12 text-[11px] border-2 border-black bg-white px-1 py-1 outline-none font-bold rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowCheckout(false)}
              className="text-sm underline hover:no-underline font-bold"
            >
              ← Back to Merch
            </button>
            <span className="text-xs italic">Secure Checkout via Stripe</span>
          </div>
          
          <div 
            id="embedded-checkout" 
            className="min-h-[400px] bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
          />
        </div>
      )}
    </div>
  );
}