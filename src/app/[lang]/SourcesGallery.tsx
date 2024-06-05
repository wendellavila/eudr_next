'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { basePath, sourcesData } from '@/utils/constants';

export function SourcesGallery() {
  const i18n = useTranslations('reportPage.labels.reportsPanel');
  let sources: { image: string; institution: string; url: string }[] = [
    'SITUACAO_CAR',
    'EMBARGO_IBAMA_DOCUMENT',
    'ALERTA_MAPBIOMAS',
    'PRODES_ANY',
    'EMBARGO_ICMBIO_DOCUMENT',
    'TERRAS_INDIGENAS',
    'QUILOMBOS',
    'UNIDADES_CONSERVACAO',
    'EMBARGO_SLAVERIES_DOCUMENT',
    'EMBARGO_SEMA',
  ].map(type => {
    return {
      image: sourcesData[type].image,
      institution: i18n(`protocolItems.${type}.institution`),
      url: sourcesData[type].url,
    };
  });

  return (
    <div className="my-8 flex flex-wrap gap-4 justify-center">
      {sources.map((source, index) => (
        <a key={index} href={source.url} target="blank">
          <Image
            width={100}
            height={65}
            src={`${basePath}/${source.image}`}
            alt={`${source.institution} - Logo`}
            title={source.institution}
            className="inline w-auto h-[90px] hover:scale-110 duration-300
              bg-white p-4 drop-shadow-sm hover:bg-[#fff6ee]"
          />
        </a>
      ))}
    </div>
  );
}
