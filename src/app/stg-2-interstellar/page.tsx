"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function interstella() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/stg-2-interstellar/rescue"); // Change this to your target route
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <div className="absolute w-screen z-10 h-screen flex mix-blend-lighten flex-col justify-center items-center bg-black">
        <video
          src="/videos/stg2.mp4"
          autoPlay
          loop
          muted
          className="h-screen w-screen object-cover max-h-screen "
        />
      </div>
      <motion.div
        className=" absolute text-3xl uppercase -z-10 bg-black text-white font-neueMachina font-black flex flex-col h-screen w-screen justify-center items-center"
        animate={{ opacity: [0, 1], filter: ["blur(50px)", "blur(0px)"] }}
        transition={{ duration: 2 }}
      >
        <div>
          <span className="text-left">
            Stage 2 <br />
          </span>
          <span className="text-7xl font-brigends">The Astralis</span>
        </div>
      </motion.div>
    </>
  );
}
