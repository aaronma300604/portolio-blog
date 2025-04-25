import Link from "next/link";
import Image from "next/image";

export default function PostCard({ href, image, title, description, last_update, tags }) {

    const formattedDate = last_update
        ? new Date(last_update).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "Date not available"; 

    return (
        <Link href={href}>
            <div className="block bg-[var(--post-container-bg)] rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 overflow-hidden h-full flex flex-col">
                <Image
                    width={850}
                    height={850}
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover"
                />

                <hr className="border-t border-[var(--foreground)]/20" />

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>

                    <p className="text-sm text-[var(--foreground)]/80 flex-grow overflow-hidden overflow-ellipsis mb-6" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
                        {description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col space-y-1">
                                {tags.slice(0, 3).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs px-2 py-0.5 rounded-full inline-block whitespace-nowrap overflow-hidden text-ellipsis
                                            bg-[var(--navbar-options-hover)] text-[var(--foreground)]/80 w-fit max-w-[100px]"
                                        title={tag}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <span className="text-xs text-[var(--foreground)]/60 self-end">
                                {formattedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}