"use client";

import React, { useState } from "react";
import Link from "next/link";

const artworks = [
  {
    id: "1",
    title: "Composition abstraite",
    artist: "Jean Dupont",
    description: "Une œuvre contemporaine aux formes géométriques colorées.",
    price: 18000,
  },
  {
    id: "2",
    title: "Nature Morte au Vase",
    artist: "Sophie Moreau",
    description: "Un hommage moderne aux natures mortes classiques.",
    price: 13000,
  },
  {
    id: "3",
    title: "Portrait d’un inconnu",
    artist: "Michel Lefèvre",
    description: "Un portrait énigmatique au style post-impressionniste.",
    price: 15000,
  },
];

const MVPView = () => {
  const [sortBy, setSortBy] = useState("artist");

  const sortedArtworks = [...artworks].sort((a, b) => {
    if (sortBy === "artist") return a.artist.localeCompare(b.artist);
    if (sortBy === "price") return a.price - b.price;
    return 0;
  });

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Oeuvres disponibles</h2>
        <select
          className="border px-2 py-1 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="artist">Trier par artiste</option>
          <option value="price">Trier par prix</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedArtworks.map((artwork) => (
          <li
            key={artwork.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition duration-200"
          >
            <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Artiste : {artwork.artist}</p>
            <p className="text-sm mb-2">{artwork.description}</p>
            <p className="text-sm font-medium text-gray-700">Prix estimé : {artwork.price.toLocaleString()} €</p>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/artworks/${artwork.id}`}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
              >
                Voir les détails
              </Link>
              <button
                onClick={() => alert("Ajouté à vos favoris !")}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Ajouter à mes favoris
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MVPView;
