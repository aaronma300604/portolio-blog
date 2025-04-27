import Image from "next/image";
import { ArrowIcon } from "@/components/Icons"; 
import Link from "next/link";

export default function PostListCard({ href, image, title, description, last_update, tags }) {
    return (
        <Link
            href={href}
            className=" bg-[var(--post-container-bg)] rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 overflow-hidden w-full max-w-3xl mx-auto flex items-center p-4 space-x-4 group z-10"
        >
            <div className="flex-shrink-0">
                <Image
                    src={image}
                    alt={title}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                />
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">
                    {title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/80 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-col space-x-0 space-y-1 mt-2 items-center md:space-x-2  md:flex-row md:space-y-0">
                    {tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-[var(--navbar-options-hover)] text-[var(--foreground)]/80 px-2 py-0.5 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="hidden md:flex flex-shrink-0 text-right">
                <span className="text-xs text-[var(--foreground)]/60 block mb-2">
                    {new Date(last_update).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </span>
                <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1.5">
                    {ArrowIcon}
                </span>
            </div>
        </Link>
    );
}