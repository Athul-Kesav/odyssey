import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ProgressBarProps {
  start?: number;
  duration?: number;
}

export default function ProgressBar({ start = 100, duration = 5 }: ProgressBarProps) {
  const [showDeathAlert, setShowDeathAlert] = useState(false);
  const [showRevivalAlert, setShowRevivalAlert] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDeathAlert(true);
    }, duration * 1000);

    return () => clearTimeout(timeout);
  }, [resetKey, duration]);

  const handleContinue = () => {
    setShowDeathAlert(false);
    setTimeout(() => setShowRevivalAlert(true), 500);
  };

  const handleRevival = () => {
    setShowRevivalAlert(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center w-full h-full text-white">
      <div className="text-center w-full">
        <h1 className="text-2xl font-black animate-[pulse_0.5s_infinite] mb-4 text-[#FF2222] uppercase drop-shadow-[0_0_10px_red]">
          OXYGEN
        </h1>

        {/* Progress Bar */}
        <div className="relative w-full h-5 bg-transparent rounded-sm overflow-hidden drop-shadow-[0_0_1px_red]">
          <motion.div
            key={resetKey} // Ensures animation resets on revival
            className="absolute h-full bg-gradient-to-r from-red-950 to-[#FF2222] rounded-sm"
            initial={{ width: `${start}%` }}
            animate={{ width: "0%" }}
            transition={{ duration: duration, ease: "linear" }}
          />
        </div>
      </div>

      {/* Death Alert */}
      {showDeathAlert && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-[#FF222230] border-t-[#FF2222] px-6 py-4 text-center w-full max-w-sm rounded-md shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-[#FF2222] text-lg font-neueMachina tracking-wider font-bold">
              CRITICAL FAILURE!
            </h2>
            <p className="text-[#FF2222] text-md mt-2">
              Oxygen depleted. Mission failed.
            </p>

            <button
              onClick={handleContinue}
              className="mt-4 px-4 py-2 border border-[#FF2222] font-montserrat font-semibold text-[#FF2222] hover:bg-[#FF2222] hover:text-black transition-all rounded-md"
            >
              CONTINUE
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Revival Alert */}
      {showRevivalAlert && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-[#94FFA930] px-6 py-4 text-center w-full max-w-sm rounded-md shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-[#94FFA9] text-lg font-neueMachina tracking-wider font-bold">
              REVIVAL?
            </h2>
            <p className="text-[#94FFA9] text-lg mt-2">
              Oh, how did I come back to life?
              <br />
              Am I still stuck inside the matrix?!
            </p>

            <button
              onClick={handleRevival}
              className="mt-4 px-4 py-2 border font-montserrat font-semibold border-[#94FFA9] text-[#94FFA9] hover:bg-[#94FFA9] hover:text-black transition-all rounded-md"
            >
              TRY AGAIN
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
