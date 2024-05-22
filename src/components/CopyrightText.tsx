'use client';
import { Link as MUILink, Typography } from '@mui/material';
import { companyName } from '@/utils/constants';
import { ComponentProps } from '@/typing/props';

export function CopyrightText(props: ComponentProps) {
  const { className } = props;
  return (
    <article id="copyright">
      <Typography
        component="span"
        variant="body2"
        align="center"
        className={`flex flex-row justify-center ${className ?? ''}`}
      >
        {`© ${new Date().getFullYear()}`}&nbsp;
        <MUILink
          color="inherit"
          href="#"
          underline="hover"
          target="_blank"
          className="block"
        >
          {companyName.toUpperCase()}
        </MUILink>
      </Typography>
    </article>
  );
}
