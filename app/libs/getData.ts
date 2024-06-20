import Blog from "../modals/Blog";
import { connectDB } from "./connectdb";

export async function getData(perPage: number, page: number) {

    try {
        await connectDB();

        const items = await Blog.find().sort({ createdAt: -1 }).skip(perPage * (page - 1)).limit(perPage);
        const countBlog = await Blog.countDocuments();
        return { items, countBlog };
    } catch (err) {
        console.log("There is something wrong because an error occered", err)
    }
}
export async function getCategoriesData(perPage: number, page: number, role: string) {

    try {
        await connectDB();

        const items = await Blog.find({ role: role }).sort({ createdAt: -1 }).skip(perPage * (page - 1)).limit(perPage);
        // const countBlog = await Blog.countDocuments();

        const test = await Blog.find({ role: role })
        const countBlog = test?.length;

        return { items, countBlog };

    } catch (err) {
        console.log("There is something wrong because an error occered", err)
    }
}