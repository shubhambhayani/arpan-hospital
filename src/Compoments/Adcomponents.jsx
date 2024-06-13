import React, { useEffect } from 'react';

const Adcomponents = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle script failed to load', e);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-5270858071616138"
           data-ad-slot="5709574673"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}

export default Adcomponents;