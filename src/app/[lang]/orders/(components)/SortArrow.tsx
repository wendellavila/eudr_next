import { SortBy } from './OrdersList';
import { Iconify } from '@/components/Iconify';

interface Props {
  sortBy: SortBy;
  sortAsc: SortBy;
  sortDesc: SortBy;
}

export function SortArrow(props: Props) {
  const { sortBy, sortAsc, sortDesc } = props;
  return (
    <Iconify
      icon="mingcute:arrow-up-line"
      className={`ml-0.5 transition group-hover:text-primary
      ${sortBy === sortDesc ? 'rotate-180' : ''}
      ${
        ![sortAsc, sortDesc].includes(sortBy)
          ? 'opacity-25 group-hover:opacity-100'
          : ''
      }`}
      width={18}
    />
  );
}
