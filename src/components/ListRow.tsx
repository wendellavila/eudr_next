'use client';

import Link from 'next/link';
import { ComponentProps } from '@/typing/props';
import { SetState } from '@/typing/types';

interface ListRowLinkProps extends ComponentProps {
  href: string;
}

interface ListRowPanelProps extends ListRowNoActionProps {
  panel: React.ReactNode;
  isOpen: boolean;
  setPanelState: SetState<boolean>;
}

interface ListRowNoActionProps extends ComponentProps {
  component?: 'div' | 'article' | 'section';
}

type ListRowProps = ListRowNoActionProps | ListRowPanelProps | ListRowLinkProps;

export function ListRow(props: ListRowProps) {
  const { children, id } = props;
  const ComponentWrapper =
    'component' in props && props.component ? props.component : 'div';
  const hasPanel = 'panel' in props;
  const hasHref = 'href' in props;
  const hasAction = hasPanel || hasHref;

  let className = `py-2 flex flex-row border-neutral-200 border-b-[1px]
	border-t-0 border-x-0 border-solid `;

  if (hasAction) className += 'hover:cursor-pointer hover:bg-stone-100 ';
  if (hasHref) className += 'text-inherit no-underline';

  return (
    <ComponentWrapper id={id}>
      {hasHref && (
        <Link href={props.href} className={className}>
          {children}
        </Link>
      )}
      {!hasHref && (
        <div
          onClick={() => {
            if (hasPanel) {
              props.setPanelState(isOpen => !isOpen);
            }
          }}
          className={className}
        >
          {children}
        </div>
      )}
      {hasPanel && props.isOpen === true && (
        <div className={`p-4 bg-[#abada3]`}>{props.panel}</div>
      )}
    </ComponentWrapper>
  );
}
