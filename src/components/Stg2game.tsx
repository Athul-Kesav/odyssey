"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ClickButton from "./ClickButton";
import Image from "next/image";
import cross from "../../public/cross.svg";
import bspace from "../../public/arrow-left-to-line.svg";

const TARGET_NUMBER = "28082004";

const Game = () => {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState<string[]>(Array(8).fill(""));

    /* const handleInput = (num: string) => {
        setInput((prev) => (prev.length < 8 ? prev + num : prev));
    };

    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleClear = () => {
        setInput("");
        setFeedback(Array(8).fill(""));
    }; */

    const checkGuess = () => {
        if (input.length < 8) return;

        const newFeedback = Array(8).fill("");
        const targetCount: Record<string, number> = {};
        const inputCount: Record<string, number> = {};

        // Count occurrences of each digit in the target number
        for (const char of TARGET_NUMBER) {
            targetCount[char] = (targetCount[char] || 0) + 1;
        }

        // First pass: check correct positions (green)
        for (let i = 0; i < 8; i++) {
            if (input[i] === TARGET_NUMBER[i]) {
                newFeedback[i] = "green";
                targetCount[input[i]]--;
            } else {
                inputCount[input[i]] = (inputCount[input[i]] || 0) + 1;
            }
        }

        // Second pass: check misplaced digits (yellow)
        for (let i = 0; i < 8; i++) {
            if (newFeedback[i] !== "green" && targetCount[input[i]] > 0) {
                newFeedback[i] = "yellow";
                targetCount[input[i]]--;
            } else if (newFeedback[i] !== "green") {
                newFeedback[i] = "red";
            }
        }

        setFeedback(newFeedback);

        if (newFeedback.every((color) => color === "green")) {
            router.push("/stg-2-interstellar/rescued");
        } else {
            setTimeout(() => {
                setInput("");
                setFeedback(Array(8).fill(""));
            }, 2500);
        }
    };

    const generateRandomNumpad = () => {
        const numbers = [...Array(10).keys()];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers;
    };

    const [numpad, setNumpad] = useState(generateRandomNumpad());

    const handleInput = (num: string) => {
        setInput((prev) => (prev.length < 8 ? prev + num : prev));
        setNumpad(generateRandomNumpad());
    };

    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
        setNumpad(generateRandomNumpad());
    };

    const handleClear = () => {
        setInput("");
        setFeedback(Array(8).fill(""));
        setNumpad(generateRandomNumpad());
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen"
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Input Display */}
            <div className="flex gap-2 mb-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-16 h-16 flex items-center justify-center text-xl border-2 rounded-lg transition-all text-black font-neueMachina ${
                            feedback[i] === "green"
                                ? "bg-green-500 border-green-700"
                                : feedback[i] === "yellow"
                                ? "bg-yellow-400 border-yellow-600"
                                : feedback[i] === "red"
                                ? "bg-red-500 border-red-700"
                                : "bg-[#AAAAAA30] border-[#AAAAAA] text-white"
                        }`}
                    >
                        {input[i] || ""}
                    </div>
                ))}
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-3">
                {numpad.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleInput(num.toString())}
                        className="flex items-center justify-center w-[8.3rem] h-16 max-h-32 max-w-40 border border-[#060112] text-white font-medium rounded-md cursor-pointer hover:shadow-[3px_3px_0px_#AAAAAA] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:border-[#AAAAAA] transition-all duration-150 font-neueMachina active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
                    >
                        {num}
                    </button>
                ))}

                {/* Backspace Button */}
                <button
                    onClick={handleBackspace}
                    className="flex items-center justify-center w-[8.3rem] h-16 bg-[#FF2222] rounded-md cursor-pointer hover:shadow-[3px_3px_0px_white] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-75 active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
                >
                    <Image src={bspace} alt="backspace" width={30} height={30} />
                </button>

                {/* Clear Button */}
                <button
                    onClick={handleClear}
                    className="flex items-center justify-center w-[8.3rem] h-16 bg-[#FF2222] rounded-md cursor-pointer hover:shadow-[3px_3px_0px_white] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-75 active:shadow-[0px_0px_0px_white] active:translate-x-0 active:translate-y-0"
                >
                    <Image src={cross} alt="clear" width={20} height={20} />
                </button>
            </div>

            {/* Submit Button */}
            <div className="m-6">
                <ClickButton
                    text="open"
                    buttonColor="#94FFA9"
                    textColor="black"
                    shadowColor="white"
                    goTo={checkGuess}
                />
            </div>
        </motion.div>
    );
};

export default Game;
