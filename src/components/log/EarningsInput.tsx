'use client'

import { NumberInput, Button, Group, Paper, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useUpsertEarnings } from '@/lib/queries/useEarnings'
import { useAppStore } from '@/store/useAppStore'
import dayjs from 'dayjs'
import { formatRub } from '@/lib/utils/format'

type Props = {
  initialAmount?: number
}

export function EarningsInput({ initialAmount }: Props) {
  const { selectedMonth } = useAppStore()
  const { mutateAsync, isPending } = useUpsertEarnings(selectedMonth)

  const form = useForm({
    initialValues: { amount: initialAmount ?? 0 },
    validate: {
      amount: (v) => (v > 0 ? null : 'Amount must be greater than 0'),
    },
  })

  async function handleSubmit(values: { amount: number }) {
    try {
      await mutateAsync({
        month: dayjs(selectedMonth).format('YYYY-MM-DD'),
        amount: values.amount,
        currency: 'RUB',
      })
      notifications.show({
        title: 'Earnings saved',
        message: `Set to ${formatRub(values.amount)} for ${dayjs(selectedMonth).format('MMMM YYYY')}`,
        color: 'green',
      })
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to save earnings',
        color: 'red',
      })
    }
  }

  return (
    <Paper p="md" radius="md" withBorder>
      <Text fw={600} mb="sm">
        Monthly Earnings ({dayjs(selectedMonth).format('MMMM YYYY')})
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-end" gap="sm">
          <NumberInput
            label="Amount (₽)"
            placeholder="50000"
            min={0}
            step={1000}
            {...form.getInputProps('amount')}
            className="flex-1"
          />
          <Button type="submit" loading={isPending}>
            Save
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
