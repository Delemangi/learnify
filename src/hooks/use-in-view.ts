import { useEffect, useRef, useState } from 'react';

export const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { inView, ref };
};
