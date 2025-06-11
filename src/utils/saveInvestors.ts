// utils/saveInvestor.ts
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust this path to your Firebase db instance

interface InvestorData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  // Add any other fields relevant to your investor
  [key: string]: any; // Allow for flexible fields
}

/**
 * Saves a new investor to Firestore.
 * If an ID is provided, it attempts to set the document with that ID (upsert).
 * Otherwise, it adds a new document with an auto-generated ID.
 * @param investorData The data of the investor to save.
 * @param id Optional: The ID of the investor document if you want to set a specific ID.
 * @returns The ID of the saved investor document.
 */
export const saveInvestor = async (investorData: InvestorData, id?: string): Promise<string> => {
  try {
    if (id) {
      const investorRef = doc(db, 'investors', id);
      await setDoc(investorRef, investorData, { merge: true });
      console.log('Investor document updated/set with ID: ', id);
      return id;
    } else {
      const docRef = await addDoc(collection(db, 'investors'), investorData);
      console.log('New investor document written with ID: ', docRef.id);
      return docRef.id;
    }
  } catch (e) {
    console.error('Error saving investor: ', e);
    throw e; // Re-throw the error for handling in the calling component
  }
};