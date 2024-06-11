import { RefObject, useEffect, useRef, useState } from 'react';

export function useInView(
  ref: RefObject<HTMLElement | null>,
  threshold?: number
) {
  const [inView, setVisibility] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let th = threshold;
    if (!th || th < 0) {
      th = 0;
    } else {
      th = Math.floor(th);
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => setVisibility(entry.isIntersecting),
      {
        rootMargin: th !== undefined ? `0px 0px -${th}px` : undefined,
      }
    );
  }, [observerRef, threshold]);

  useEffect(() => {
    if (observerRef && observerRef.current && ref.current)
      observerRef.current.observe(ref.current);
    return () => {
      if (observerRef && observerRef.current) observerRef.current.disconnect();
    };
  }, [observerRef, ref]);
  return inView;
}
