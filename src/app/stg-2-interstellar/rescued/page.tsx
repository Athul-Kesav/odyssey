"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);


  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowMessage(true);
    }, 24000);

    const timer2 = setTimeout(() => {
      setVideoEnded(true);
    }, 32000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

useEffect(() => {
    if (videoEnded) {
        const timer = setTimeout(() => {
            router.push("/stg-3-imitationGame/");
        }, 5000);
        return () => clearTimeout(timer);
    }
}, [videoEnded, router]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setVideoOpacity(0);
  };

  return (
    <div className="flex justify-center items-center h-screen font-bold text-4xl">
      <video
        ref={videoRef}
        src="/videos/rescued.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop={false}
        onEnded={handleVideoEnd}
        style={{ opacity: videoOpacity, transition: "opacity 0.5s" }}
      />

      {(videoEnded || showMessage) && (
        <div className="absolute flex-col mix-blend-difference text-4xl text-[#FF2222] font-neueMachina bg-[#FF222250] w-full h-32 flex justify-center items-center text-center px-6 py-4">
          RESCUE FAILED !
          <span className="font-medium font-montserrat text-xl">
            The Escape Pod has crash landed in an unknown part of Germany. All
            hope seems lost...
          </span>
        </div>
      )}
    </div>
  );
}
