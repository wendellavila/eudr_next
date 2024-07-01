'use client';
import { Drawer } from '@mui/material';
import { SetState } from '@/typing/types';
import { UserProfile } from './UserProfile';

interface NavbarDrawerProps {
  customerName?: string;
  customerId?: string;
  logo?: string;
  isDrawerOpen: boolean;
  setDrawerOpen: SetState<boolean>;
}

export function NavbarDrawer(props: NavbarDrawerProps) {
  const { customerId, customerName, isDrawerOpen, setDrawerOpen, logo } = props;

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => setDrawerOpen(false)}
      className="lg:hidden"
    >
      <UserProfile
        customerId={customerId}
        customerName={customerName}
        logo={logo}
      />
    </Drawer>
  );
}
