
"use client"

import React, { useContext, useEffect, useState } from 'react'
import Button from '../Button'
import { BsMoonStars, BsSun } from 'react-icons/bs'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { ThemeContext } from '@/app/context/lightdark'

const UserExp = () => {
    const { state, dispatch } = useContext(ThemeContext);
    const { status, data: session } = useSession();

    const [isDarkMode, setIsDarkMode] = useState<boolean>();


    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode) {
            setIsDarkMode(JSON.parse(storedDarkMode));
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleClick = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    return (
    
            <div className="flex gap-3 items-center text-xs mr-6">
                <Button type="button" onClick={handleClick}>
                    {isDarkMode ? (
                        <>
                            <BsMoonStars color="#2BB15B" fontSize={20} />
                            <small className="hidden md:block">
                                Light
                            </small>
                        </>
                    ) : (
                        <>
                            <BsSun color="#s3e34" fontSize={20} />
                            <small className="hidden md:block">
                                Dark
                            </small>
                        </>
                    )}
                </Button>
                {status === "authenticated" ? (
                    <>
                        <button className="text-md whitespace-nowrap" type="button" onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="px-4 py-2 bg-green-400 text-white rounded-md" href={'/login'} >
                            Sign In
                        </Link>
                    </>
                )}
            </div>
    )
}

export default UserExp
