import { fetchCMSData } from '../../lib/fetchCMS';
import LegalPageClient from '../../components/LegalPageClient';

export default async function PrivacyPage() {
  const initialData = await fetchCMSData();
  return <LegalPageClient initialData={initialData} pageKey='privacyPolicy' pageTitle='Privacy Policy' />;
}
