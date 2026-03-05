'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar } from '@mantine/core'
import { LayoutDashboard, ClipboardList, History, LogOut, Flame } from 'lucide-react'
import { signOutAction } from '@/actions/auth'
import { useSession } from 'next-auth/react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Дашборд',    icon: LayoutDashboard },
  { href: '/log',       label: 'Учёт часов', icon: ClipboardList   },
  { href: '/history',   label: 'История',    icon: History          },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="hidden md:flex flex-col w-60 min-h-screen bg-[var(--surface)] border-r border-white/5 p-4">

      {/* ── Logo ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-2 mb-7">
        <div
          className="size-10 rounded-lg flex items-center justify-center shrink-0 text-[#0d0b08]"
          style={{ background: 'linear-gradient(135deg, #f4af25, #f97316)' }}
        >
          <Flame size={20} />
        </div>
        <div>
          <p className="text-[15px] font-bold leading-none tracking-tight text-white">
            FreelanceHours
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-widest mt-1"
             style={{ color: 'rgba(244,175,37,0.6)' }}>
            Tracker
          </p>
        </div>
      </div>

      {/* ── Nav items ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                active
                  ? 'font-semibold'
                  : 'font-medium hover:bg-white/5',
              ].join(' ')}
              style={active ? {
                background: 'rgba(244,175,37,0.10)',
                color: '#f4af25',
              } : {
                color: '#b09a87',
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </div>

      {/* ── User card ─────────────────────────────────────── */}
      {session?.user ? (
        <div className="border-t border-white/5 pt-3 mt-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
            <Avatar
              src={session.user.image}
              size="sm"
              radius="xl"
              alt={session.user.name ?? 'User'}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: '#e8e0d5' }}>
                {session.user.name}
              </p>
              <p className="text-[11px] truncate" style={{ color: '#7a614e' }}>
                Фрилансер
              </p>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="transition-colors hover:text-red-400"
                style={{ color: '#7a614e' }}
                aria-label="Выйти"
              >
                <LogOut size={14} />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
