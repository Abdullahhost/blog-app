

import { Schema, model, models } from "mongoose";


const blogSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    role: {
        type: String,
    },
    image: {
        type: String,
    },
    public_id: {
        type: String
    }
}, {timestamps: true})

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;


