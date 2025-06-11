'use client';

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MVPView = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<null | string>(null);

  const artworks = [
    {
      id: "1",
      title: "Composition abstraite",
      artist: "Jean Dupont",
      description: "Une œuvre contemporaine aux formes géométriques colorées."
    },
    {
      id: "2",
      title: "Nature Morte au Vase",
      artist: "Sophie Moreau",
      description: "Un hommage moderne aux natures mortes classiques."
    },
    {
      id: "3",
      title: "Portrait d’un inconnu",
      artist: "Michel Lefèvre",
      description: "Un portrait énigmatique au style post-impressionniste."
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <ConnectButton />
      </div>

      <h1 className="text-2xl font-bold mb-4">Œuvres disponibles à l’investissement</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <li
            key={artwork.id}
            className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedArtwork(artwork.id)}
          >
            <h2 className="text-lg font-semibold">{artwork.title}</h2>
            <p className="text-sm text-gray-600">par {artwork.artist}</p>
            <p className="mt-2 text-sm">{artwork.description}</p>
          </li>
        ))}
      </ul>

      {selectedArtwork && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-bold">Détails de l’œuvre sélectionnée</h2>
          <p>ID : {selectedArtwork}</p>
        </div>
      )}
    </div>
  );
};

export default MVPView;
