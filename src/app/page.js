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

  // Trim heavy sub-page data (products, gallery, careers, downloads) from landing page payload
  const homeData = {
    ...initialData,
    translationsData: {
      en: {
        nav: initialData.translationsData?.en?.nav || {},
        hero: initialData.translationsData?.en?.hero || {},
        about: initialData.translationsData?.en?.about || {},
        businesses: initialData.translationsData?.en?.businesses || {},
        whyChoose: initialData.translationsData?.en?.whyChoose || {},
        testimonials: initialData.translationsData?.en?.testimonials || {},
        contact: initialData.translationsData?.en?.contact || {},
        footer: initialData.translationsData?.en?.footer || {},
        chat: initialData.translationsData?.en?.chat || {},
        portal: initialData.translationsData?.en?.portal || {},
      },
      ml: {
        nav: initialData.translationsData?.ml?.nav || {},
        hero: initialData.translationsData?.ml?.hero || {},
        about: initialData.translationsData?.ml?.about || {},
        businesses: initialData.translationsData?.ml?.businesses || {},
        whyChoose: initialData.translationsData?.ml?.whyChoose || {},
        testimonials: initialData.translationsData?.ml?.testimonials || {},
        contact: initialData.translationsData?.ml?.contact || {},
        footer: initialData.translationsData?.ml?.footer || {},
        chat: initialData.translationsData?.ml?.chat || {},
        portal: initialData.translationsData?.ml?.portal || {},
      }
    }
  };

  return (
    <CMSProvider initialData={homeData}>
      <MainSite />
    </CMSProvider>
  );
}
