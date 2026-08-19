import { fetchCMSData } from '../../lib/fetchCMS';
import LegalPageClient from '../../components/LegalPageClient';

export default async function RefundPage() {
  const initialData = await fetchCMSData();
  return <LegalPageClient initialData={initialData} pageKey='refundPolicy' pageTitle='Refund Policy' />;
}
