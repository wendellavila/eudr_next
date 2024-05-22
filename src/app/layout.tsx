import './globals.css';
import { ComponentProps } from '@/typing/props';
export { generateMetadata } from '@/utils/functions';

export default function RootLayout({ children }: ComponentProps) {
  return children;
}
