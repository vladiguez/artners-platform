// components/PDFButton.tsx
'use client'; // This component must be client-side due to @react-pdf/renderer

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver'; // A common utility for saving files generated in the browser

// You might need to install file-saver: npm install file-saver
// Or use a different method to trigger download based on your preference.

// --- Define your PDF document structure ---
// This is a basic example. You'll customize this heavily for your artwork details.
interface ArtworkPDFProps {
  artwork: {
    title: string;
    artist: string;
    year: number;
    description: string;
    imageUrl?: string; // Optional image
    id?: string;
  };
}

const ArtworkDocument = ({ artwork }: ArtworkPDFProps) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Détails de l'Œuvre</Text>
        <Text style={styles.heading}>Titre: {artwork.title}</Text>
        <Text style={styles.text}>Artiste: {artwork.artist}</Text>
        <Text style={styles.text}>Année: {artwork.year}</Text>
        <Text style={styles.text}>Description: {artwork.description}</Text>
        {artwork.id && <Text style={styles.text}>ID: {artwork.id}</Text>}
      </View>
      {artwork.imageUrl && (
        <View style={styles.imageSection}>
          <Text style={styles.heading}>Image de l'Œuvre:</Text>
          <Image style={styles.image} src={artwork.imageUrl} />
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Artners Platform - Généré le {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

// --- Define PDF styles ---
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  imageSection: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold', // Ensure font is supported or embed custom fonts
  },
  heading: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
    fontFamily: 'Helvetica',
  },
  image: {
    width: '80%', // Adjust as needed
    height: 'auto',
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
  footerText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  }
});

// --- PDFButton Component ---
interface PDFButtonProps {
  artworkData: ArtworkPDFProps['artwork'];
  fileName?: string;
}

const PDFButton: React.FC<PDFButtonProps> = ({ artworkData, fileName = 'artwork-details.pdf' }) => {
  const handleGeneratePdf = async () => {
    try {
      const blob = await pdf(<ArtworkDocument artwork={artworkData} />).toBlob();
      saveAs(blob, fileName); // Requires file-saver
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Check console for details.');
    }
  };

  return (
    <button
      onClick={handleGeneratePdf}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      // Add your Tailwind CSS classes as needed
    >
      Générer PDF de l'œuvre
    </button>
  );
};

export default PDFButton;