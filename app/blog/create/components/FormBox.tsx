"use client"

import Input from '@/app/login/components/Input';
import axios from 'axios';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/app/components/Button';
import { BlogInterface } from '../page';

const FormBox = () => {

    const [blogData, setBlogData] = useState<BlogInterface>({
        title: "",
        description: "",
        role: "",
        image: "",
        public_id: ""
    })

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminPasskey = prompt("Are you admin? Give me the secret code to create a blog 🔐.");
        const passkey = process.env.NEXT_PUBLIC_PASSKEYASADMIN; // Use NEXT_PUBLIC_ prefix for env variables to expose them to the client

        if (adminPasskey === passkey) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    if (!isAdmin) {
        return <div className='relative'>
            <Image
                className='w-full'
                src='/blog-create-layout.png'
                alt='Upload Image'
                width={500}
                height={500}
            />
            <div className="absolute text-center  top-0 left-0 w-full h-screen flex items-center justify-center">

                <div className='text-center border w-full lg:w-2/5 rounded-lg text-lg p-5 bg-[#0008] backdrop-blur-lg text-white'  >
                    You are not authorized to create a blog.
                </div>
            </div>
        </div>;
    }

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value,
        });

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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("/api/blog", blogData)
            .then((callback) => {
                if (callback.status === 201) {
                    toast.success("Blog Create Successfully");
                }
            }).catch(err => console.log(err)).finally(() => {
                router.push("/");
                window?.location?.reload();
            })
    }
    return (
        <>
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
        </>
    )
}

export default FormBox
