

import SideBar from "@/app/components/header/sidebar";
import Topbar from "@/app/components/header/topbar";

import Categories from "@/app/components/categories/page";
import BlogList from "../../components/BlogList";
import { usePathname } from "next/navigation";
// import { getCategoriesBlog } from "@/app/hooks/getAllBlog";
import { getCategoriesData } from "@/app/libs/getData";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default async function Home({ params, searchParams }: { params: { role: string }, searchParams: any }) {


    const perPage: number = 4;

    let page = parseInt(searchParams.page, 10);
    !page || page < 1 ? 1 : page;

    const itemData = await getCategoriesData(perPage, page, params?.role);

    const itemCount = itemData?.countBlog;
    const allBlog = itemData?.items;

    const totalPage = Math.ceil(itemCount! / perPage);

    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;


    const pageNumber: number[] = [];
    // const offsetNumber: number = 2;

    // for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    //     if (i >= 1 && i <= totalPage) {

    //         pageNumber.push(i);
    //     }
    // }

    for (let x = 1; x <= totalPage; x++) {
        pageNumber.push(x);
    }


    // const { data } = await getCategoriesBlog(params?.role);

    return (
        <main className="flex items-start justify-start w-full">
            <SideBar />
            <div className="flex flex-col w-full ml-0 lg:ml-[220px]">
                <Topbar />
                <h2 className="text-2xl font-semibold text-center md:text-start transition text-[#4d4b4d] pt-4 dark:text-white px-6">
                    {params ? params?.role : "Blog Page"}
                </h2>
                <div className="w-full flex flex-col-reverse md:flex-row  gap-2 items-start justify-center lg:justify-between" >
                    <div className="px-6 py-3 grid  place-items-start mx-auto grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">

                        {itemCount! > 0 ? (
                            <>
                                <BlogList data={allBlog} />
                            </>
                        ) : (
                            <div>
                                <h1>There Are No Available Data here!</h1>
                            </div>
                        )
                        }
                    </div>
                    <div className="w-full md:w-fit mr-6">
                        <Categories />
                    </div>
                </div>

                <div className="px-6 py-3 flex gap-4 w-full items-center">
                    <div>
                        {!page || page === 1 ? (
                            <>
                                <div aria-disabled={true}></div>
                            </>
                        ) : (
                            <>

                                <Link aria-label="Previous Page" className={`hover:text-green-500  text-sm px-4 py-2  transition`} href={`?page=${prevPage}`}>
                                    <BsArrowLeft />
                                </Link>
                            </>
                        )}
                    </div>
                    <div >
                        {
                            pageNumber?.map((singleNumber, index) => (

                                <Link className={`hover:bg-[#2B2A6D] hover:text-white shadow-md
                 dark:shadow-neutral-500  hover:dark:bg-[#399B19] px-4 text-sm 
                 py-2 rounded-lg mx-2 transition border dark:border-neutral-600
                 ${page === singleNumber ? "bg-[#2B2A6D] text-white  dark:bg-[#399B19]" : ''} ${!page && singleNumber === 1 ? "bg-[#2B2A6D] text-white  dark:bg-[#399B19]" : ""}  `} key={index} href={`?page=${singleNumber}`}>
                                    {singleNumber}
                                </Link>
                            ))
                        }
                    </div>
                    <div>
                        {page > totalPage - 1 ? (
                            <>
                                <div aria-disabled={true}></div>
                            </>
                        ) : (
                            <>
                                <Link arai-label="Next Page" className=" hover:text-green-500  text-sm px-4 py-2  transition" href={`${!page ? `?page=${2}` : `?page=${nextPage}`}`}>
                                    <BsArrowRight />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
