"use client";

import React, { useState } from "react";
import ResizableWindow from "@/components/ResizableWindow";
import Terminal, { FileData } from "@/components/Terminal";
import Image from "next/image";

const LinuxDesktopPage: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<
    Array<{ id: number; file: FileData }>
  >([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [objectiveVisible, setObjectiveVisible] = useState(false);

  const handleOpenFile = (file: FileData) => {
    setOpenWindows((prev) => [...prev, { id: Date.now(), file }]);
  };

  const handleCloseWindow = (id: number) => {
    setOpenWindows((prev) => prev.filter((win) => win.id !== id));
  };

  const showToolTip = () => {
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 5000);
  };

  function showObjective(){
    setObjectiveVisible(true);
    setTimeout(() => {
      setObjectiveVisible(false);
    }, 15000);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Info icon to show tooltip */}
      <div className="w-10 h-10 top-8 left-[96vw] justify-center items-center flex absolute cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hover:scale-150 transition-all active:scale-110"
          onClick={showToolTip}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <div className="w-full origin-center h-10 top-1 justify-center  items-center flex absolute cursor-pointer hover:scale-110 transition-all active:scale-100 "
      onClick={showObjective}>
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <div>
          <span className="font-neueMachina">OBJECTIVE</span>
        </div>
      </div>

      {/* Tooltip with one-line hints for terminal commands */}
      {tooltipVisible && (
        <div className="absolute top-20 left-[65vw] pointer-events-none gap-2 flex flex-col p-4 bg-black text-green-400 font-mono rounded-lg shadow-lg">
          <div>
            <span className="font-light text-xl bg-gray-200 m-2 font-spaceMono rounded-md px-2 text-black">
              ls
            </span>{" "}
            - List directory contents
          </div>
          <div>
            <span className="font-light text-xl bg-gray-200 m-2 font-spaceMono rounded-md px-2 text-black">
              cd filename
            </span>{" "}
            - Change directory to filename
          </div>
          <div>
            <span className="font-light text-xl bg-gray-200 m-2 font-spaceMono rounded-md px-2 text-black">
              cd ..
            </span>{" "}
            - Change directory - go back
          </div>
          <div>
            <span className="font-light text-xl bg-gray-200 m-2 font-spaceMono rounded-md px-2 text-black">
              open filename
            </span>{" "}
            - Open file in new window
          </div>
          <div>
            <span className="font-light text-xl bg-gray-200 m-2 font-spaceMono rounded-md px-2 text-black">
              cat filename
            </span>{" "}
            - Display file content
          </div>
        </div>
      )}

      {/* Objective */}
      {objectiveVisible && (
        <div className="absolute top-20 w-full  origin-center pointer-events-none gap-2 flex flex-col p-4 bg-black/30 backdrop-blur-md text-green-400 font-spaceMono shadow-lg">
          <div>
            You are supposed to look for clues inside the files. Use the terminal to navigate through the directories and open the files.
            <br/>
            Figure out the pattern and find out the keyword to hack the computer.
            <br/>
            Finally, type the keyword on the terminal in the root directory to complete the mission.
          </div>
        </div>
      )}

      {/* Background Wallpaper */}
      <div className="absolute -z-20 w-screen h-screen pointer-events-none">
        <Image
          src="/images/wallpaper.png"
          alt="Wallpaper"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Desktop label */}
      <div className="absolute top-4 left-4 text-green-500 font-spaceMono text-lg pointer-events-none">
        Linux Desktop
      </div>

      {/* Open file windows */}
      {openWindows.map((win) => (
        <ResizableWindow
          key={win.id}
          title={win.file.name}
          initialWidth={500}
          initialHeight={300}
          initialX={150}
          initialY={100}
          onClose={() => handleCloseWindow(win.id)}
        >
          {win.file.type === "text" ? (
            <div
              className="text-white whitespace-pre-wrap font-neueMachina scrollbar-hide"
              dangerouslySetInnerHTML={{ __html: win.file.content }}
            />
          ) : (
            <Image
              src={win.file.content}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={win.file.name}
              className="object-cover w-full h-full absolute z-0"
            />
          )}
        </ResizableWindow>
      ))}

      {/* Terminal always open at the bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <Terminal onOpenFile={handleOpenFile} />
      </div>
    </div>
  );
};

export default LinuxDesktopPage;
