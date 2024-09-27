import Tag from "@/components/Tag";
import React from "react";

async function Page() {

    let tags = [];

    try {
        const response = await fetch('https://qevent-backend.labs.crio.do/tags');
        tags = await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
        tags = [];
    }


    return (
        <div className="h-full">
            <div className="flex flex-wrap p-36 items-center justify-around mt-8 mb-32">
                {tags.map((text, i) => (
                    <Tag text={text.name} key={text.id} />
                ))}
            </div>
        </div>
    );
}

export default Page;
