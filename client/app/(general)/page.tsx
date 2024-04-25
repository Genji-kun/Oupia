"use client";

import dynamic from "next/dynamic";
import HomeTitle from "./_components/home-title";

const HomePage = () => {

  return (<>
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center h-[calc(100vh-80px)] w-full">
        <div className="absolute bg-zinc-900/30 inset-0 w-full h-full z-5" />
        <video
          playsInline
          autoPlay
          muted
          loop
          className=" w-full h-full object-cover"
          id="homeVideo">
          <source src="https://res.cloudinary.com/dzba4fewa/video/upload/v1711858733/production_id_3770033_1080p_strahu.mp4" type="video/mp4" />
        </video>
        <div className="w-full z-10 absolute inset-0 flex items-center justify-center">
          <HomeTitle />
        </div>
        <div className="absolute bg-gradient-to-t from-accent dark:from-background to-transparent w-full h-[400px] z-5 inset-x-0 bottom-0" />
      </div>
    </div>
  </>

  )
}

export default dynamic(() => Promise.resolve(HomePage), { ssr: false })
