import React, { useState, useEffect } from 'react';

interface SmartImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackUrl?: string;
  alt?: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  key?: React.Key;
}

export default function SmartImg({ src, fallbackUrl, alt, className, ...props }: SmartImgProps) {
  // Simplify candidate list to only probe exact files to prevent 404 spamming and false-positive fallbacks
  const candidateUrls = React.useMemo(() => {
    const urls = [
      src, // 1. Try exact requested path
    ];

    // 2. Try the exact path but with a completely fresh runtime cache-buster to bypass browser/proxy 404 caching
    const cleanUrl = src.split('?')[0];
    const freshBust = `?v=fresh-${Date.now()}`;
    urls.push(`${cleanUrl}${freshBust}`);

    // 3. Keep fallback as the ultimate backup
    if (fallbackUrl) {
      urls.push(fallbackUrl);
    }

    return Array.from(new Set(urls));
  }, [src, fallbackUrl]);

  const [attemptIndex, setAttemptIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(candidateUrls[0]);

  useEffect(() => {
    setAttemptIndex(0);
    setCurrentSrc(candidateUrls[0]);
  }, [candidateUrls]);

  const handleError = () => {
    const nextIndex = attemptIndex + 1;
    if (nextIndex < candidateUrls.length) {
      // Add a slight delay of 50ms before transitioning to prevent rapid-fire cascading
      setTimeout(() => {
        setAttemptIndex(nextIndex);
        setCurrentSrc(candidateUrls[nextIndex]);
      }, 50);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
