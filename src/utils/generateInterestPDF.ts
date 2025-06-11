// src/utils/generateInterestPDF.ts
'use client';
import jsPDF from "jspdf";

export function generateInterestPDF(walletAddress: string, artworkId?: string) {
  const doc = new jsPDF();
  const date = new Date().toLocaleString();

  // Header
  doc.setFontSize(18);
  doc.text("Artners - Preuve d'intérêt", 20, 20);

  // Subheader
  doc.setFontSize(12);
  doc.text(`Date : ${date}`, 20, 30);
  doc.text(`Adresse du wallet : ${walletAddress}`, 20, 40);

  if (artworkId) {
    doc.text(`ID de l'œuvre sélectionnée : ${artworkId}`, 20, 50);
  } else {
    doc.text(`Intérêt exprimé sans sélection spécifique d'œuvre.`, 20, 50);
  }

  doc.text(
    "Ce document atteste que l'adresse mentionnée a manifesté un intérêt pour un investissement via la plateforme Artners.",
    20,
    70,
    { maxWidth: 170 }
  );

  // Footer
  doc.setFontSize(10);
  doc.text("Artners - artners.com", 20, 280);

  doc.save(`preuve-interet-artners.pdf`);
}
