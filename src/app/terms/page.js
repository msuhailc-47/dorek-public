import { fetchCMSData } from '../../lib/fetchCMS';
import LegalPageClient from '../../components/LegalPageClient';

export const dynamic = 'force-dynamic';

export default async function TermsPage() {
  const initialData = await fetchCMSData();
  return <LegalPageClient initialData={initialData} pageKey='termsConditions' pageTitle='Terms & Conditions' />;
}

