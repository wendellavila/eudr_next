'use client';

interface Props {
  value: number;
  index: number;
  children: React.ReactNode;
}

export function TabPanel(props: Props) {
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
