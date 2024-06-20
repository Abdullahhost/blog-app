export const getAllBlog = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/blog", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};


export const getCategoriesBlog = async (role: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/blog/categories/${role}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};


export const getSingleBlog = async (title: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/blog/${title}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};
