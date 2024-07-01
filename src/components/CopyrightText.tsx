'use client';
import { companyName, deployPath } from '@/utils/constants';
import { ComponentProps } from '@/typing/props';

export function CopyrightText(props: ComponentProps) {
  const { className } = props;
  return (
    <article
      id="copyright"
      className={`flex flex-row flex-wrap items-center justify-center text-center text-sm ${
        className ?? ''
      }`}
    >
      <span className={`mt-0 flex flex-row justify-center`}>
        {`© ${new Date().getFullYear()}`}
      </span>
      <a
        className="no-underline hover:underline text-inherit ml-1"
        target="_blank"
        href={deployPath}
      >
        {companyName.toUpperCase()}
      </a>
    </article>
  );
}
