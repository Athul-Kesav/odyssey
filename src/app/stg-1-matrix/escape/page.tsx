"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import ClickButton from "@/components/ClickButton";
import { useRouter } from "next/navigation";
import BConvert from "@/components/BConvert";
import React from "react";
import TextReveal from "@/components/TextReveal";

//import musicFile from "../../../../public/audios/music-stg1.mp3";

function Escape() {
  //const audio = new Audio(musicFile);
  //audio.loop = true;
  //audio.play();
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSize = useMotionValue(32);

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [bcVisible, setBcVisible] = useState(false);

  const [binarySequence, setBinarySequence] = useState(Array(9).fill(""));

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
      setIsTimeUp(true);
    }, 10 * 60 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - cursorSize.get() / 2);
      mouseY.set(e.clientY - cursorSize.get() / 2);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [mouseX, mouseY, cursorSize]);

  function revealBcal() {
    const t = setTimeout(() => {
      setBcVisible(true);
    }, 500);

    return () => clearTimeout(t);
  }

  function turnGreen() {
    binarySequence.forEach((_, index) => {
      const box = document.getElementById(`box-${index}`);
      if (box) box.style.color = "#94FFA9";
    });

    router.push("/stg-1-matrix/escaped");
  }

  function turnRed() {
    binarySequence.forEach((_, index) => {
      const box = document.getElementById(`box-${index}`);
      if (box) box.style.color = "#FF2222";
    });

    setTimeout(() => {
      setBinarySequence(Array(9).fill(""));
      binarySequence.forEach((_, index) => {
        const box = document.getElementById(`box-${index}`);
        if (box) box.style.color = "white";
      });
    }, 800);
  }

  function escape() {
    // Check if all boxes are filled
    if (binarySequence.includes("")) {
      return;
    }

    const binaryString = binarySequence.join("");
    const oVal = parseInt(binaryString, 2).toString(8);

    if (oVal === "457") {
      turnGreen();
    } else {
      turnRed();
    }
  }

  const gridInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newSequence = [...binarySequence];

    if (value === "0" || value === "1" || value === "") {
      newSequence[index] = value;
      setBinarySequence(newSequence);
    }
  };

  return (
    <>
      <div className=" overflow-hidden flex h-screen w-screen justify-center items-start">
        <AnimatePresence>
          {bcVisible && (
            <motion.div
              className="h-screen w-screen flex flex-col justify-center items-center bg-black absolute z-50"
              exit={{ opacity: [1, 0], filter: ["blur(0px)", "blur(20px)"] }}
              animate={{ opacity: [0, 1], filter: ["blur(20px)", "blur(0px)"] }}
              transition={{ duration: 0.7 }}
            >
              <BConvert
                func={() => {
                  const t = setTimeout(() => {
                    setBcVisible(false);
                  }, 500);

                  return () => clearTimeout(t);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex relative flex-col mask h-screen w-2/3 z-30 justify-center items-center">
          <TextReveal />
        </div>

        <div className="flex flex-col h-screen w-1/3 pr-10">
          <div className="h-1/5 w-full flex flex-col justify-center items-end">
            {isTimeUp ? (
              <ClickButton
                text="use binary-converter"
                buttonColor="#C61111"
                textColor="white"
                goTo={revealBcal}
                shadowColor="white"
              />
            ) : (
              ""
            )}
          </div>

          <div className="h-3/5 w-full flex flex-col justify-center items-end">
            <div className="w-3/5 h-3/5 grid grid-cols-3 grid-rows-3 rounded-2xl gap-3">
              {binarySequence.map((bit, index) => (
                <input
                  key={index}
                  id={`box-${index}`}
                  type="text"
                  maxLength={1}
                  value={bit}
                  onChange={(e) => gridInput(index, e)}
                  className="w-full h-full text-center border-[1px] border-gray-100 bg-transparent rounded text-5xl text-white font-spaceMono"
                />
              ))}
            </div>
          </div>

          <div className="h-1/5 w-full flex flex-col justify-center items-end">
            <ClickButton
              text="escape"
              buttonColor="#94FFA9"
              goTo={escape}
              shadowColor="white"
            />
          </div>
        </div>
      </div>
      <div className="absolute p-7 top-0 left-0 font-extralight origin-center font-montserrat text-4xl flex justify-center items-center">
        It&apos;s all dark in here <br />
        move around to look for the escape.
      </div>
    </>
  );
}

export default Escape;
