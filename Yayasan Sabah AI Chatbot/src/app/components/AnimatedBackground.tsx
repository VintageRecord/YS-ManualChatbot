import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function AnimatedBackground() {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('background-video', {
        videoId: 'OpeQnEjLwTk',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: 'OpeQnEjLwTk',
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            event.target.setPlaybackRate(0.8);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // When video ends, seek to beginning and replay
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
            // If video pauses, restart it
            if (event.data === window.YT.PlayerState.PAUSED) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        <div
          id="background-video"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          style={{
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Very light overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
