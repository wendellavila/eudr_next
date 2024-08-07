'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BannerScrollProps } from '@/typing/props';
import { SourcesGallery } from './SourcesGallery';
import { useInView } from '@/utils/hooks';

export function AboutSection(props: BannerScrollProps) {
  const { aboutRef, registerRef } = props;
  const i18n = useTranslations('loginPage.labels.about');

  const [animate, setAnimate] = useState(false);
  const inView = useInView(aboutRef, 80);

  useEffect(() => {
    if (inView && !animate) setAnimate(true);
  }, [animate, inView]);

  const deforestationDetails = i18n('deforestation.details').split('\n');
  const eudrDetails = i18n('eudr.details').split('\n');
  const platformDetails = i18n('platform.details').split('\n');

  return (
    <section
      ref={aboutRef}
      id="about"
      className="bg-coffee-100 text-coffee-700 pattern-autumn-orange-500/5
      overflow-hidden p-14 xs:p-8"
    >
      <h2
        className={`text-5xl text-center font-bold mb-10 mt-16 break-words hyphens-auto
        ${animate ? 'animate-fade-down' : ''}`}
      >
        {i18n('title').toLocaleUpperCase()}
      </h2>
      <div className="max-w-[1000px] m-auto flex flex-col gap-12 justify-center md:p-12 sm:p-4 mb-8">
        <article
          id="about-eudr"
          className={animate ? 'animate-fade-right animate-delay-[300ms]' : ''}
        >
          <h3 className="text-2xl mt-0 mb-2 font-bold">{i18n('eudr.title')}</h3>
          {eudrDetails.map((paragraph, index) => (
            <p
              key={`eudr-paragraph-${index}`}
              className="text-justify mb-3 leading-normal"
            >
              {paragraph}
            </p>
          ))}
        </article>
        <article id="about-deforestation">
          <div
            className={animate ? 'animate-fade-left animate-delay-[300ms]' : ''}
          >
            <h3 className="text-2xl mt-0 mb-2 font-bold">
              {i18n('deforestation.title')}
            </h3>
            <p className="text-justify mb-3 leading-normal">
              {deforestationDetails[0]}
            </p>
          </div>
          <div className={animate ? 'animate-fade' : ''}>
            <SourcesGallery />
          </div>
          <div
            className={animate ? 'animate-fade-left animate-delay-[300ms]' : ''}
          >
            {deforestationDetails.slice(1).map((paragraph, index) => (
              <p
                key={`deforestation-paragraph-${index}`}
                className="text-justify mb-3 leading-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
        <article
          id="about-platform"
          className={animate ? 'animate-fade-right animate-delay-[300ms]' : ''}
        >
          <h3 className="text-2xl mt-0 mb-2 font-bold">
            {i18n('platform.title')}
          </h3>
          {platformDetails.map((paragraph, index) => (
            <p
              key={`platform-paragraph-${index}`}
              className="text-justify mb-3 leading-normal"
            >
              {paragraph}
            </p>
          ))}
        </article>
        <article
          id="about-register"
          ref={registerRef}
          className={animate ? 'animate-fade-left animate-delay-[300ms]' : ''}
        >
          <h3 className="text-2xl mt-0 mb-2 font-bold">
            {i18n('access.title')}
          </h3>
          <p className="text-justify leading-normal">
            {i18n('access.details')}
          </p>
        </article>
      </div>
    </section>
  );
}
