
import Image from 'next/image';
import Link from 'next/link';
import { FaTags } from 'react-icons/fa';

import { BsCalendar3 } from 'react-icons/bs';
import { truncateString } from '@/app/libs/truncateString';
import { BlogInterface } from '../create/page';

import { timeCalculating } from '@/app/libs/timeCalculate';
import { DateFormat } from '@/app/libs/dateFormat';

import { MotionDiv } from './MotionDiv'

const BlogList = ({ data }: any) => {
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1
		}
	};

	return (
		<>
			{data?.map((ele: BlogInterface) => {
				return (
					<MotionDiv
						variants={item}
						key={ele.title} className={`item group z-10 p-2 md:p-3 w-full lg:w-[400px] xl:w-[100%] 
							border dark:border-neutral-800
							hover:brightness-110 transition  
						 	hover:shadow-lg hover:rounded-lg
							dark:hover:shadow-neutral-500`}
					>
						<div className='overflow-hidden'>

							<Link href={`/blog/${ele.title}`}>
								<Image src={ele?.image} width={500} height={400} className="
									transition xl:max-h-[200px]
								  	group-hover:scale-110 delay-100 
									cursor-pointer object-cover w-full md:w-[400px]"

									alt={ele.role + "Image"}
								/>
							</Link>
						</div>
						<div className="flex items-center gap-3 justify-start my-2 text-xs">
							<div className="flex gap-2 items-center">
								<BsCalendar3 />
								<span>
									{DateFormat(ele.createdAt)}
								</span>
							</div>
							<div>
								<span className="whitespace-nowrap">{timeCalculating(ele.createdAt)}</span>
							</div>
							<div className='ml-2'>
								<Link className="flex gap-2 items-center" href={`/blog/categories/${ele.role}`}>
									<FaTags />
									<span className=" z-50 text-[#29639E] font-semibold whitespace-nowrap">{ele.role}</span>
								</Link>
							</div>

						</div>
						<div className="capitalize tracking-tighter py-3 leading-6">{ele.title}</div>
						<div className="text-sm">{truncateString(ele.description)}...
							<Link href={`/blog/${ele.title}`} className="whitespace-nowrap font-semibold text-[#29639E]">Continue Reading</Link>
						</div>
					</MotionDiv>

				);
			})}
		</>
	)
}

export default BlogList
