import Link from "next/link";
import Image from "next/image";

export default function PostCard({ href, image, title, description, created }) {
    // Format the date
    const formattedDate = created
        ? new Date(created).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "Date not available"; // Fallback if no date

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

                    <p className="text-sm text-[var(--foreground)]/80 flex-grow overflow-hidden overflow-ellipsis mb-10" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>
                        {description}
                    </p>

                    <div className="flex justify-end mt-auto">
                        <span className="text-xs text-[var(--foreground)]/60">
                            {formattedDate}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}