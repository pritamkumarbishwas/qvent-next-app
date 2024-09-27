"use client"; // This is needed for client-side hooks

import React, { useEffect, useState, Suspense } from "react";
import EventCard from "@/components/EventCard"; // EventCard component
import { useSearchParams } from "next/navigation"; // To get query parameters

const baseUrl = 'https://qevent-backend.labs.crio.do/events';

async function fetchEvents(artist, tag) {
    let url = baseUrl;

    if (artist) {
        url = `${baseUrl}?artist=${encodeURIComponent(artist)}`;
    } else if (tag) {
        url = `${baseUrl}?tag=${encodeURIComponent(tag)}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

function EventsPage() {
    const searchParams = useSearchParams(); // Get URL search params
    const artist = searchParams.get("artist"); // Extract 'artist' from the query string
    const tag = searchParams.get("tag"); // Extract 'tag' from the query string
    const [events, setEvents] = useState([]); // Local state to store events
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        async function loadEvents() {
            setLoading(true); // Start loading
            const eventsData = await fetchEvents(artist, tag); // Fetch events filtered by artist or tag
            setEvents(eventsData);
            setLoading(false); // Stop loading
        }
        loadEvents();
    }, [artist, tag]); // Re-fetch events if 'artist' or 'tag' query parameter changes

    return (
        <div className="h-full">
            {/* Display heading based on filter applied */}
            <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">
                {artist ? `Events by Artist: ${artist}` : tag ? `Events Tagged: ${tag}` : "All Events"}
            </h1>

            {/* Loading state */}
            {loading ? (
                <p className="text-center mt-8">Loading ...</p>
            ) : (
                <div className="flex flex-wrap items-center justify-center mt-8 mb-32">
                    {events.length > 0 ? (
                        events.map((eventData) => (
                            <EventCard eventData={eventData} key={eventData.id} /> // Use unique identifier for key
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

// Exporting the component
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsPage />
        </Suspense>
    );
}
