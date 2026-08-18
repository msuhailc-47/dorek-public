import { fetchCMSData } from '../lib/fetchCMS';
import { CMSProvider } from '../context/CMSContext';
import MainSite from '../components/MainSite';

export async function generateMetadata() {
  const cmsData = await fetchCMSData();
  const t = cmsData?.translationsData?.en;
  
  if (!t) return { title: 'Dorek International' };

  return {
    title: t.hero?.title || 'Dorek International Enterprises LLP',
    description: t.hero?.subtitle || 'Building the future of business.',
    openGraph: {
      title: t.hero?.title,
      description: t.hero?.subtitle,
      url: 'https://dorek.in',
      siteName: 'Dorek International',
      images: [
        {
          url: t.hero?.image || 'https://dorek.in/logo.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const initialData = await fetchCMSData();

  if (!initialData) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Error connecting to CMS...</div>;
  }

  return (
    <CMSProvider initialData={initialData}>
      <MainSite />
    </CMSProvider>
  );
}
