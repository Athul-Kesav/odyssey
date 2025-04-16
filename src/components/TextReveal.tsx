"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "./utils/useMousePosition";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();

  // Ensure x and y are always numbers
  const x = mousePosition?.x ?? 0;
  const y = mousePosition?.y ?? 0;
  const size = isHovered ? 200 : 40;

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x - size - 30}px ${y - size + 100}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          className="font-montserrat text-2xl font-extralight"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Adam gasps for breath. The world around him is dark.
          <br />
          He doesn&apos;t know how he got here. But one thing is clear—he isn&apos;t
          supposed to be here.
          <br />
          <br />
          In front of him stands an ominous machine, humming with raw energy.
          Its interface flickers, waiting.
          <br />
          Adam&apos;s heart pounds. A lead—he has a lead.
          <br />
          A half-complete sequence. A whisper of truth, hidden in the gaps:
          <br />
          <br />
          <span className="text-5xl font-neueMachina">
          301, 308, 323, 346, ___, 406
          </span>
          <br />
          <br />
          One number is missing. That number is the key.
          <br />
          <br />
          His mind races. There must be a pattern—a logic to the madness. If he
          fails, he may never wake up. 
          <span className="text-2xl font-neueMachina">
            The system speaks only in binary.
          </span>
          <br />
          <br />
          And then, it hits him.
          <span className="text-2xl font-neueMachina"> Long Division.</span>
          The system demands precision. He has to convert the answer into binary. 
          No shortcuts. No errors.
          <br />
          <br />
          A converter will unlock in 
          <span className="text-2xl font-extralight font-neueMachina">
            10 minutes
          </span>,
          but using it… might cost him something far worse than time.
          <br />
          <br />
          <span className="text-3xl font-medium font-neueMachina">
            The machine waits.
            <br/><br/>
            The Matrix holds its breath.
          </span>
        </p>
      </motion.div>

      <div className={styles.body}>
        <p className="text-transparent pointer-events-none">
          I&apos;m a selectively skilled product designer with strong focus on
          producing high quality & impactful digital experience.
        </p>
      </div>
    </main>
  );
}
