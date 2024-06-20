


import { BlogInterface } from '@/app/blog/create/page';
import { getAllBlog } from '@/app/hooks/getAllBlog';
import Link from 'next/link';
import React from 'react'



const Categories = async () => {

    const { data } = await getAllBlog();

    const uniqueRoles = [...new Set(data?.map((item: BlogInterface) => item?.role))];

    return (
        <div className="w-full lg:w-fit mr-6 flex flex-col items-center">
            <div className="w-full md:w-3/4 my-[20px] px-4  md:px-4  lg:max-w-[300px] md:min-w-[300px] md:mr-6 lg:mr-0">
                <h4 className=" bg-transparent shadow-sm dark:shadow-[#846af8bd] md:shadow-md text-center md:text-start  p-1 md:p-2 mb-4 dark:text-white border-b-[#5555552f] dark:border-b-[#252525] border-b-2 ">Categories</h4>
                {uniqueRoles?.map((ele: string) => {
                    return <div key={ele} className="text-center md:text-start leading-8">
                        <li className="text-[#4e4e4e] hover:underline dark:text-[#d6d7d8]" style={{ listStyleType: "none" }}>
                            <div className="flex items-start gap-4 flex-row ">
                                <div className="min-w-1 max-w-1 min-h-1 max-h-1 bg-black dark:bg-white  mt-2"></div>
                                <Link className="text-sm" href={`/blog/categories/${ele}`}>
                                    {ele}
                                </Link>
                            </div>
                        </li>
                    </div>
                })}
            </div>
            <div className=" w-full md:w-3/4 my-[20px]  px-4  md:px-4  lg:max-w-[300px] md:min-w-[300px] md:mr-6 lg:mr-0">
                <h4 className=" bg-transparent shadow-sm dark:shadow-[#846af8bd] md:shadow-md text-center md:text-start  p-1 md:p-2 mb-4 dark:text-white border-b-[#5555552f] dark:border-b-[#252525] border-b-2 ">Recent Five Post</h4>
                {data?.map((ele: BlogInterface) => {
                    return <div key={ele?.title} className="text-center md:text-start leading-8">
                        <li className="text-[#4e4e4e] hover:underline dark:text-[#d6d7d8] text-start" style={{ listStyleType: "none" }}>
                            <div className="flex items-start gap-4 flex-row ">
                                <div className="min-w-1 max-w-1 min-h-1 max-h-1 bg-black dark:bg-white mt-4"></div>
                                <div className="">
                                    <Link className="text-sm" href={`/blog/${ele?.title}`}>
                                        {ele?.title}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </div>
                }).reverse().slice(0, 4)}

            </div>
        </div>
    )
}

export default Categories

