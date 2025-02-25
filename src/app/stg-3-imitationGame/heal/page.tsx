"use client";

import ClickButton from "@/components/ClickButton";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [decipherClicked, setDecipherClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showWrongAlert, setShowWrongAlert] = useState(false)

  function decipher() {
    setDecipherClicked(true);
  }

  function frankfurt() {
    router.push("/stg-4-tenet/frankfurt");
  }

  function stuttgart() {
    router.push("/stg-4-tenet/stuttgart");
  }

  function checkInput() {
    // Add your input validation logic here
    if (inputValue.trim() === "") {
      setShowWrongAlert(true);
      return;
    } else {
      if (inputValue.toUpperCase() === "FRANKFURTISNOTTHEBASE"){
        router.push("/stg-4-tenet/frankfurt"); 
      } else{
        setShowWrongAlert(true);
      }
    }
  }

  return (
    <>
      <video
        src="/videos/stg3-1.mp4"
        autoPlay
        loop
        muted
        className="h-screen w-screen object-cover max-h-screen absolute opacity-60 contrast-125 -z-10"
      />
      <div className="w-screen h-screen flex justify-end items-center gap-5 p-5">
        {!decipherClicked && (
          <motion.div
            className=" left-5 absolute w-3/5 h-[90vh] justify-center  flex flex-col p-4 border border-gray-700 bg-black rounded-xl shadow-lg text-gray-500 text-md leading-relaxed font-montserrat backdrop-blur-md bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="">
              Adam's vision blurred as he stumbled through the wreckage of his
              crashed ship, his hands slick with blood. The world around him was
              unrecognizable—a vast, desolate stretch of land under a cold
              German sky. His body ached, his mind clouded, but then… a flicker
              of light from his cracked visor. A message.
              <br />
              <br />
            </p>
            <p className="font-light text-xl text-gray-100 italic">
              ADM303: "Your location is compromised. You must move. Decipher the
              coordinates. Find the basecamp. Or you won't make it."
              <br />
              <br />
            </p>
            <p className="">
              An image loaded onto his interface, its symbols twisted and
              broken, a cipher waiting to be unraveled. Adam let out a sharp
              breath, his heart pounding. He was losing too much blood.
              <br />
              <br />
            </p>
            <p className="font-light text-xl text-gray-100 italic">
              "Stay with me, Adam."
              <br />
              <br />
            </p>
            <p className="">
              The voice wasn't his own. It was the AI embedded in his
              consciousness since birth—his shadow, his ghost, the only thing
              that had ever truly known him.
              <br />
              <br />
            </p>
            <p className="font-light text-xl text-gray-100 italic">
              "I've run simulations. The encryption method is old, possibly
              wartime. Focus."
              <br />
              <br />
            </p>
            <p className="text-gray-100">
              <span className="font-bold">Frankfurt</span> and{" "}
              <span className="font-bold">Stuttgart</span> are the closest
              cities to the crash site. The coordinates are:
              <br />
              <span className="font-mono block mt-2">
                50°6'39.3264"N, 8°40'55.6572"E
              </span>
              <span className="font-mono block my-2">
                48°46'59.9988"N, 9°10'59.9988"E
              </span>
            </p>
            <p className="text-gray-200 italic">
              "Adam, we have to move. Now."
              <br />
            </p>
            <p className="text-gray-100 leading-none text-3xl uppercase font-bold my-7 font-neueMachina tracking-wider">
              Help Adam decipher the image to find the basecamp and save his
              life.
            </p>
          </motion.div>
        )}

        <motion.div
          className="w-[36vw] p-4 h-[90vh] border flex flex-col justify-around items-center border-gray-700 bg-white rounded-xl shadow-lg text-gray-500 text-md leading-relaxed font-montserrat backdrop-blur-sm bg-opacity-5"
          initial={{ x: 0 }}
          animate={decipherClicked ? { x: "-170%" } : { x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src="/images/cipher.svg"
            width={500}
            height={500}
            alt="stg3-1"
            className="pointer-events-none z-0"
          />
          {!decipherClicked ? (
            <ClickButton
              text="Decipher"
              buttonColor="#DD0000"
              textColor="white"
              shadowColor="white"
              goTo={decipher}
            />
          ) : (
            <div className="w-full flex flex-col items-center">
              <input
              type="text"
              placeholder="deciphered message here"
              className="p-3 font-neueMachina text-xl rounded-md bg-opacity-5  bg-white w-full flex border border-white text-white uppercase placeholder:lowercase placeholder:font-thin placeholder:font-neueMachina placeholder:text-gray-400"
              onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="mb-14 text-left w-full text-lg">no spaces or special characters</p>
              <ClickButton
              text="Submit"
              buttonColor="#94FFA9"
              textColor="black"
              shadowColor="white"
              goTo={checkInput}
              />
            </div>
          )}
        </motion.div>

        {showWrongAlert && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-[#FF222230] px-6 py-4 text-center w-full z-50 absolute"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-[#FF2222] text-lg font-neueMachina tracking-wider font-bold">
              WRONG INPUT
            </h2>
            <p className="text-[#FF2222] text-lg mt-2 font-montserrat font-medium">
              That's the wrong answer. Try again.
              <br />
              Remember, the answer is in the message.
            </p>

            <button
              onClick={() => {
                setShowWrongAlert(false);
              }}
              className="mt-4 px-4 py-2 border font-montserrat font-semibold border-[#FF2222] text-[#FF2222] hover:bg-[#FF2222] hover:text-black transition-all rounded-md"
            >
              TRY AGAIN
            </button>
          </motion.div>
        </motion.div>
      )}

        {decipherClicked && (
          <motion.div
            className="right-5 absolute w-3/5 h-[90vh] -z-10  p-4 border border-gray-700 bg-black rounded-xl overflow-hidden shadow-lg text-gray-500 text-md leading-relaxed font-montserrat backdrop-blur-md bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src="/images/imitationGame.png"
              layout="fill"
              objectFit="cover"
              alt="stg3-1"
              className="pointer-events-none "
            />
          </motion.div>
        )}
      </div>
    </>
  );
}
