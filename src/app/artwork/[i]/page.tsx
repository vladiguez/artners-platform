// src/app/artwork/[id]/page.tsx
'use client';

import { useRouter } from 'next/router';
import ArtworkPDFButton from '@/components/pdf/ArtworkPDFButton';

// ⚠️ TEMP DATA MOCKED – Replace this with DB fetch logic or props
const mockArtworks: Record<string, any> = {
  '1': {
    title: 'Composition abstraite',
    artist: 'Jean Dupont',
    description: 'Une œuvre contemporaine aux formes géométriques colorées.',
    dimensions: '80 x 120 cm',
    medium: 'Acrylique sur toile',
    period: '2020',
    priceRange: '15 000 – 18 000 €',
    historicalSales: 'Ventes similaires : 12k€, 14.5k€, 17k€',
    liquidityScore: 'Élevée (note 8.5/10)',
    curatorNote: 'Œuvre cohérente avec les tendances actuelles des ventes en galeries européennes.',
    investmentOpportunity: '10 parts de 1 800 € disponibles (commission incluse)',
  },
  '2': {
    title: 'Nature Morte au Vase',
    artist: 'Sophie Moreau',
    description: 'Un hommage moderne aux natures mortes classiques.',
    dimensions: '65 x 100 cm',
    medium: 'Huile sur toile',
    period: '2019',
    priceRange: '10 000 – 13 000 €',
    historicalSales: '10k€, 11.5k€',
    liquidityScore: 'Moyenne (note 6.5/10)',
    curatorNote: 'Intéressant pour une stratégie long terme.',
    investmentOpportunity: '20 parts de 650 € disponibles',
  }
};

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = mockArtworks[params.id];

  if (!artwork) {
    return <div className="p-6">Aucune œuvre trouvée.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{artwork.title}</h1>
      <p><strong>Artiste :</strong> {artwork.artist}</p>
      <p><strong>Période :</strong> {artwork.period}</p>
      <p><strong>Medium :</strong> {artwork.medium}</p>
      <p><strong>Dimensions :</strong> {artwork.dimensions}</p>
      <p><strong>Description :</strong> {artwork.description}</p>

      <hr />

      <h2 className="text-xl font-semibold">Analyse financière</h2>
      <p><strong>Estimation :</strong> {artwork.priceRange}</p>
      <p><strong>Historique des ventes :</strong> {artwork.historicalSales}</p>
      <p><strong>Liquidité :</strong> {artwork.liquidityScore}</p>
      <p><strong>Note du curateur :</strong> {artwork.curatorNote}</p>
      <p><strong>Opportunité :</strong> {artwork.investmentOpportunity}</p>

      <ArtworkPDFButton artwork={artwork} />
    </div>
  );
}
