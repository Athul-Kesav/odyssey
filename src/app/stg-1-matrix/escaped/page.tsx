'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {useRouter } from "next/navigation"

const Escaped = () => {
  const noSignal = "/videos/noSignal.mp4";
  const [videoEnded, setVideoEnded] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires returnValue to show a warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/stg-2-interstellar")
    }, 7000)

    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen '>
      {videoEnded? (
        <motion.div
          className='text-lg font-spaceMono text-gray-500'
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Recalibrating
        </motion.div>
      ) :(
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={noSignal}
          autoPlay
          playsInline
          onEnded={() => setVideoEnded(true)}
        />
      ) }
    </div>
  )
}

export default Escaped