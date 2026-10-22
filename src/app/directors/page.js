import { fetchCMSData } from '../../lib/fetchCMS';
import DirectorsPageClient from '../../components/pages/DirectorsPageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Board of Directors | Dorek International',
  description: 'Meet the 13 Directors and executive leadership guiding Dorek International Enterprises LLP across multi-sector commerce, sustainable operations, and corporate governance.'
};

export default async function DirectorsPage() {
  const initialData = await fetchCMSData();
  return <DirectorsPageClient initialData={initialData} />;
}
