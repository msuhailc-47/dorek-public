import { fetchCMSData } from '../../lib/fetchCMS';
import CatalogPageClient from '../../components/pages/CatalogPageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Doorcarts Product Catalog | Dorek International',
  description: 'Explore Doorcarts complete product collection: Modular Switches & Electricals, Luxury Chandeliers & Lighting, Sanitaryware & Bathware, and Plumbing & Pipes Godown with instant WhatsApp wholesale quotes.',
  openGraph: {
    title: 'Doorcarts Product Catalog | Dorek International',
    description: 'Explore modular switches, luxury lighting, sanitaryware, and plumbing materials direct from Doorcarts regional warehouses.'
  }
};

export default async function CatalogPage() {
  const initialData = await fetchCMSData();
  return <CatalogPageClient initialData={initialData} />;
}
