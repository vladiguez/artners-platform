'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

export default function ArtworkPDFButton({ artwork }: { artwork: Artwork }) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Titre
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(artwork.title, 10, 20);

    // Sous-titre
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Artiste : ${artwork.artist}`, 10, 30);
    doc.text(`Période : ${artwork.period}`, 10, 36);
    doc.text(`Medium : ${artwork.medium}`, 10, 42);
    doc.text(`Dimensions : ${artwork.dimensions}`, 10, 48);

    // Description
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Description :', 10, 60);
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(artwork.description, 180), 10, 66);

    // Analyse financière en tableau
    autoTable(doc, {
      startY: 90,
      head: [['Analyse financière', 'Détails']],
      body: [
        ['Estimation', artwork.priceRange],
        ['Historique des ventes', artwork.historicalSales],
        ['Liquidité', artwork.liquidityScore],
        ['Note du curateur', artwork.curatorNote],
        ['Opportunité d’investissement', artwork.investmentOpportunity],
      ],
      styles: {
        fontSize: 11,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        halign: 'left',
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
      },
    });

    // Enregistrement
    doc.save(`${artwork.title.replace(/\s+/g, '_')}_Dossier.pdf`);
  };

  return (
    <button
      className="mt-6 bg-black text-white px-5 py-3 rounded hover:bg-gray-800 transition"
      onClick={handleDownloadPDF}
    >
      Télécharger le dossier PDF
    </button>
  );
}
