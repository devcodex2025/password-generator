import 'vanilla-cookieconsent/dist/cookieconsent.css';

export async function generateStaticParams() {
  const supportedLangs = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];
  return [
    { slug: [] },
    ...supportedLangs.map(lang => ({ slug: [lang] })),
  ];
}

import { ClientOnly } from "./client";

type PageProps = {
  params: {
    slug?: string[];
  };
};

export default function Page({ params }: PageProps) {
  const language = params?.slug?.[0] ?? 'en';
  return <ClientOnly language={language} />;
}


