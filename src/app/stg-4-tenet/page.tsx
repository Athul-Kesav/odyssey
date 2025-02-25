'use client'

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/stg-4-tenet/stuttgart");
    }, 7000);
    return () => clearTimeout(t);
  },[])


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

  return (
    <>
      <div className="absolute overflow-hidden w-screen z-10 h-screen flex mix-blend-lighten flex-col justify-center items-center bg-black">
        <video
          src="/videos/stg4-1.mp4"
          autoPlay
          loop
          muted
          className="h-screen w-screen object-cover object-center max-h-screen"
        />
      </div>
      <motion.div
        className=" absolute text-3xl uppercase -z-10  text-white font-neueMachina font-black flex flex-col h-screen w-screen justify-center items-center"
        animate={{ opacity: [0, 1], filter: ["blur(50px)", "blur(0px)"] }}
        transition={{ duration: 2 }}
      >
        <div>
          <span className="text-left">
            Stage 4 <br />
          </span>
          <span className="text-7xl font-brigends">The Zweck</span>
        </div>
      </motion.div>
    </>
  );
}
