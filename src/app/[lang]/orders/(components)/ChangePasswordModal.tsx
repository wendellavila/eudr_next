'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Iconify } from '@/components/Iconify';
import { SetState } from '@/typing/types';
import { basePath } from '@/utils/constants';

interface ChangePasswordModalProps {
  isPasswordModalOpen: boolean;
  setPasswordModalOpen: SetState<boolean>;
}

export function ChangePasswordModal(props: ChangePasswordModalProps) {
  const { isPasswordModalOpen, setPasswordModalOpen } = props;

  const i18n = useTranslations('homePage.labels.changePasswordModal');

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');

  const handleClose = () => setPasswordModalOpen(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      currentPassword: data.get('currentPassword'),
      newPassword: data.get('newPassword'),
      repeatNewPassword: data.get('repeatNewPassword'),
    });
  };

  return (
    <Modal
      open={isPasswordModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-col items-center"
    >
      <Card className="relative p-4 m-8 max-w-[500px] min-w-[450px]">
        <div className="absolute top-0 right-0 p-1">
          <IconButton onClick={handleClose}>
            <Iconify icon="mdi:close" width={24} />
          </IconButton>
        </div>
        <div className="flex flex-row justify-center">
          <Image
            width={66}
            height={43}
            src={`${basePath}/logo.svg`}
            alt="Logo"
            className="inline w-auto h-[60px] my-4"
            priority={true}
          />
        </div>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center"
        >
          {i18n('title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="currentPassword"
            name="currentPassword"
            label={i18n('currentPassword')}
            type="password"
            variant="outlined"
            margin="normal"
            onChange={event => setCurrentPassword(event.target.value)}
          />
          <TextField
            required
            fullWidth
            id="newPassword"
            name="newPassword"
            label={i18n('newPassword')}
            type="password"
            variant="outlined"
            margin="normal"
            onChange={event => setNewPassword(event.target.value)}
          />
          <TextField
            required
            fullWidth
            id="repeatNewPassword"
            name="repeatNewPassword"
            label={i18n('repeatNewPassword')}
            type="password"
            variant="outlined"
            margin="normal"
            onChange={event => setRepeatNewPassword(event.target.value)}
          />
          <div className="flex flex-row justify-center mt-6">
            <Button
              variant="contained"
              type="submit"
              className="min-w-[120px]"
              disabled={
                currentPassword.length < 8 ||
                newPassword.length < 8 ||
                newPassword !== repeatNewPassword
              }
            >
              {i18n('confirm')}
            </Button>
          </div>
        </Box>
      </Card>
    </Modal>
  );
}
