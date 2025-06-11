'use client';

import ArtworkPDFButton from '@/components/pdf/ArtworkPDFButton';

type Artwork = {
  title: string;
  artist: string;
  description: string;
  dimensions: string;
  medium: string;
  period: string;
  priceRange: string;
  historicalSales: string;
  liquidityScore: string;
  curatorNote: string;
  investmentOpportunity: string;
};

// Mock data (à remplacer plus tard par un fetch ou une base de données)
const mockArtworks: Record<string, Artwork> = {
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
  },
};

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = mockArtworks[params.id];

  if (!artwork) {
    return (
      <div className="p-6 text-red-500 text-center">
        <p>❌ Aucune œuvre trouvée.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 bg-white rounded-2xl shadow-lg">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">{artwork.title}</h1>
        <p className="text-lg text-gray-600">par <span className="font-medium">{artwork.artist}</span></p>
      </header>

      <section className="text-sm text-gray-800 space-y-1">
        <p><strong>Période :</strong> {artwork.period}</p>
        <p><strong>Medium :</strong> {artwork.medium}</p>
        <p><strong>Dimensions :</strong> {artwork.dimensions}</p>
        <p><strong>Description :</strong> {artwork.description}</p>
      </section>

      <hr className="my-4" />

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">🔍 Analyse financière</h2>
        <p><strong>Estimation :</strong> {artwork.priceRange}</p>
        <p><strong>Historique des ventes :</strong> {artwork.historicalSales}</p>
        <p><strong>Liquidité :</strong> {artwork.liquidityScore}</p>
        <p><strong>Note du curateur :</strong> {artwork.curatorNote}</p>
        <p><strong>Opportunité :</strong> {artwork.investmentOpportunity}</p>
      </section>

      <div className="pt-6">
        <ArtworkPDFButton artwork={artwork} />
      </div>
    </div>
  );
}
