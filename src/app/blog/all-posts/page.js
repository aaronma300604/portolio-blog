import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostListCard from "@/components/PostListCard";

export default function AllPosts() {
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

        return posts.sort((a, b) => new Date(b.frontmatter.last_update) - new Date(a.frontmatter.last_update));
    }

    const posts = getPosts();

    const postCards = posts.map((post, index) => {
        return (
            <PostListCard
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
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-8 py-16">
            {/* Text Section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-semibold mb-4">All my posts</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Here you will find articles on various topics, mostly ML and AI.
                    I usually create a Github repository where I implement things with what I learn writing the posts.
                    Those repos are linked next to the post titles. Be sure to check them out!
                </p>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 gap-6">
                {postCards}
            </div>
        </div>
    );
}