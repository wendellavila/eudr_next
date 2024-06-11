import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export function SvgSpinners3DotsFade(props: Props) {
  return (
    <span className={props.className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <circle cx={4} cy={12} r={3} fill="currentColor">
          <animate
            id="svgSpinners3DotsFade0"
            fill="freeze"
            attributeName="opacity"
            begin="0;svgSpinners3DotsFade1.end-0.25s"
            dur="0.75s"
            values="1;0.2"
          ></animate>
        </circle>
        <circle cx={12} cy={12} r={3} fill="currentColor" opacity={0.4}>
          <animate
            fill="freeze"
            attributeName="opacity"
            begin="svgSpinners3DotsFade0.begin+0.15s"
            dur="0.75s"
            values="1;0.2"
          ></animate>
        </circle>
        <circle cx={20} cy={12} r={3} fill="currentColor" opacity={0.3}>
          <animate
            id="svgSpinners3DotsFade1"
            fill="freeze"
            attributeName="opacity"
            begin="svgSpinners3DotsFade0.begin+0.3s"
            dur="0.75s"
            values="1;0.2"
          ></animate>
        </circle>
      </svg>
    </span>
  );
}
