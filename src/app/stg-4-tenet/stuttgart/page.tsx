'use client'

import ClickButton from "@/components/ClickButton";

import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    function begin(){
        router.push("/stg-4-tenet/stuttgart/hack")
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black">
      <div className="absolute w-screen h-screen flex z-0">
        <video
          className="object-cover w-full h-full"
          src="/videos/stg4-2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="flex w-2/3 flex-col p-6 bg-black/20 rounded-lg backdrop-blur-md border border-gray-400 font-montserrat text-xl text-white z-10 justify-center items-center">
        <p>
          Adam gains access to The Creator&apos;s system—a labyrinth of cryptic
          directories. The system is chaotic, yet there is an underlying pattern
          waiting to be uncovered. To proceed, Adam must decipher the logic
          behind the file structure and use it to extract the keyword necessary for
          unleashing a virus that will bring down The Creator&apos;s system.
        </p>
        <div className="w-full">
            <ul className="w-full my-7 font-spaceMono text-2xl gap-3 flex flex-col">
                <li>Explore Directories</li>
                <li>Identify the Pattern</li>
                <li>Analyse the Text File</li>
                <li>Extract Clues from Images</li>
                <li>Find the Keyword</li>

            </ul>
        </div>
        <p className="mt-4 text-2xl font-neueMachina font-black">
            HELP ADAM HACK THE SYSTEM AND UNLEASH THE VIRUS
        </p>
      </div>
      <div className="absolute bottom-7">
        <ClickButton text="begin" buttonColor="#94FFA9" textColor="black" shadowColor="white" goTo={begin} />
      </div>
    </div>
  );
}
