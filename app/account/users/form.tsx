'use client'

import { DeleteButton } from '@/components/ui'
import { t } from '@/i18n'
import { UserRole } from '@/types'
import { Group, NativeSelect } from '@mantine/core'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { onDelete, onSetRole } from './actions'

type UserFormProps = {
  id: string
  role: UserRole
}

export const UserForm = ({ role, id }: UserFormProps) => {
  const handleRoleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await onSetRole(id, event.target.value as UserRole)
    toast.success(t('messages.saved'))
  }

  const handleDelete = async () => {
    await onDelete(id)
    toast.success(t('messages.removed'))
  }

  return (
    <Group>
      <NativeSelect
        value={role}
        data={[
          { label: t('enums.role.admin'), value: UserRole.admin },
          { label: t('enums.role.manager'), value: UserRole.manager },
        ]}
        onChange={handleRoleChange}
      />
      <DeleteButton onConfirm={handleDelete} />
    </Group>
  )
}
