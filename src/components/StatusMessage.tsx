import { ComponentProps } from '@/typing/props';
import { Iconify } from '@/components/Iconify';

interface Props extends ComponentProps {
  type: 'success' | 'error' | 'alert';
}

export function StatusMessage(props: Props) {
  const { id, children, className, type } = props;
  return (
    <article
      id={id}
      className={`flex flex-row items-center justify-center mt-4 flex-wrap text-center
      ${
        type === 'success'
          ? 'text-green-600'
          : type === 'alert'
          ? 'text-blue-600'
          : 'text-red-600'
      } ${className ?? ''}`}
    >
      <Iconify
        icon={
          type === 'success' ? 'mdi:success-circle-outline' : 'mdi:info-outline'
        }
        width={18}
        className="mr-1"
      />
      <span className="break-words text-sm">{children}</span>
    </article>
  );
}
