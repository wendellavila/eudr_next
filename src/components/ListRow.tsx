'use client';
import Link from 'next/link';
import { ComponentProps } from '@/typing/props';
import { ComponentType, SetState } from '@/typing/types';

interface ListRowHrefProps extends ComponentProps {
  href: string;
}

interface ListRowPanelProps extends ComponentProps {
  panel: React.ReactNode;
  isOpen: boolean;
  setPanelState: SetState<boolean>;
}

interface ListRowComponentTypeProps extends ComponentProps {
  component?: ComponentType;
}

export type ListRowProps =
  | ListRowComponentTypeProps
  | ListRowPanelProps
  | ListRowHrefProps;

export function ListRow(props: ListRowProps) {
  const ComponentWrapper =
    'component' in props && props.component ? props.component : 'div';
  const hasPanel = 'panel' in props;
  const hasHref = 'href' in props;
  const hasAction = hasPanel || hasHref;

  const { id, children } = props;

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
        <div className="p-4 bg-avocado-200">{props.panel}</div>
      )}
    </ComponentWrapper>
  );
}
