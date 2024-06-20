"use client"

import { BlogInterface } from '@/app/blog/create/page';
import Link from 'next/link';
import Image from 'next/image';
const SearchResult = ({ searchData, index }: { searchData: BlogInterface, index: number }) => {



	return (
		<div className='w-full transition duration-300'>
			<div className='w-full'>
				<Link className='w-full  flex items-center justify-between 
                                     px-6 py-2 hover:bg-slate-900'
					href={`/blog/${searchData?.title}`}>
					<h4>{searchData?.title}</h4>
					<Image src={searchData?.image} width={40} height={30} className="
								cursor-pointer object-cover
                                "
						alt={searchData.role + "Image"}
					/>
				</Link>
			</div>
		</div>
	)
}

export default SearchResult

// https://www.youtube.com/watch?v=o1XcuaCcsDA
// F0:6C:5D:3A:F8:BA