"use client";
import { motion, useInView } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Matrix() {
  const matrixVid = "/videos/matrixVid.mp4";
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
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
      router.push("/stg-1-matrix/finale/end"); // Change this to your target route
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className=" overflow-hidden h-screen w-screen flex flex-col items-center justify-center bg-black">
      <span className="absolute font-neueMachina text-white z-40 flex flex-col items-center justify-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 5 }}
          className="text-7xl font-bold font-brigends leading-none bg-blend-difference"
        >
          <div className="font-neueMachina font-black text-3xl">Stage 1</div>
          The Matrix
        </motion.h2>
      </span>

      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={matrixVid}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="mix-blend-darken absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,1)_5%,_rgba(0,0,0,0.5)_50%,_rgba(0,0,0,0)_100%)]" />
    </div>
  );
}

export default Matrix;
