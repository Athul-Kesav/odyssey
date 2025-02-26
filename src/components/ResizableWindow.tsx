import React, { useState, useEffect, useRef } from "react";

interface ResizableWindowProps {
  title: string;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  children?: React.ReactNode;
  onClose?: () => void;
}

const ResizableWindow: React.FC<ResizableWindowProps> = ({
  title,
  initialWidth = 600,
  initialHeight = 400,
  initialX = 100,
  initialY = 100,
  children,
  onClose,
}) => {
  const minWidth = 300;
  const minHeight = 200;

  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Used for both resizing and dragging:
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Refs for dragging
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const dragWindowPosRef = useRef(position);

  const windowRef = useRef<HTMLDivElement>(null);

  // Handler for starting a drag (move)
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    dragWindowPosRef.current = position;
    e.preventDefault();
    e.stopPropagation();
  };

  // Handler for starting a resize
  const handleResizeMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    direction: string
  ) => {
    setIsResizing(true);
    setResizeDir(direction);
    setLastMousePos({ x: e.clientX, y: e.clientY });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    // Handle dragging first
    if (isDragging) {
      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      setPosition({
        x: dragWindowPosRef.current.x + dx,
        y: dragWindowPosRef.current.y + dy,
      });
      return;
    }

    // If not dragging, handle resizing
    if (!isResizing || !resizeDir) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    let newWidth = dimensions.width;
    let newHeight = dimensions.height;
    let newX = position.x;
    let newY = position.y;

    switch (resizeDir) {
      case "right":
        newWidth = Math.max(dimensions.width + deltaX, minWidth);
        break;
      case "bottom":
        newHeight = Math.max(dimensions.height + deltaY, minHeight);
        break;
      case "left":
        newWidth = Math.max(dimensions.width - deltaX, minWidth);
        newX = position.x + deltaX;
        break;
      case "top":
        newHeight = Math.max(dimensions.height - deltaY, minHeight);
        newY = position.y + deltaY;
        break;
      case "top-right":
        newWidth = Math.max(dimensions.width + deltaX, minWidth);
        newHeight = Math.max(dimensions.height - deltaY, minHeight);
        newY = position.y + deltaY;
        break;
      case "top-left":
        newWidth = Math.max(dimensions.width - deltaX, minWidth);
        newHeight = Math.max(dimensions.height - deltaY, minHeight);
        newX = position.x + deltaX;
        newY = position.y + deltaY;
        break;
      case "bottom-right":
        newWidth = Math.max(dimensions.width + deltaX, minWidth);
        newHeight = Math.max(dimensions.height + deltaY, minHeight);
        break;
      case "bottom-left":
        newWidth = Math.max(dimensions.width - deltaX, minWidth);
        newHeight = Math.max(dimensions.height + deltaY, minHeight);
        newX = position.x + deltaX;
        break;
      default:
        break;
    }

    setDimensions({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    if (isResizing) {
      setIsResizing(false);
      setResizeDir(null);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDir, lastMousePos, dimensions, position, handleMouseMove,]);

  return (
    <div
      ref={windowRef}
      className="bg-black border-2 border-green-500 rounded-lg shadow-xl flex flex-col absolute"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        left: position.x,
        top: position.y,
      }}
    >
      {/* Title Bar with dragging */}
      <div
        className="bg-gray-800 text-green-500 font-spaceMono font-thin px-4 py-2 rounded-t-lg flex justify-between items-center cursor-move"
        onMouseDown={handleDragStart}
      >
        <span className="font-mono">{title}</span>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white ml-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          )}
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-grow p-4 text-green-500 font-spaceMono overflow-auto">{children}</div>

      {/* Resize Handles */}
      <div
        className="absolute top-0 left-0 w-full h-2 cursor-ns-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top")}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
      ></div>
      <div
        className="absolute top-0 left-0 h-full w-2 cursor-ew-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "left")}
      ></div>
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "right")}
      ></div>
      <div
        className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
      ></div>
      <div
        className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
      ></div>
    </div>
  );
};

export default ResizableWindow;
