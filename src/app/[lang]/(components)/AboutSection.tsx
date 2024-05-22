'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Fade, Slide, Typography } from '@mui/material';
import { InView, useInView } from 'react-intersection-observer';
import { SourcesGallery } from '../SourcesGallery';

export function AboutSection() {
  const i18n = useTranslations('loginPage.labels.about');

  const [viewCount, setViewCount] = useState<number>(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const deforestationDetails = i18n('deforestation.details').split('\n');
  const eudrDetails = i18n('eudr.details').split('\n');
  const platformDetails = i18n('platform.details').split('\n');

  return (
    <section
      id="about"
      className="bg-secondary text-primaryDark pattern-autumn-orange-500/5
      overflow-hidden p-14 xs:p-8"
    >
      <InView
        onChange={(inView, _) => {
          if (inView) {
            setViewCount(viewCount + 1);
          }
        }}
      >
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <Typography
            component="h2"
            variant="h3"
            className="text-center font-bold mb-10 mt-16 break-words hyphens-auto"
          >
            {i18n('title').toLocaleUpperCase()}
          </Typography>
        </Slide>
        <div
          ref={ref}
          className="max-w-[1000px] m-auto flex flex-col gap-12 justify-center md:p-12 sm:p-4 mb-8"
        >
          <Slide
            direction="right"
            in={viewCount > 0}
            appear={false}
            timeout={800}
          >
            <article>
              <Typography
                component="h3"
                variant="h5"
                className="mb-2 font-bold"
              >
                {i18n('eudr.title')}
              </Typography>
              {eudrDetails.map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  className="text-justify mb-3"
                >
                  {paragraph}
                </Typography>
              ))}
            </article>
          </Slide>
          <article>
            <Slide
              direction="left"
              in={viewCount > 0}
              appear={false}
              timeout={800}
            >
              <div>
                <Typography
                  component="h3"
                  variant="h5"
                  className="mb-2 font-bold"
                >
                  {i18n('deforestation.title')}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className="text-justify mb-3"
                >
                  {deforestationDetails[0]}
                </Typography>
              </div>
            </Slide>
            <Fade in={viewCount > 0} appear={false} timeout={1800}>
              <div>
                <SourcesGallery />
              </div>
            </Fade>
            <Slide
              direction="left"
              in={viewCount > 0}
              appear={false}
              timeout={800}
            >
              <div>
                {deforestationDetails.slice(1).map((paragraph, index) => (
                  <Typography
                    key={index}
                    component="p"
                    variant="body1"
                    className="text-justify mb-3"
                  >
                    {paragraph}
                  </Typography>
                ))}
              </div>
            </Slide>
          </article>
          <Slide
            direction="right"
            in={viewCount > 0}
            appear={false}
            timeout={800}
          >
            <article>
              <Typography
                component="h3"
                variant="h5"
                className="mb-2 font-bold"
              >
                {i18n('platform.title')}
              </Typography>
              {platformDetails.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  variant="body1"
                  className="text-justify mb-3"
                >
                  {paragraph}
                </Typography>
              ))}
            </article>
          </Slide>
          <Slide
            direction="left"
            in={viewCount > 0}
            appear={false}
            timeout={800}
          >
            <article>
              <Typography
                component="h3"
                variant="h5"
                className="mb-2 font-bold"
              >
                {i18n('access.title')}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                className="text-justify"
              >
                {i18n('access.details')}
              </Typography>
            </article>
          </Slide>
        </div>
      </InView>
    </section>
  );
}
