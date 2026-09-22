import { NextResponse } from 'next/server';
import { db } from '../../../firebase';
import { doc, setDoc, increment } from 'firebase/firestore';

export const runtime = 'nodejs';

export async function POST() {
  try {
    if (db) {
      const analyticsRef = doc(db, 'dorek_cms', 'analytics');
      await setDoc(analyticsRef, { totalVisitors: increment(1) }, { merge: true });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
