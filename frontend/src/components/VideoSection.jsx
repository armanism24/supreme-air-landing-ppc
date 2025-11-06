import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // For mobile devices, we need to be more aggressive with autoplay
      if (isMobile) {
        // On mobile, try to autoplay with sound first
        video.muted = false;
        setIsMuted(false);
        
        // Add event listeners for mobile-specific events
        const handleTouchStart = () => {
          setHasUserInteracted(true);
          video.muted = false;
          setIsMuted(false);
        };
        
        const handleCanPlay = () => {
          // Try to play with sound on mobile
          video.play().then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          }).catch(() => {
            // If autoplay with sound fails on mobile, try muted
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              setIsPlaying(false);
            });
          });
        };

        // Add touch event listener for mobile
        document.addEventListener('touchstart', handleTouchStart, { once: true });
        video.addEventListener('canplay', handleCanPlay, { once: true });
        
        // Cleanup
        return () => {
          document.removeEventListener('touchstart', handleTouchStart);
          video.removeEventListener('canplay', handleCanPlay);
        };
      } else {
        // Desktop behavior
        video.muted = false;
        setIsMuted(false);
        
        // Try to autoplay with sound
        video.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch(() => {
          // If autoplay with sound fails, try muted autoplay
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // If all autoplay fails, video will be paused
            setIsPlaying(false);
          });
        });
      }
    }
  }, [isMobile]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      setHasUserInteracted(true);
      if (video.paused) {
        // Enable sound when user plays
        video.muted = false;
        setIsMuted(false);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // If play fails, try muted
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => {
            setIsPlaying(true);
          });
        });
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      setHasUserInteracted(true);
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            See Our Professional Air Duct Cleaning Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how Supreme Air Austin delivers exceptional results with our advanced equipment and certified technicians
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              className="w-full h-auto aspect-video"
              autoPlay
              loop
              playsInline
              preload="auto"
              muted={false}
              onPlay={() => {
                setIsPlaying(true);
                // Ensure sound is enabled when video plays
                if (videoRef.current && hasUserInteracted) {
                  videoRef.current.muted = false;
                  setIsMuted(false);
                }
              }}
              onPause={() => setIsPlaying(false)}
              onLoadedData={() => {
                // Set initial state when video loads
                if (videoRef.current) {
                  setIsPlaying(!videoRef.current.paused);
                  setIsMuted(videoRef.current.muted);
                }
              }}
              onCanPlay={() => {
                // For mobile, try to play with sound when video is ready
                if (isMobile && videoRef.current && !hasUserInteracted) {
                  videoRef.current.muted = false;
                  setIsMuted(false);
                  videoRef.current.play().catch(() => {
                    // If it fails, try muted
                    videoRef.current.muted = true;
                    setIsMuted(true);
                    videoRef.current.play().catch(() => {
                      setIsPlaying(false);
                    });
                  });
                }
              }}
            >
              <source 
                src="https://customer-assets.emergentagent.com/job_ductpros-atx/artifacts/q01akgl6_Supreme-Air-Air-Duct-Cleaning-Revised.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-semibold">Supreme Air Austin</span>
              </div>
            </div>

            {/* Video overlay for mobile tap-to-play */}
            <div 
              className="absolute inset-0 bg-transparent" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const video = videoRef.current;
                if (video) {
                  // Enable sound on user interaction
                  video.muted = false;
                  setIsMuted(false);
                  setHasUserInteracted(true);
                }
                togglePlay();
              }}
              onTouchStart={(e) => {
                // Handle touch events for mobile
                e.preventDefault();
                e.stopPropagation();
                const video = videoRef.current;
                if (video) {
                  video.muted = false;
                  setIsMuted(false);
                  setHasUserInteracted(true);
                }
                togglePlay();
              }}
            >
              {/* Show unmute prompt if video is muted and user hasn't interacted */}
              {isMuted && !hasUserInteracted && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                  🔊 {isMobile ? 'Tap to play with sound' : 'Click to play with sound'}
                </div>
              )}
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-[#009ed7] to-[#8FC73D] text-white py-6 px-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Professional Results You Can See</h3>
              <p className="text-lg opacity-90 mb-4">
                This video showcases our thorough air duct cleaning process using industry-leading equipment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#009ed7] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Schedule Your Service
                </button>
                <button 
                  onClick={() => window.open('tel:+15122779782')}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#009ed7] transition-colors"
                >
                  Call (512) 277-9782
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;