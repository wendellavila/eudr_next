'use client';
import { Icon, IconProps as Props } from '@iconify/react';
import { SvgSpinners3DotsFade } from './SvgSpinners3DotsFade';
import { CarbonChevronDown } from './CarbonChevronDown';
import { CarbonMapBoundaryVegetation } from './CarbonMapBoundaryVegetation';
import { HealthiconsAgricultureOutline } from './HealthiconsAgricultureOutline';
import { FluentLeafTwo16Regular } from './FluentLeafTwo16Regular';
import { MdiInfoOutline } from './MdiInfoOutline';
import { IcLanguage } from './IcLanguage';
import { FlagpackGbUkm } from './FlagpackUs';
import { FlagpackBr } from './FlagpackBr';

/**
 * Client wrapper for using Iconify icons inside server components.
 * @param {Props} props
 * @returns Iconify Icon Component
 */

export function Iconify(props: Props) {
  const icon = props.icon as string;
  // Fallback icons
  switch (icon) {
    case 'svg-spinners:3-dots-fade':
      return <SvgSpinners3DotsFade {...props} />;
    case 'carbon:chevron-down':
      return <CarbonChevronDown {...props} />;
    case 'healthicons:agriculture-outline':
      return <HealthiconsAgricultureOutline {...props} />;
    case 'carbon:map-boundary-vegetation':
      return <CarbonMapBoundaryVegetation {...props} />;
    case 'fluent:leaf-two-16-regular':
      return <FluentLeafTwo16Regular {...props} />;
    case 'mdi:info-outline':
      return <MdiInfoOutline {...props} />;
    case 'ic:language':
      return <IcLanguage {...props} />;
    case 'flagpack:br':
      return <FlagpackBr {...props} />;
    case 'flagpack:gb-ukm':
      return <FlagpackGbUkm {...props} />;
  }
  return <Icon {...props} />;
}
