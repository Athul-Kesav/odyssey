export default function Page() {
  return (
    <div className="h-screen w-screen flex flex-col justify-start items-start text-white font-brigends relative">
        <div className="absolute h-screen w-screen">
        <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/stg4.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

        </div>
      <h1 className="text-6xl md:text-8xl font-bold tracking-wide z-10">THE END</h1>

      <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-fit  flex flex-col items-center">
        <div className="bg-black/50 backdrop-blur-lg p-5 rounded-xl text-center shadow-lg w-full">
          <p className="text-lg md:text-2xl font-medium font-neueMachina">
            Contact one of the coordinators to claim your win.
          </p>

          <div className="mt-3 space-y-1 text-gray-300 text-2xl font-spaceMono">
            <p>9159775325</p>
            <p>8590966892</p>
            <p>8431568735</p>
            <p>8340399765</p>
            <p>9171907755</p>
          </div>
        </div>
      </div>
    </div>
  );
}
