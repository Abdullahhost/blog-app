



import { NextResponse } from "next/server";

import { connectDB } from "@/app/libs/connectdb";
import Blog from "@/app/modals/Blog";

export const GET = async (req: Request, { params }: { params: { role: string } }) => {

    const role = params?.role;

    try {
        await connectDB();

        const data = await Blog.find({ role: role });

        if (data) {
     
            return NextResponse.json({ data }, { status: 200 })
        } else {
            console.log("Not search")
            return NextResponse.json({ mesage: "Not Work properly" })
        }
    } catch (err: any) {
        console.log(err)
    }

}
