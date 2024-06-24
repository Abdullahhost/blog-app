"use client"

import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const Search = () => {

    const searchParams = useSearchParams();

    const pathName = usePathname();
    const router = useRouter();

    const handleSearch = (term: any) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term.toLowerCase())
        } else {
            params.delete("query")
        }
        router.replace(`${pathName}?${params.toString()}`)

    }

    const handleKeyDown = (e: any) => {
        console.log(e?.key);
    }
    return (
        <div className='w-full'>
            <div className="relative w-full md:w-3/4 hidden md:block ">
                <input
                    className="py-2 w-full outline-none px-6 rounded-md text-black dark:text-neutral-200 font-semibold bg-slate-100 dark:bg-[#3d3d3d] border border-[#1111]"
                    type="text"
                    placeholder="Search"
                    name="search"
                    autoComplete='false'
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    defaultValue={searchParams?.get("query")?.toString()}
                />
                <span
                    className="absolute hover:bg-[rgb(64,63,134)] transition hover:text-white top-0 right-0 w-10 h-full dark:bg-[#4b4a4a] bg-slate-200  dark:hover:bg-[#242424] flex items-center justify-center"
                    style={{
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                    }}
                >
                    <BsSearch fontWeight={"bold"} />
                </span>
            </div>

            <div className="w-full py-2 flex justify-center items-center ">
                <div className=" w-11/12 md:hidden relative flex justify-center items-center ">
                    <input
                        className="py-2 w-full outline-none px-6  rounded-md text-black dark:text-neutral-200 bg-slate-100 dark:bg-[#3d3d3d] border border-[#1111]"
                        type="text"
                        placeholder="Search"
                        name="search" onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams?.get("query")?.toString()}


                    />
                    <span
                        className="absolute hover:bg-[rgb(64,63,134)]   transition hover:text-white top-0 right-0 w-10 h-full dark:bg-[#4b4a4a] bg-slate-200  dark:hover:bg-[#242424] flex items-center justify-center"
                        style={{
                            borderTopRightRadius: "0.375rem",
                            borderBottomRightRadius: "0.375rem",
                        }}
                    >
                        <BsSearch fontWeight={"bold"} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Search
