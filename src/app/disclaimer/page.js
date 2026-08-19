import { fetchCMSData } from '../../lib/fetchCMS';
import LegalPageClient from '../../components/LegalPageClient';

export default async function DisclaimerPage() {
  const initialData = await fetchCMSData();
  return <LegalPageClient initialData={initialData} pageKey='disclaimer' pageTitle='Disclaimer' />;
}
