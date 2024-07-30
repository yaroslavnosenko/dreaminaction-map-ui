'use client'

import { UserRole } from '@/types'
import { ActionIcon, Button, Group, Modal, NativeSelect } from '@mantine/core'
import { ChangeEvent, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { onDelete, onSetRole } from './actions'

type UserFormProps = {
  id: string
  role: UserRole
  isAdmin: boolean
}

export const UserForm = ({ role, id, isAdmin }: UserFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleRoleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const role = await onSetRole(id, event.target.value as UserRole)
    toast.success('Role changed to ' + role)
  }

  const handleDelete = async () => {
    await onDelete(id)
  }

  return (
    <Group>
      <NativeSelect
        disabled={!isAdmin}
        value={role}
        data={[
          { label: 'Admin', value: UserRole.admin },
          { label: 'Manager', value: UserRole.manager },
          { label: 'User', value: UserRole.user },
        ]}
        onChange={handleRoleChange}
      />
      {isAdmin && (
        <ActionIcon
          onClick={() => setIsModalOpen(true)}
          className="animated"
          variant="white"
          radius="xl"
          color="red"
          size="md"
        >
          <MdDelete size={24} />
        </ActionIcon>
      )}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        withCloseButton={false}
        title="Delete user?"
        centered
      >
        <Group pt={4} justify="flex-end">
          <Button onClick={() => setIsModalOpen(false)} variant="transparent">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </Group>
  )
}
