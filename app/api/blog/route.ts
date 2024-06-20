import { connectDB } from "@/app/libs/connectdb";
import Blog from "@/app/modals/Blog";



import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {
        await connectDB();
        const { title, description, role, image, public_id } = await req.json();

        const newBlog = new Blog({
            title,
            description,
            role,
            image,
            public_id
        });

        await newBlog.save();
        return NextResponse.json({
            title,
            description,
            role,
            image,
            public_id
        }, { status: 201 });
    } catch (err: any) {
        console.log(err)
    }
}


export const GET = async (req: Request) => {
    try {
        await connectDB();

        const data = await Blog.find();
        return NextResponse.json({ data }, { status: 200 })

    } catch (err: any) {
        console.log("Error", err)
    }
}