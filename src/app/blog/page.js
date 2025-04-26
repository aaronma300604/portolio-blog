import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "@/components/PostCard";
import { ArrowIcon } from "@/components/Icons";
import styles from "@/styles/blogLanding.module.css";

export default function BlogLandingPage() {
    function getPosts() {
        const postsDir = path.join(process.cwd(), "src", "posts");
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

    const posts = getPosts();

    const postCards = posts.map((post, index) => {
        return (
            <PostCard
                key={index}
                href={`/blog/${post.slug}`}
                image={post.frontmatter.image}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                last_update={post.frontmatter.last_update}
                tags={post.frontmatter.tags}
            />
        );
    });

    return (
        <div className="max-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] px-6 py-12">

            <header className="text-center mb-12">
                <div className="relative overflow-hidden text-4xl font-bold mb-2 text-[var(--br-principal)]">
                    <h1 className={styles.typingEffect}>Welcome!</h1>
                </div>
                <p className="text-base max-w-2xl mx-auto">
                    This is my blog. A place where I share my ideas, projects, thoughts, and the things I learn about tech, especially Machine Learning.
                </p>
            </header>

            <section className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{postCards}</div>
            </section>

            <div className="text-center mt-12">
                <Link href="/blog/all-posts">
                    <div className="inline-flex items-center bg-[var(--buttons-bg)] text-[var(--foreground)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--buttons-hover)] transition-colors duration-200 group">
                        View All Posts
                        <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-2 overflow-hidden">
                            {ArrowIcon}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
