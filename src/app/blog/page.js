import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "@/components/PostCard";
import { ArrowIcon } from "@/components/Icons";

export default function BlogLandingPage() {

    function getPosts() {
        const postsDir = path.join(process.cwd(), "src","posts");
        const files = fs.readdirSync(postsDir);
    
        const posts = files.map((filename) => {
        const slug = filename.replace(".md", "");
        const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");
        const { data: frontmatter } = matter(fileContent);
    
        return {
            slug,
            frontmatter,
        };
        });
    

        return posts
        .sort((a, b) => new Date(b.frontmatter.last_update) - new Date(a.frontmatter.last_update))
        .slice(0, 3);
    }
    

    const posts = getPosts()

    const postCards = posts.map((post,index) => {
        return <PostCard
            key = {index}
            href = {`/blog/${post.slug}`}
            image= {post.frontmatter.image}
            title= {post.frontmatter.title}
            description= {post.frontmatter.description}
            last_update= {post.frontmatter.last_update}
            tags= {post.frontmatter.tags}
        />;
    });

return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-8 py-16">
    <header className="text-center mb-16">
        <div className="relative overflow-hidden text-5xl font-bold mb-4">
            <h1 className="typing-effect">Welcome!</h1>
        </div>
        <p className="text-lg max-w-2xl mx-auto">
            This is my blog. A place where I share my ideas, projects, thoughts and the things I learn about tech, specially Machine Learning.
        </p>
    </header>

    <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {postCards}

        </div>
    </section>

    <div className="text-center mt-16">
        <Link href="/blog/all-posts">
        <div className="inline-flex items-center bg-[var(--buttons-bg)] text-[var(--foreground)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--buttons-hover)] transition-colors duration-200 group">
            View All Posts
            <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-2">{ArrowIcon}</span>
        </div>
        </Link>
    </div>
    </div>
);
}