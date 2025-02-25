"use client";

import ClickButton from "@/components/ClickButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const router = useRouter();
  useEffect(() => {
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires returnValue to show a warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function follow() {

    router.push("/stg-4-tenet/stuttgart/follow");
  }

  return (
    <>
      <div className="absolute overflow-hidden w-screen z-10 h-screen flex mix-blend-lighten flex-col justify-center items-center bg-black">
        <video
          src="/videos/stg4-2.mp4"
          autoPlay
          loop
          muted
          className="h-screen w-screen object-cover object-center max-h-screen"
        />
      </div>

      <div className="absolute pointer-events-none top-0 left-0 w-full h-full z-30 flex flex-col justify-center items-center p-8 bg-black bg-opacity-30">
        <div className="max-w-3xl font-montserrat font-light space-y-4 bg-black/10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-6 shadow-lg">
          <p className="text-lg text-white">
            Adam has moved to Stuttgart, where he is treated at the camp. He
            gets off the bed and walks to the window to see the city. He sees
            desolation in the sky, and the city is in ruins. He has to find Eve
            and save her from the clutches of the Creator. As he turns to get
            water, he sees a note on the table. It reads,<br/><br/>
            <span className="font-medium text-white font-neueMachina">
              "Follow the instructions. Find the sequence. Save her."
            </span>
          </p>
          <p className="text-lg text-white">
            Adam hops onto his bike and rides to the city, where the Creator has
            kept Eve. As he enters the huge building, he sees a series of
            doors—7 doors. Each door has a set of instructions written on it. He
            could see a matrix of numbers on the wall. He has to follow the
            instructions on the door and find the sequence to save Eve.
          </p>
          <p className="text-3xl text-white font-semibold font-neueMachina uppercase">
            Help Adam find the sequence, save Eve, and defeat the Creator.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-50">
        <ClickButton
          text="start"
          shadowColor="white"
          textColor="black"
          buttonColor="#94FFA9"
          goTo={follow}
        />
      </div>
    </>
  );
}
