"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tag from "@/components/Tag";

const EventDetails = ({ params }) => {
    const { eventId } = params;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (eventId) {
            fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`)
                .then((response) => response.json())
                .then((data) => setEvent(data))
                .catch((error) =>
                    console.error("Error fetching event details:", error)
                );
        }
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent ">
                        {event.name}
                    </h1>
                    <div className="text-gray-600 mb-4">
                        <p className="text-xl font-bold max-sm:text-xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent ">{new Date(event.date).toDateString()} | {event.time}</p>
                        <p className="text-xl font-bold max-sm:text-xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent ">{event.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags?.map((tag) => (

                            <Tag text={tag} key={tag} />
                        ))}
                    </div>
                    <h2 className="text-xl font-bold max-sm:text-xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent ">
                        Artist: {event.artist}
                    </h2>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <h3 className="text-xl font-bold max-sm:text-xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent ">
                        {event.price > 0 ? `$${event.price.toLocaleString()}` : "FREE"}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
