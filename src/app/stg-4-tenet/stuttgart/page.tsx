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

  return (
    <div className="min-h-screen relative">
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

      {/* Tooltip with one-line hints for terminal commands */}
      {tooltipVisible && (
        <div className="absolute top-20 left-[80vw] p-4 bg-black text-green-400 font-mono rounded-lg shadow-lg">
          <div>
            <span className="font-bold">ls:</span> List directory contents
          </div>
          <div>
            <span className="font-bold">cd:</span> Change directory
          </div>
          <div>
            <span className="font-bold">open:</span> Open file in new window
          </div>
          <div>
            <span className="font-bold">cat:</span> Display file content
          </div>
        </div>
      )}

      {/* Background Wallpaper */}
      <div className="absolute -z-20 w-screen h-screen">
        <Image
          src="/images/wallpaper.png"
          alt="Wallpaper"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Desktop label */}
      <div className="absolute top-4 left-4 text-green-500 font-mono text-lg">
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
            <pre className="text-white whitespace-pre-wrap">
              {win.file.content}
            </pre>
          ) : (
            <Image
              src={win.file.content}
              alt={win.file.name}
              className="object-contain w-full h-full"
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
