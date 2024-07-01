'use client';

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode;
}

export function TabPanel(props: TabPanelProps) {
  const { value, index, children } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`supplier-info-tabpanel-${index}`}
      aria-labelledby={`supplier-info-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}
