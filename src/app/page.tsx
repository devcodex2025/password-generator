import type { Viewport } from 'next';
import LocalePage from './[locale]/page';
import { buildHomeMetadata } from '@/lib/home-metadata';
import HomeStructuredData from '@/components/seo/HomeStructuredData';

export const metadata = buildHomeMetadata('en');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootPage() {
  return (
    <>
      <HomeStructuredData locale="en" />
      <LocalePage params={Promise.resolve({ locale: 'en' })} />
    </>
  );
}
