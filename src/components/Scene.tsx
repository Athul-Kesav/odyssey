'use client'
import React, { useEffect, useRef, useState } from 'react'
import useWindow from './useWindow'

export default function Scene() {
    const { dimension } = useWindow();
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const prevPosition = useRef<{ x: number; y: number } | null>(null)
    const [radius, setRadius] = useState(15); // Add state for radius

    useEffect(() => {
        dimension.width > 0 && init();
    }, [dimension])

    const init = () => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, dimension.width, dimension.height); 
                ctx.globalCompositeOperation = "destination-out";
            }
        }
    }

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    const manageMouseMove = (e: { clientX: any; clientY: any; movementX: any; movementY: any; }) => {
        const { clientX, clientY, movementX, movementY } = e;

        const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10;

        if(prevPosition.current != null){
            const { x, y } = prevPosition.current;
            for(let i = 0 ; i < nbOfCircles ; i++){
                const targetX = lerp(x, clientX, (1 / nbOfCircles) * i);
                const targetY = lerp(y, clientY, (1 / nbOfCircles) * i);
                draw(targetX, targetY, radius) // Use the state variable for radius
            }
        }

        prevPosition.current = {
            x: clientX,
            y: clientY
        }
    }

    const draw = (x: number, y: number, radius: number) => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    return (
        <div className='relative w-full h-full'>
            {dimension.width == 0 && <div className='absolute w-full h-full bg-black'/>}
            <canvas ref={canvas} onMouseMove={manageMouseMove} height={dimension.height} width={dimension.width}/>
        </div>
    )
}
