"use client"
import Button from '@/app/components/Button';
import SideBar from '@/app/components/header/sidebar';
import Topbar from '@/app/components/header/topbar';
import Input from '@/app/login/components/Input';
import axios from 'axios';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface BlogInterface {
  title: string;
  description: string;
  role: string;
  image: string;
  public_id?: string
  createdAt?: string
}
const page = () => {

  const [blogData, setBlogData] = useState<BlogInterface>({
    title: "",
    description: "",
    role: "",
    image: "",
    public_id: ""
  })

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });

    console.log(blogData)

  };
  const handleClick = (result: CldUploadWidgetResults) => {
    const info = result?.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;

      setBlogData({
        ...blogData,
        image: url,
        public_id: public_id
      })
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/api/blog", blogData)
      .then((callback) => {
        if (callback.status === 201) {
          toast.success("Blog Create Successfully");
          router.push("/")
        }
      }).catch(err => console.log(err))
  }
  return (
    <div className="flex items-start justify-start w-full my-4">
      <SideBar />
      <div className="flex flex-col w-full ml-0 lg:ml-[220px]">
        <Topbar />
        <h2 className="font-bold leading-10 text-2xl my-8 mx-6">Create Blog</h2>

        <form className="px-6 w-full flex flex-col gap-4 mt-6" onSubmit={handleSubmit}
        >
          <Input name='title' type='text' placeholder='Enter Title' onChange={(e) => handleChange(e)} />
          <Input name='role' type='text' placeholder='Role' onChange={(e) => handleChange(e)} />

          <textarea className="py-[14px] px-[10px] text-[12px] 
                   setTextStyle w-full rounded-[6px]  
                   border-t border-l border-r bg-[0007] 
                   shadow-md bg-slate-50 ring-2 
                   focus:ring-green-200  outline-none 
                   hover:ring-offset-2 ring-slate-50 
                   dark:bg-[#333] dark:border-none 
                   dark:ring-0" name='description' rows={10} cols={100} onChange={(e) => handleChange(e)} placeholder='Description'></textarea>

          <div className='flex w-full gap-10 justify-between'>
            <CldUploadButton className=' cursor-pointer py-2 rounded-md' onUpload={handleClick} uploadPreset="enmhirbd">
              {blogData.image ? <>
                <Image
                  className='w-full'
                  src={blogData.image}
                  alt='Upload Image'
                  width={800}
                  height={450}
                />
              </> : <>
                <Image
                  className='h-[300px] object-cover aspect-auto  text-center border'
                  src='/select.webp'
                  alt='Upload Image'
                  width={400}
                  height={200}
                />
              </>}
            </CldUploadButton>
          </div>
          <Button type="submit" danger fullWidth>
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}

export default page