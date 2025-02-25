'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function FullParentCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevPosition = useRef<{ x: number; y: number } | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        // Resize Observer to track parent container size
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Fill canvas with black on size change
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Set erase mode
        ctx.globalCompositeOperation = 'destination-out';
    }, [dimensions]);

    const drawCircle = useCallback((x: number, y: number, radius: number) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const { movementX, movementY } = e;

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

        prevPosition.current = { x: clientX, y: clientY };
    }, [drawCircle]);

    return (
        <div ref={containerRef} className="w-full h-full relative">
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
