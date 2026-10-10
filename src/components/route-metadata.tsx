import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

const SITE = 'https://learnify.mk';
const HOME_DESCRIPTION =
  'Learnify.mk нуди приватни часови за предмети од ФИНКИ со фокус на подобро разбирање, поефикасна подготовка и полесно положување испити.';

const metadataByPath: Record<
  string,
  { description: string; index: boolean; title: string }
> = {
  '/': {
    description: HOME_DESCRIPTION,
    index: true,
    title: 'Learnify.mk | Приватни часови за ФИНКИ',
  },
  '/about': {
    description:
      'Запознај го тимот на Learnify.mk и дознај како им помагаме на студентите на ФИНКИ.',
    index: true,
    title: 'За нас | Learnify.mk',
  },
  '/banner': {
    description: 'Креирај и преземи банер со Learnify.mk генераторот.',
    index: false,
    title: 'Генератор на банери | Learnify.mk',
  },
};

const setMeta = (name: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${CSS.escape(name)}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.append(element);
  }

  element.content = content;
};

const setPropertyMeta = (property: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${CSS.escape(property)}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.append(element);
  }

  element.content = content;
};

export const RouteMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalPath = Object.keys(metadataByPath).find((path) =>
      matchPath({ end: true, path }, pathname),
    );
    const metadata = canonicalPath ? metadataByPath[canonicalPath] : undefined;
    const title = metadata?.title ?? 'Страницата не е пронајдена | Learnify.mk';
    const description =
      metadata?.description ??
      'Побарај часови за ФИНКИ или врати се на почетната страница на Learnify.mk.';
    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const canonicalHref = `${SITE}${canonicalPath ?? pathname}`;

    document.title = title;
    setMeta('description', description);
    setMeta('robots', metadata?.index ? 'index, follow' : 'noindex, follow');
    setPropertyMeta('og:title', title);
    setPropertyMeta('og:description', description);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    if (metadata) {
      setPropertyMeta('og:url', canonicalHref);
      if (canonical) canonical.href = canonicalHref;
      else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalHref;
        document.head.append(link);
      }
    } else {
      canonical?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [pathname]);

  return null;
};
