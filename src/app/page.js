import ProgressScrollBar from "@/components/ProgressScrollBar";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, GitHubIcon } from "@/components/Icons";
import { techIcons } from "@/components/Icons";

export default function Home() {
// Technology stack to display
const myTechStack = [
    "Python", 
    "React", 
    "Next.js", 
    "JavaScript", 
    "HTML", 
    "CSS", 
    "Tailwind CSS", 
    "Java", 
    "JupyterNotebook",
    "Git",
    "Github",
    "Obsidian",
    "MySQL",
    "SpringBoot",
];

return(
    <>
    <section className="flex top-6 h-200px justify-center p-4 relative z-0">
        <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-xl z-10">
        <div className="flex-1 p-8 bg-[var(--about-bg)] text-[var(--foreground)]">
            <h1 className="text-3xl font-bold mb-4">Hi! I&apos;m Aarón<strong className="text-[var(--br-principal)]">.</strong></h1> 
            <p className="mt-3 sm:mt-4 text-sm sm:text-base font-light leading-relaxed">
            I&apos;m a software engineering student at the University of Sevilla, Spain. I like software development in general, specially Machine Learning and Artificial Intelligence.
            That&apos;s the reason why I created this portfolio and blog!
            </p>
        </div>

        <div className="relative w-1/3 bg-[var(--post-container-bg)]">
            <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-40 h-30 md:h-40 rounded-xl md:rounded-full overflow-hidden">
                <Image
                src="/images/AboutMe.png" 
                alt="Sobre mí"
                width={250}
                height={250}
                className="object-cover"
                />
            </div>
            </div>
        </div>
        </div>
    </section>
    
    <div className="flex flex-col md:flex-row mt-12 w-full max-w-4xl justify-center items-center md:items-stretch p-4 relative gap-8 mx-auto">
        <section className="flex-1 flex flex-col w-full">
        <div className="border-2 border-[var(--foreground)]/40 p-4 rounded-lg h-full text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">About me<strong className="text-[var(--br-principal)]">.</strong></h2>
            <p>
            I&apos;m passionate about Machine Learning and AI, fields where I&apos;m constantly learning and developing personal projects.
            </p>
            <br/>
            <p>
            I also have experience in both backend and frontend development, allowing me to build complete solutions from the ground up.
            </p>
            <br/>
            <p>
            I love working on projects that combine my technical skills and creativity to bring new and exciting ideas to life.
            </p>
            <br/>
            <p>
            In my free time, I enjoy playing video games, reading books, and watching movies or series — in short, I love stories and the world they create.
            </p>
        </div>
        </section>

        <section className="flex-1 flex flex-col w-full">
        <div className="border-2 border-[var(--foreground)]/40 p-4 pb-8 rounded-lg h-full flex flex-col max-h-[450px]">
            <h2 className="text-2xl font-bold mb-4 text-center">My<strong className="text-[var(--br-principal)]">...</strong>Projects<strong className="text-[var(--br-principal)]">?</strong></h2>
            <div className="flex-grow">
            <p>
                Most people would write a line and paste an image of their projects. Instead, I have blog posts! 
                I write about what I learn while doing each project, and I upload it here.   
            </p>
            <br/>
            <p>
                You will also find posts about other tech topics I don&apos;t have projects on. You can look for what you want filtering by tags, or you can check out the latest posts! Stay tuned!
            </p>
            </div>

            <Link href="/blog" className="flex justify-center mt-4">
            <div className="inline-flex items-center bg-[var(--buttons-bg)] text-[var(--foreground)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--br-principal)] transition-colors duration-200 group">
                Check out my blog!
                <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-2 overflow-hidden">
                {ArrowIcon}
                </span>
            </div>
            </Link>
        </div>
        
        <div className="flex justify-center mt-4 mb-8">
            <Link href="https://github.com/aaronma300604" target="_blank" rel="noopener noreferrer">
            <div className="inline-flex items-center bg-[var(--buttons-bg)] text-[var(--foreground)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--br-principal)] transition-colors duration-200 group mt-6">
                Explore my GitHub!
                <span className="ml-2 transform transition-transform duration-200 group-hover:scale-110 overflow-hidden">
                {GitHubIcon}
                </span>
            </div>
            </Link>
        </div>
        </section>
    </div>

    <section className="w-full max-w-4xl mx-auto mt-12 mb-16 p-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Stack<strong className="text-[var(--br-principal)]">.</strong></h2>
        <p> These are the main technologies I have experience with: </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
        {myTechStack.map((tech) => (
            <div 
            key={tech}
            className="flex items-center bg-[var(--post-container-bg)] px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105"
            >
            <Image 
                src={techIcons[tech]} 
                alt={`${tech} icon`} 
                width={24} 
                height={24} 
                className="h-6 w-6 mr-2"
            />
            <span className="font-medium">{tech}</span>
            </div>
        ))}
        </div>
    </section>

    </>
);
}