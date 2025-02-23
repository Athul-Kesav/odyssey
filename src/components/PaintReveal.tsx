'use client'
import React, { useEffect, useRef, useState } from 'react';

export default function FullParentCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevPosition = useRef<{ x: number; y: number } | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        // Observe the parent container's size
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Initialize or re-initialize the canvas whenever dimensions change
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Fill canvas with black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Set erasing mode
        ctx.globalCompositeOperation = 'destination-out';
    }, [dimensions]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const { movementX, movementY } = e;

        // Number of circles to draw based on mouse movement distance
        const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10;

        if (prevPosition.current) {
            const { x, y } = prevPosition.current;
            for (let i = 0; i < nbOfCircles; i++) {
                const t = i / nbOfCircles;
                const lerpX = x + (clientX - x) * t;
                const lerpY = y + (clientY - y) * t;
                drawCircle(lerpX, lerpY, 40);
            }
        }

        // Update the previous position
        prevPosition.current = { x: clientX, y: clientY };
    };

    const drawCircle = (x: number, y: number, radius: number) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    };

    return (
        <div
            ref={containerRef}
            className='w-full h-full relative'
        >
            {/* Canvas covering the entire parent */}
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                width={dimensions.width}
                height={dimensions.height}
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </div>
    );
}
