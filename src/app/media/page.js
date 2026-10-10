import { fetchCMSData } from '../../lib/fetchCMS';
import MediaPageClient from '../../components/pages/MediaPageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Media Hub & Investors | Dorek International',
  description: 'View Dorek International corporate gallery, press news, awards, achievements, investor relations, CSR initiatives, and company downloads.'
};

export default async function MediaPage() {
  const initialData = await fetchCMSData();
  return <MediaPageClient initialData={initialData} />;
}
