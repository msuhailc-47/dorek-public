import { NextResponse } from 'next/server';
import { db } from '../../../firebase';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.json();
    const id = Date.now();
    const docId = `sub_${id}_${Math.random().toString(36).substring(2, 7)}`;
    const submission = {
      id,
      docId,
      date: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
      isRead: false,
      ...formData
    };
    
    if (db) {
      // 1. Permanent Enterprise Subcollection Architecture: Store each inquiry in its own document (Zero 1MB limit!)
      const subDocRef = doc(db, 'dorek_submissions', docId);
      await setDoc(subDocRef, submission);

      // 2. Dual Mirroring: Attempt update on legacy array for backward compatibility
      try {
        const legacyDocRef = doc(db, 'dorek_cms', 'submissions');
        await updateDoc(legacyDocRef, {
          submissions: arrayUnion(submission)
        });
      } catch (legacyErr) {
        if (legacyErr.code === 'not-found') {
          try {
            await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: [submission] });
          } catch (e) {
            // Ignore legacy creation errors
          }
        }
        // Subcollection write already succeeded, so ignore legacy array limit warnings
      }
    }
    return NextResponse.json({ success: true, id, docId });
  } catch (error) {
    console.error("Error saving submission on server: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
