'use client'
import React, { useEffect, useRef, useCallback } from 'react';
import useWindow from './useWindow';

export default function Scene() {
    const { dimension } = useWindow();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const prevPosition = useRef<{ x: number; y: number } | null>(null);
    const radius = 15;

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fill canvas with black
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, dimension.width, dimension.height);
        ctx.globalCompositeOperation = "destination-out";
    }, [dimension.height, dimension.width]);

    useEffect(() => {
        if (dimension.width > 0) initializeCanvas();
    }, [dimension.width, initializeCanvas]);

    

    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    const draw = useCallback((x: number, y: number, radius: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY, movementX, movementY } = e;
        const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10;

        if (prevPosition.current) {
            const { x, y } = prevPosition.current;
            for (let i = 0; i < nbOfCircles; i++) {
                const targetX = lerp(x, clientX, i / nbOfCircles);
                const targetY = lerp(y, clientY, i / nbOfCircles);
                draw(targetX, targetY, radius);
            }
        }

        prevPosition.current = { x: clientX, y: clientY };
    }, [draw]);

    

    return (
        <div className="relative w-full h-full">
            {dimension.width === 0 && <div className="absolute w-full h-full bg-black" />}
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                height={dimension.height}
                width={dimension.width}
            />
        </div>
    );
}
