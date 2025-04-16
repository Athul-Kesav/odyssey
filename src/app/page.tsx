"use client";

import Image from "next/image";
import heroImg from "../img/hero.png";
import ClickButton from "@/components/ClickButton";
import { useRouter } from "next/navigation";
import PaintReveal from "@/components/PaintReveal";

export default function Home() {
  const router = useRouter();
  function goMatrix() {
    router.push("/stg-1-matrix");
    localStorage.setItem("points", "1000");
  }

  return (
    <>
      <div className="overflow-hidden relative w-full h-[200vh] flex flex-col items-center justify-start">
        <Image
          src={heroImg}
          alt="The Odyssey"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="z-[-1] transition-all"
        />
        <div className="absolute h-screen w-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold font-laBelle text-white mb-[-0.7rem]">
            The
          </h1>
          <h1 className="text-7xl font-bold font-brigends uppercase mt-[-0.3rem] bg-clip-text text-transparent bg-gradient-to-br from-[#ff2222] to-[#1b0000]">
            Odyssey
          </h1>
          <p className="text-md text-black font-montserrat">
            Lost in Space, Bound by Fate, Racing Against Time.
          </p>
        </div>

        <div className="absolute flex flex-col justify-between items-center z-30 bottom-0 w-4/5 h-[100vh] mb-24 bg-white bg-opacity-75 p-8 px-24 rounded-xl backdrop-blur-sm">
          <h1 className="font-neueMachina flex flex-col font-bold text-4xl text-black pointer-events-none">
            the protocol
            <span className="text-xl font-montserrat font-extralight">hover to reveal objectives</span>
          </h1>
          <PaintReveal />
          <div className="absolute w-5/6 mt-20 h-full pointer-events-none">
            <p className="text-black  pointer-events-none text-xl font-extralight font-montserrat">
              You are <span className="font-normal">Adam</span>, a man trapped in a shifting digital prison — a Mind
              Trap — named <span className="font-medium">Veritas Nexus</span>, a labyrinth of illusions designed to fracture reality itself.
              Created by the <span className="font-medium">&ldquo;Der Schöpfer&rdquo;</span> (german for — The
              Creator), this ever-evolving nightmare blurs the line between
              truth and deception. 

              <br/> <br/>
              Each stage is a test, each puzzle a battle,
              and every failure a step deeper into the void. But you are not
              alone. Somewhere in the chaos, your partner <span className="font-normal">Eve</span> is fighting her
              own war against The Creator, trying to dismantle the system from
              within. The deeper you go, the harder the Mind Trap fights
              back—logic twists, time warps, and shadows whisper secrets you
              were never meant to hear.
              <br/><br/>
              Amidst the madness, you find <span className="font-medium">ECHO</span>, a
              humanoid AI designed as part of the project —<span className="font-medium">Altéré</span> for your protection.
              <br/><br/>
              But is she truly an ally,
              or just another cog in The Creator&apos;s machine? Together, you must <span className="font-normal">
              hack the system, outsmart the illusions, and manipulate the very
              code of your reality</span> to break free.
              <br/><br/>
              <span className="font-medium">But beware</span> —
              The Creator is
              always watching, and in a world built on lies, even your own
              memories could be the ultimate trap.
              <br/>
              <span className="font-neueMachina font-semibold text-2xl leading-none">Will you break the cycle? Or become just another ghost in the machine?</span>
            </p>
          </div>
        </div>
        <div className="w-screen absolute bottom-5 flex-row-reverse mr-28 z-50 origin-bottom-right h-fit flex mx-5 justify-between">
          <ClickButton
            text="initiate-sequence"
            buttonColor="#94FFA9"
            goTo={goMatrix}
            shadowColor="black"
          />
        </div>
      </div>
    </>
  );
}
