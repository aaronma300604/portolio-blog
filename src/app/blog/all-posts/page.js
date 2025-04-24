
export default function AllPosts() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-8 py-16 mt-16 text-center">
            <h1 className="text-3xl font-semibold mb-8">All Posts</h1>
            <p className="text-lg max-w-2xl mx-auto">
                This is a list of all my blog posts. You can find articles on various topics, mostly ML and AI.
                I usually create a Github repository where I implement things with what I learn writing the posts. 
                Those repos are linked next to the post titles. Be sure to check them out!
            </p>
        </div>
    );
}