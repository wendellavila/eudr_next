'use client';
import { Icon } from '@iconify/react';
import { SvgSpinners3DotsFade } from './SvgSpinners3DotsFade';
import { CarbonChevronDown } from './CarbonChevronDown';
import { CarbonMapBoundaryVegetation } from './CarbonMapBoundaryVegetation';
import { HealthiconsAgricultureOutline } from './HealthiconsAgricultureOutline';
import { FluentLeafTwo16Regular } from './FluentLeafTwo16Regular';
import { MdiInfoOutline } from './MdiInfoOutline';
import { IcLanguage } from './IcLanguage';
import { FlagpackGbUkm } from './FlagpackUs';
import { FlagpackBr } from './FlagpackBr';
import { ComponentProps } from '@/typing/props';

import type { SVGProps } from 'react';

/**
 * Client wrapper for using Iconify icons inside server components.
 * @param {Props} props
 * @returns Iconify Icon Component
 */

interface Props extends ComponentProps {
  icon: string;
  width?: number;
  height?: number;
  ariaLabel?: string;
}

export function Iconify(props: Props) {
  const { icon, ariaLabel, ...otherProps } = props;
  // Fallback icons
  switch (icon) {
    case 'svg-spinners:3-dots-fade':
      return <SvgSpinners3DotsFade {...otherProps} aria-label={ariaLabel} />;
    case 'carbon:chevron-down':
      return <CarbonChevronDown {...otherProps} aria-label={ariaLabel} />;
    case 'healthicons:agriculture-outline':
      return (
        <HealthiconsAgricultureOutline {...otherProps} aria-label={ariaLabel} />
      );
    case 'carbon:map-boundary-vegetation':
      return (
        <CarbonMapBoundaryVegetation {...otherProps} aria-label={ariaLabel} />
      );
    case 'fluent:leaf-two-16-regular':
      return <FluentLeafTwo16Regular {...otherProps} aria-label={ariaLabel} />;
    case 'mdi:info-outline':
      return <MdiInfoOutline {...otherProps} aria-label={ariaLabel} />;
    case 'ic:language':
      return <IcLanguage {...otherProps} aria-label={ariaLabel} />;
    case 'flagpack:br':
      return <FlagpackBr {...otherProps} aria-label={ariaLabel} />;
    case 'flagpack:gb-ukm':
      return <FlagpackGbUkm {...otherProps} aria-label={ariaLabel} />;
  }
  return <Icon {...props} aria-label={ariaLabel} />;
}
