// utils/saveArtwork.ts
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust this path to your Firebase db instance

interface ArtworkData {
  title: string;
  artist: string;
  year: number;
  description: string;
  imageUrl: string;
  // Add any other fields relevant to your artwork
  [key: string]: any; // Allow for flexible fields
}

/**
 * Saves a new artwork to Firestore.
 * If an ID is provided, it attempts to set the document with that ID (upsert).
 * Otherwise, it adds a new document with an auto-generated ID.
 * @param artworkData The data of the artwork to save.
 * @param id Optional: The ID of the artwork document if you want to set a specific ID.
 * @returns The ID of the saved artwork document.
 */
export const saveArtwork = async (artworkData: ArtworkData, id?: string): Promise<string> => {
  try {
    if (id) {
      const artworkRef = doc(db, 'artworks', id);
      await setDoc(artworkRef, artworkData, { merge: true }); // merge: true to update existing fields
      console.log('Artwork document updated/set with ID: ', id);
      return id;
    } else {
      const docRef = await addDoc(collection(db, 'artworks'), artworkData);
      console.log('New artwork document written with ID: ', docRef.id);
      return docRef.id;
    }
  } catch (e) {
    console.error('Error saving artwork: ', e);
    throw e; // Re-throw the error for handling in the calling component
  }
};