'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [videoEnded, setVideoEnded] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [videoOpacity, setVideoOpacity] = useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleTimeUpdate = () => {
                if (video.duration - video.currentTime <= 3) {
                    setShowMessage(true);
                }
            };
            video.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, []);

    const router = useRouter();

    useEffect(() => {
        if (videoEnded) {
            const timer = setTimeout(() => {
                router.push("/stg-3-imitationGame/");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [videoEnded, router]);

    useEffect(() => {
        if (videoEnded) {
            router.push("/stg-3-imitationGame/");
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
                style={{ opacity: videoOpacity, transition: 'opacity 0.5s' }}
            />

            {(videoEnded || showMessage) && (
                <div className="absolute flex-col mix-blend-difference text-4xl text-[#FF2222] font-neueMachina bg-[#FF222250] w-full h-32 flex justify-center items-center text-center px-6 py-4">
                    RESCUE FAILED !
                    <span className='font-medium font-montserrat text-xl'>The Escape Pod has crash landed in an unknown part of Germany. All hope seems lost...</span>
                </div>
            )}
        </div>
    );
}