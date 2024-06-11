import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export function CarbonChevronDown(props: Props) {
  return (
    <span className={props.className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
        <path
          fill="currentColor"
          d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"
        ></path>
      </svg>
    </span>
  );
}
