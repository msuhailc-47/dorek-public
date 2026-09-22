import { fetchCMSData } from '../../lib/fetchCMS';
import ContactPageClient from '../../components/pages/ContactPageClient';

export const metadata = {
  title: 'Contact Us | Dorek International',
  description: 'Get in touch with Dorek International Enterprises LLP. Head office, department inquiries, locations, and direct contact form.'
};

export default async function ContactPage() {
  const initialData = await fetchCMSData();
  return <ContactPageClient initialData={initialData} />;
}
