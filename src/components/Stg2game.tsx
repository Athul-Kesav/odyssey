"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation"
import ClickButton from "./ClickButton";
import Image from "next/image";
import cross from "../../public/cross.svg";
import bspace from "../../public/arrow-left-to-line.svg";

const TARGET_NUMBER = "10121815";

const Game = () => {

    const router = useRouter();
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState(Array(8).fill(""));

    const handleInput = (num: any) => {
        if (input.length < 8) {
            setInput((prev) => prev + num);
        }
    };

    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleClear = () => {
        setInput("");
        setFeedback(Array(8).fill(""));
    };

    const checkGuess = () => {
        if (input.length < 8) return;

        let newFeedback = Array(8).fill("");
        let targetCount = Array(10).fill(0);
        let inputCount = Array(10).fill(0);

        // First pass: check for correct positions (green)
        for (let i = 0; i < 8; i++) {
            if (input[i] === TARGET_NUMBER[i]) {
                newFeedback[i] = "green";
            } else {
                targetCount[parseInt(TARGET_NUMBER[i])]++; // Count digits in target number
                inputCount[parseInt(input[i])]++; // Count digits in input
            }
        }

        // Second pass: check for correct numbers in wrong positions (yellow)
        for (let i = 0; i < 8; i++) {
            if (newFeedback[i] !== "green") {
                if (targetCount[parseInt(input[i])] > 0) {
                    newFeedback[i] = "yellow";
                    targetCount[parseInt(input[i])]--;
                } else {
                    newFeedback[i] = "red";
                }
            }
        }

        setFeedback(newFeedback);

        if (newFeedback.every((feedback) => feedback === "green")) {
            router.push("/stg-2-interstellar/rescued");
        } else {
            setTimeout(() => {
                setInput(""); // Clear input after feedback is shown
                setFeedback(Array(8).fill(""));
            }, 2500);
        }
    };

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const numpad = shuffleArray([...Array(10).keys()]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen"
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex gap-2 mb-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-16 h-16 flex items-center justify-center text-xl border-2 rounded-lg transition-all text-black font-neueMachina ${
                            feedback[i] === "green"
                                ? "bg-green-500 text-black border-green-700"
                                : feedback[i] === "yellow"
                                ? "bg-yellow-400 text-black border-yellow-600"
                                : feedback[i] === "red"
                                ? "bg-red-500 text-black border-red-700"
                                : "bg-[#AAAAAA30] border-[#AAAAAA] text-white"
                        }`}
                    >
                        {input[i] || ""}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
                {numpad.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleInput(num.toString())}
                        className="flex items-center justify-center w-[8.3rem] h-16 max-h-32 max-w-40 top-[-3rem] right-0 border border-[#060112] text-white font-medium rounded-md cursor-pointer hover:shadow-[3px_3px_0px_#AAAAAA] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:border-[#AAAAAA] transition-all duration-150 font-neueMachina active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
                    >
                        {num}
                    </button>
                ))}
                <div
                    className="flex items-center justify-center w-[8.3rem] h-16 max-h-32 max-w-40 top-[-3rem] right-0 bg-[#FF2222] rounded-md cursor-pointer hover:shadow-[3px_3px_0px_white] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-75 active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
                    onClick={() => {
                        handleBackspace();
                    }}
                >
                    <Image src={bspace} alt="cross" width={30} height={30} />
                </div>

                <div
                    className="flex items-center justify-center w-[8.3rem] h-16 max-h-32 max-w-40 top-[-3rem] right-0 bg-[#FF2222] rounded-md cursor-pointer hover:shadow-[3px_3px_0px_white] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-75 active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
                    onClick={() => {
                        handleClear();
                    }}
                >
                    <Image src={cross} alt="cross" width={20} height={20} />
                </div>
            </div>
            <div className="m-6">
                <ClickButton
                    text="open"
                    buttonColor="#94FFA9"
                    textColor="black"
                    shadowColor="white"
                    goTo={() => checkGuess()}
                />
            </div>
        </motion.div>
    );
};

export default Game;
