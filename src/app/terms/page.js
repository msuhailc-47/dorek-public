import { fetchCMSData } from '../../lib/fetchCMS';
import LegalPageClient from '../../components/LegalPageClient';

export default async function TermsPage() {
  const initialData = await fetchCMSData();
  return <LegalPageClient initialData={initialData} pageKey='termsConditions' pageTitle='Terms & Conditions' />;
}
