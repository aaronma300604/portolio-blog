"use client";

import { useState, useRef, useEffect } from "react";
import PostListCard from "@/components/PostListCard";

export default function TagFilteredPosts({ initialPosts }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const allTags = [];
    initialPosts.forEach(post => {
        if (post.frontmatter.tags) {
            post.frontmatter.tags.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            });
        }
    });

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const filteredPosts = selectedTags.length === 0
        ? initialPosts
        : initialPosts.filter(post => {
            if (!post.frontmatter.tags) return false;
            return selectedTags.every(tag => post.frontmatter.tags.includes(tag));
        });

    const postCards = filteredPosts.map((post, index) => {
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
        <>
            <div className="mb-4 max-w-3xl mx-auto">
                <div className="flex flex-wrap items-center gap-2 justify-start relative px-4">
                    
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--foreground-secondary)] flex items-center whitespace-nowrap"
                        >
                            Filter by tag
                            <svg 
                                className={`ml-1 w-2.5 h-2.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                                viewBox="0 0 16 16" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fillRule="evenodd" d="M8 12L2 6h12z" />
                            </svg>
                        </button>
                        
                        {dropdownOpen && (
                            <div className="absolute z-50 mt-1 w-64 bg-[var(--post-container-bg)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                <div className="py-1">
                                    {allTags.map((tag, index) => (
                                        <button
                                            key={index}
                                            onClick={() => toggleTag(tag)}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--foreground-secondary)]"
                                        >
                                            {tag}
                                            {selectedTags.includes(tag) && (
                                                <span className="float-right text-[var(--br-principal)]">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center">
                            {selectedTags.map((tag, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => toggleTag(tag)}
                                    className="px-2 py-1 bg-[var(--br-principal)] text-white rounded-full text-xs hover:bg-[var(--br-principal-muted)] transition-colors"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredPosts.length > 0 ? postCards : (
                    <div className="text-center col-span-full py-8">
                        <p className="text-lg">No posts found with all the selected tags.</p>
                    </div>
                )}
            </div>
        </>
    );
}
