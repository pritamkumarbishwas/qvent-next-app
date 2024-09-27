"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function CreateEventPage() {
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        artist: '',
        description: '',
        tags: '',
    });

    const [error, setError] = useState(null); // To track errors
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEventCreate = async (e) => {
        e.preventDefault();

        // Generate random image number
        const imageNumber = Math.floor(Math.random() * 99) + 1;
        const imageUrl = `https://random.imagecdn.app/500/150?random=${imageNumber}`;

        // Prepare the payload
        const payload = {
            image: imageUrl,
            ...eventData,
            tags: eventData.tags.split(',').map(tag => tag.trim()), // Convert tags to an array
        };

        try {
            const response = await fetch('https://qevent-backend.labs.crio.do/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 201) {
                // Successful creation
                router.push('/events'); // Redirect to events page
            } else {
                // Handle error if the event creation fails
                setError('Event creation failed');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setError('An error occurred while creating the event.'); // Show a generic error message
        }
    };

    return (
        <div className="container mx-auto px-32">
            <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
            <form onSubmit={handleEventCreate}>
                <div className="mb-4">
                    <label className="block text-gray-700">Event Name</label>
                    <input
                        type="text"
                        name="name"
                        value={eventData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Artist</label>
                    <input
                        type="text"
                        name="artist"
                        value={eventData.artist}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={eventData.tags}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Event
                </button>
            </form>
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}

export default CreateEventPage;
