import { fetchCMSData } from '../../lib/fetchCMS';
import AboutPageClient from '../../components/pages/AboutPageClient';

export const metadata = {
  title: 'About Us | Dorek International',
  description: 'Learn about Dorek International Enterprises LLP, our story, corporate vision, values, leadership, milestones, and CSR initiatives.'
};

export default async function AboutPage() {
  const initialData = await fetchCMSData();
  return <AboutPageClient initialData={initialData} />;
}
