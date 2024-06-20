"use client"

import {
  BsCodeSlash,
  BsGithub,
  BsHouse,
  BsPencilSquare,
  BsPeople,
  BsPersonLinesFill,
  BsChatDotsFill
} from "react-icons/bs";
import ProfileStatus from "../../ProfileStatus";
import SideLink from "./SideLink";
import Logo from "./Logo";
import ToggleMenu from "./ToggleMenu";
import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "@/app/context/lightdark";

import { useRouter } from "next/navigation";
import UserExp from "../../UserExp";
const SideBar = () => {


  const { state, dispatch } = useContext(ThemeContext);
  const toggleRef = useRef<HTMLDivElement>(null)


  const sideBarOpen = state.sidebar

  useEffect(() => {
    let handler = (e: any) => {
      if (!toggleRef.current?.contains(e.target)) {
        if (sideBarOpen === true) {
          dispatch({ type: 'SIDEBAR_TOGGLE' })
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const router = useRouter()

  const handleClick = () => {
    alert("hi")
  }


  return (
    <div ref={toggleRef} className={clsx(`
      text-white
        fixed
        top-0 left-0
        translate-x-[-300px]
        transition
        w-[220px] 
        min-h-[100vh] 
        bg-[rgb(43,42,109)]
        dark:bg-black
        border-r-[.1px] 
        dark:border-[rgba(145,145,145,0.5)] 
         lg:translate-x-[0px]
         z-50
        `,

      sideBarOpen ? "translate-x-[0px]" : ""

    )}>

      <div className="flex lg:px-0 items-center px-6">
        <div className="lg:hidden ">
          <ToggleMenu />
        </div>
        <div onClick={() => router.push("/")} className=" flex items-center gap-2 lg:gap-6 px-6 py-[9.5px] h-[60px] cursor-pointer">
          <Logo />
          <h3 className="text-green-400">Bloogitu</h3>
        </div>
      </div>

      <div className="md:hidden py-2 px-4">
        <UserExp />
      </div>

      <div className="transition mt-8">

        <SideLink
          icon={BsPeople}
          iconColor="white"
          iconSize={18}
          linkName="Ai Project"
          linkUrl="https://notes-chatbot.vercel.app"
        />
        <SideLink
          icon={BsChatDotsFill}
          iconColor="white"
          iconSize={18}
          linkName="Chat App"
          linkUrl="https://mern-chat-app-eta-two.vercel.app"
        />
        <SideLink
          icon={BsPencilSquare}
          iconColor="white"
          iconSize={18}
          linkName="Write Blog"
          linkUrl="/blog/create"
          onClick={handleClick}
        />
        <SideLink
          icon={BsGithub}
          iconColor="white"
          iconSize={18}
          linkName="Github"
          linkUrl="https://github.com/Abdullahhost"
        />
        <SideLink
          icon={BsPersonLinesFill}
          iconColor="white"
          iconSize={18}
          linkName="Login"
          linkUrl="/login"
        />
      </div>

      <div className="rounded-full fixed bottom-5 left-0 text-center">
        <ProfileStatus />
      </div>
    </div>
  );
};

export default SideBar;
