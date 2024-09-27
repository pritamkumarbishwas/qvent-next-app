"use client"; // This line marks the component as a Client Component

import Tag from "@/components/Tag";
import React, { useEffect, useState } from "react";

async function fetchTags() {
    try {
        const response = await fetch('https://qevent-backend.labs.crio.do/tags');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
}

function TagsPage() {
    const [tags, setTags] = useState([]); // State to store fetched tags
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    // Effect to fetch tags on component mount
    useEffect(() => {
        async function loadTags() {
            setLoading(true); // Set loading to true before fetching
            const tagsData = await fetchTags();
            if (tagsData.length === 0) {
                setError("No tags found.");
            } else {
                setTags(tagsData);
            }
            setLoading(false); // Set loading to false after fetching
        }

        loadTags();
    }, []); // Empty dependency array to run only on mount

    return (
        <div className="h-full">
            {loading ? (
                <div className="text-center mt-8">Loading tags...</div>
            ) : error ? (
                <div className="text-center mt-8 text-red-500">{error}</div>
            ) : (
                <div className="flex flex-wrap p-36 items-center justify-around mt-8 mb-32">
                    {tags.map((tag) => (
                        <Tag text={tag.name} key={tag.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Exporting the component directly
export default TagsPage;
