'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLink, Stack, Avatar, Text, Divider, Button } from '@mantine/core'
import { LayoutDashboard, ClipboardList, History, LogOut } from 'lucide-react'
import { signOutAction } from '@/actions/auth'
import { useSession } from 'next-auth/react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/log', label: 'Учёт часов', icon: ClipboardList },
  { href: '/history', label: 'История', icon: History },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="hidden md:flex flex-col w-60 min-h-screen bg-[var(--surface)] border-r border-[var(--border)] p-4">
      <Text fw={700} size="lg" mb="xl" className="text-white">
        FreelanceHours
      </Text>

      <Stack gap="xs" flex={1}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <NavLink
            key={href}
            component={Link}
            href={href}
            label={label}
            leftSection={<Icon size={16} />}
            active={pathname.startsWith(href)}
          />
        ))}
      </Stack>

      <Divider my="sm" />

      {session?.user ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Avatar
              src={session.user.image}
              size="sm"
              alt={session.user.name ?? 'User'}
            />
            <Text size="sm" truncate>
              {session.user.name}
            </Text>
          </div>
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="subtle"
              color="red"
              size="xs"
              leftSection={<LogOut size={14} />}
              fullWidth
            >
              Выйти
            </Button>
          </form>
        </div>
      ) : null}
    </nav>
  )
}
