'use client';
import ArtworkPDFButton from '@/components/pdf/ArtworkPDFButton';

const artworkData = {
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
};

<ArtworkPDFButton artwork={artworkData} />
