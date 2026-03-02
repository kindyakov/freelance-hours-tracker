'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ClipboardList, History } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/log', label: 'Учёт', icon: ClipboardList },
  { href: '/history', label: 'История', icon: History },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-[var(--surface)] z-50">
      <ul className="flex">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
                  isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
