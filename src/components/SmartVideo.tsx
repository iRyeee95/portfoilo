import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  baseName: string; // e.g. "/carousel_1.mp4?v=20260615-2"
  placeholderUrl?: string;
}

const SmartVideo = React.forwardRef<HTMLVideoElement, SmartVideoProps>(
  ({ baseName, placeholderUrl, className, ...props }, ref) => {
    const localRef = useRef<HTMLVideoElement>(null);

    // Forward ref correctly so parent components can control playback
    useImperativeHandle(ref, () => localRef.current!);

    const candidateUrls = React.useMemo(() => {
      const urls: string[] = [];

      // 1. Try exact prop value first (the parent provides a version query, e.g. "?v=20260616_v3")
      if (baseName) {
        urls.push(baseName);
      }

      // Clean base path, strip leading slash, query params, and extension
      const cleanBase = baseName.replace(/^\//, '').split('?')[0].split('.')[0];

      if (cleanBase) {
        // 2. Try raw base .mp4
        urls.push(`/${cleanBase}.mp4`);

        // 3. Try custom -1 upload and _new upload (prioritize user duplicate files first!)
        urls.push(`/${cleanBase}-1.mp4`);
        urls.push(`/${cleanBase}_new.mp4`);

        // If cleanBase already has -1 or _new, try the stripped base file as well
        if (cleanBase.endsWith('-1') || cleanBase.endsWith('_new')) {
          const stripped = cleanBase.endsWith('-1') ? cleanBase.slice(0, -2) : cleanBase.slice(0, -4);
          urls.push(`/${stripped}.mp4`);
          if (stripped.startsWith('publicvertical')) {
            urls.push(`/${stripped.replace('publicvertical', 'vertical')}.mp4`);
          }
        }

        // 4. Check fallbacks for "publicvertical" <=> "vertical" naming schemes
        if (cleanBase.startsWith('publicvertical')) {
          urls.push(`/${cleanBase.replace('publicvertical', 'vertical')}.mp4`);
          urls.push(`/${cleanBase.replace('publicvertical', 'vertical')}-1.mp4`);
        }

        // 5. Try cache-busted versions
        const now = Date.now();
        urls.push(`/${cleanBase}.mp4?v=${now}`);
        urls.push(`/${cleanBase}-1.mp4?v=${now}`);
      }

      if (placeholderUrl) {
        urls.push(placeholderUrl);
      }

      // Deduplicate keeping the priority order
      return Array.from(new Set(urls)).filter(Boolean);
    }, [baseName, placeholderUrl]);

    const [attemptIndex, setAttemptIndex] = useState(0);
    const [currentSrc, setCurrentSrc] = useState(candidateUrls[0]);

    useEffect(() => {
      setAttemptIndex(0);
      setCurrentSrc(candidateUrls[0]);
    }, [candidateUrls]);

    // Critical for HTML5 video element source changing dynamically
    useEffect(() => {
      if (localRef.current) {
        const video = localRef.current;
        const isPlaying = !video.paused || video.autoplay;
        
        video.load();
        if (isPlaying || props.autoPlay) {
          video.play().catch(() => {
            // Silence autoplay block errors by browser policy
          });
        }
      }
    }, [currentSrc, props.autoPlay]);

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      const video = localRef.current;
      if (!video || !video.error) {
        // No actual fatal error object on the video element, do not switch sources
        return;
      }

      const code = video.error.code;
      // 1: MEDIA_ERR_ABORTED - browser aborted the fetch (e.g. element moved, resized, or source switched)
      // 2: MEDIA_ERR_NETWORK - network error (temporary, retry or ignore)
      if (code === 1 || code === 2) {
        return;
      }

      const nextIndex = attemptIndex + 1;
      if (nextIndex < candidateUrls.length) {
        setAttemptIndex(nextIndex);
        setCurrentSrc(candidateUrls[nextIndex]);
      }
    };

    return (
      <video
        ref={localRef}
        src={currentSrc}
        onError={handleVideoError}
        className={className}
        {...props}
      />
    );
  }
);

SmartVideo.displayName = 'SmartVideo';
export default SmartVideo;
