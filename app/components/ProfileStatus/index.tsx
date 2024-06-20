"use client";

import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";

const ProfileStatus: React.FC = () => {
  const { status, data: session } = useSession();

  const [userPannel, setUserPannel] = useState<Boolean>(false);

  const userRef = useRef<HTMLDivElement>(null);

  const userToggle = () => {
    setUserPannel((initialState) => !initialState)
  }

  useEffect(() => {
    let handler = (e: any) => {
      if (!userRef.current?.contains(e.target)) {
        setUserPannel(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


  return (
    <div ref={userRef} className="w-full flex flex-col items-center justify-center relative">

      <div className={clsx(`
        //bg-[linear-gradient(rgba(88,86,214,.5),#2B2A6D)]
         dark:bg-[#2929291c]
         rounded-tl-[20px]
         rounded-tr-[20px]
         shadow-xl
         backdrop:blur-lg
         py-4 px-1
         w-[204px]
         mx-2
         mb-4
         border-l-2
         border-r-2
         border-slate-200
         
 
        ${userPannel ? "showMenu" : "closeMenu"}
        `)}>

        <p className="text-green-300 text-[14px] font-semibold mb-3">
          {session?.user?.name as string}
        </p>
        <p className="text-xs"> {session?.user?.email}</p>

        <button className=" px-3 py-1 transition  hover:bg-[#ff5d5d] mt-4 rounded-2xl border-r-4 border-l-4 active:bg-slate-200 active:border-l-4 "
          onClick={() => signOut()}>
          Log out
        </button>
      </div>


      {status === "authenticated" ? (
        <>
          <Image
            className="rounded-full cursor-pointer"
            src={session?.user?.image! ? session?.user?.image! : "/userPhoto.webp"}
            width={40}
            height={40}
            alt="GImage"
            onClick={userToggle}
            title={userPannel ? "Click To close" : "Click To Show User"}
          />

        </>
      ) : <></>}
    </div>
  );
};

export default ProfileStatus;
