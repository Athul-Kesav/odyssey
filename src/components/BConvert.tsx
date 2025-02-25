"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import cross from "../../public/cross.svg";

interface BConvertProps {
  func: () => void; // Callback function for closing the component
}

export default function BConvert({ func }: BConvertProps) {
  const [decimal, setDecimal] = useState<number | "">("");
  const [binary, setBinary] = useState<string>("0");

  useEffect(() => {
    if (decimal !== "" && !isNaN(decimal)) {
      setBinary(decimalToBinary(decimal));
    } else {
      setBinary("0");
    }
  }, [decimal]);

  function decimalToBinary(n: number): string {
    return n.toString(2);
  }

  return (
    <motion.div
      className="flex flex-col relative box-content max-w-[30vw] max-h-32 bg-white h-full w-full rounded-lg p-5 justify-around"
      animate={{ opacity: [0, 1], filter: ["blur(20px)", "blur(0px)"] }}
      transition={{ duration: 0.7 }}
    >
      {/* Close Button */}
      <div
        className="absolute flex items-center justify-center w-10 h-10 top-[-3rem] right-0 bg-[#FF2222] rounded-md cursor-pointer hover:shadow-[3px_3px_0px_white] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-75 active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
        onClick={() => {
          setDecimal("");
          func();
        }}
      >
        <Image src={cross} alt="close" width={30} height={30} />
      </div>

      {/* Decimal Input */}
      <span className="flex gap-4">
        <h1 className="text-black text-3xl font-neueMachina">Decimal</h1>
        <input
          type="text"
          placeholder="Enter in decimal"
          value={decimal}
          onChange={(e) => {
            const value = e.target.value;
            setDecimal(value === "" ? "" : parseInt(value) || "");
          }}
          className="text-white font-neueMachina p-3 w-full focus:outline-none bg-black rounded-md placeholder:text-gray-300/50"
        />
      </span>

      {/* Binary Output */}
      <span className="flex gap-4">
        <h1 className="text-black text-3xl font-neueMachina">Binary</h1>
        <div className="p-3 bg-black text-white font-neueMachina h-full w-full ml-7 rounded-md">
          {binary}
        </div>
      </span>
    </motion.div>
  );
}
