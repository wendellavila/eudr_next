import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export function MdiInfoOutline(props: Props) {
  const { className, ...otherProps } = props;
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...otherProps}
      >
        <path
          fill="currentColor"
          d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z"
        ></path>
      </svg>
    </span>
  );
}
