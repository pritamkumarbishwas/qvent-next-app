import ArtistCard from "@/components/ArtistCard";
import SwiperComponent from "@/components/SwiperComponent";
import React from "react";

async function Page() {

  let artists = [];

  try {
    const response = await fetch('https://qevent-backend.labs.crio.do/artists');
    artists = await response.json();

  } catch (error) {
    console.error('Error fetching artists:', error);
    artists = [];
  }

  return (
    <div className="h-full">
      <div className="flex flex-wrap items-center justify-around mt-8 mb-32">
        {artists.map((artistData, i) => (
          <ArtistCard artistData={artistData} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Page;
