import React, { useState } from "react";

interface ButtonProps {
  text: string;
  buttonColor: string;
  textColor?: string;
  shadowColor?: string;
  goTo: () => void;
}

function ClickButton({ text, buttonColor, textColor = "black", shadowColor = "black", goTo }: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className="border border-black hover:rounded-sm flex w-[15vw] flex-row items-center justify-between rounded-xl px-5 transition-all duration-[150ms] cursor-pointer outline-none"
      onClick={goTo}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onKeyDown={(e) => e.key === "Enter" && goTo()}
      style={{
        backgroundColor: buttonColor,
        boxShadow: isActive ? "none" : `6px 6px 0px ${shadowColor}`,
        transform: isActive ? "translate(5px, 5px)" : "none",
      }}
    >
      <h3
        className="font-montserrat text-xl font-medium leading-none"
        style={{ color: textColor }}
      >
        {text.split("-")[0]} <br />
        {text.split("-")[1]}
      </h3>
      <span>
        <svg
          width="59"
          height="59"
          viewBox="0 0 59 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.75 41.7915L27.0417 29.4998L14.75 17.2082M31.9583 41.7915L44.25 29.4998L31.9583 17.2082"
            stroke={textColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export default ClickButton;
