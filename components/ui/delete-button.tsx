'use client'

import { t } from '@/i18n'
import { Button, Group, Modal } from '@mantine/core'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'

interface DeleteButtonProps {
  onConfirm: () => void
}

export const DeleteButton = ({ onConfirm }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        leftSection={<MdDelete size={24} />}
        className="animated"
        variant="white"
        radius="xl"
        color="red"
        size="md"
      >
        {t('labels.delete')}
      </Button>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        withCloseButton={false}
        title={t('labels.are-u-sure')}
        centered
      >
        <Group pt={4} justify="flex-end">
          <Button onClick={() => setIsModalOpen(false)} variant="transparent">
            {t('labels.no')}
          </Button>
          <Button onClick={onConfirm} color="red">
            {t('labels.yes')}
          </Button>
        </Group>
      </Modal>
    </>
  )
}
