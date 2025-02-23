"use client";
import ClickButton from "@/components/ClickButton";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

import Stg2game from "@/components/Stg2game";
import OxyMeter from "@/components/OxyMeter";

export default function Rescue() {
  const [msgRead, setMsgRead] = useState(false);

  return (
    <motion.div
      className="overflow-hidden relative w-screen h-screen bg-[#060112] text-white font-montserrat"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Video */}
      <video
        src="/videos/rescue1.mp4"
        className={`absolute inset-0 w-full h-full object-cover opacity-50 ${
          msgRead ? "hidden" : ""
        }`}
        autoPlay
        loop
        muted
      />

      {/* Message Box (Glassmorphism) */}
      {!msgRead && (
        <motion.div
          className="absolute top-10 left-10 p-8 w-2/5 bg-black/10 backdrop-blur-lg rounded-lg shadow-lg h-fit border border-white/20 z-10"
          transition={{ duration: 2.5 }}
        >
          <h1 className="text-4xl font-bold text-left my-6">Rescue Mission</h1>
          <p className="text-lg font-thin leading-relaxed text-white">
            Adam's mission is critical.
            <br />
            He must save his friend{" "}
            <span className="font-bold text-yellow-400">ECHO</span> before the
            oxygen runs out. The space station is on a collision course, and
            only Adam can redirect it to Earth. But to do so, he must hack into
            the system using a secret 6-digit pin to find a possible landing
            station.
          </p>
          <p className="text-lg font-thin leading-relaxed text-white mt-4">
            Time is ticking, and every second counts.
            <br />
            Will Adam decipher the code in time to save ECHO and redirect the
            space station to Earth? The fate of his friend and the mission rests
            in his hands.
          </p>
        </motion.div>
      )}

      {/* Button to Proceed */}
      {!msgRead && (
        <div className="absolute bottom-10 right-10 z-20">
          <ClickButton
            text="help Adam-rescue echo"
            buttonColor="#94FFA9"
            textColor="black"
            shadowColor="white"
            goTo={() => {
              setMsgRead(true);
            }}
          />
        </div>
      )}

      {msgRead && (
        <div className="absolute w-screen h-screen z-0">
          <video
            src="/videos/alarms.mp4"
            className="opacity-0"
            loop
            autoPlay
            ref={(video) => {
              if (video) video.volume = 0.003;
            }}
          />
        </div>
      )}

      {/* Game Section */}
      {msgRead && (
        <motion.div
          className="absolute inset-0 flex justify-center items-center text-xl font-extralight font-montserrat z-10"
          transition={{ duration: 2.5 }}
        >
          <div className="w-1/2 p-6 bg-white/10 backdrop-blur-md m-10 rounded-lg shadow-lg border border-white/20 text-gray-200">
            <p className="text-lg font-thin leading-relaxed text-white mt-4">
              Enter the pin before the oxygen runs out, get access to the system
              to save ECHO and redirect the space station to Earth.
              <br />
              <br />
              The pin has unique properties:
            </p>
            <div className="text-lg font-light text-gray-300 mt-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                <span className="font-semibold text-green-400 tracking-wide">
                  GREEN
                </span>
                <span className="opacity-80">
                  Correct number in the correct spot
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]"></div>
                <span className="font-semibold text-yellow-400 tracking-wide">
                  YELLOW
                </span>
                <span className="opacity-80">
                  Correct number in the wrong spot
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
                <span className="font-semibold text-red-400 tracking-wide">
                  RED
                </span>
                <span className="opacity-80">Wrong number</span>
              </div>
            </div>
          </div>

          {/* Game + Oxygen Meter */}
          <div className="w-1/2 relative">
            <Stg2game />
            <div className="w-full text-black font-5xl font-neueMachina absolute bottom-0 p-5 m-5">
              <OxyMeter start={75} duration={150} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
