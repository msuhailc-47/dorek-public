import { fetchCMSData } from '../../lib/fetchCMS';
import BusinessesPageClient from '../../components/pages/BusinessesPageClient';

export const metadata = {
  title: 'Our Businesses & Divisions | Dorek International',
  description: 'Explore Dorek International divisions: Doorcarts retail network, commercial solar, turnkey engineering solutions, software platforms, and franchise models.'
};

export default async function BusinessesPage() {
  const initialData = await fetchCMSData();
  return <BusinessesPageClient initialData={initialData} />;
}
