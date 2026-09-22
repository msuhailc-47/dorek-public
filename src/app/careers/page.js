import { fetchCMSData } from '../../lib/fetchCMS';
import CareersPageClient from '../../components/pages/CareersPageClient';

export const metadata = {
  title: 'Careers & Opportunities | Dorek International',
  description: 'Join the team at Dorek International. Discover job openings in sales, engineering, tech, and retail management across Kerala.'
};

export default async function CareersPage() {
  const initialData = await fetchCMSData();
  return <CareersPageClient initialData={initialData} />;
}
