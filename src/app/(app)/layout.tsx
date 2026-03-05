import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { MonthNavigator } from '@/components/layout/MonthNavigator'

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getSession()
	if (!session?.user?.id) redirect('/login')

	return (
		<SessionProvider>
			<div className='flex min-h-screen'>
				<Sidebar />
				<div className='flex flex-col flex-1 min-w-0'>
					{/* Top bar */}
					<header className='flex items-center justify-between border-b border-(--border) px-4 py-3 bg-(--surface)'>
						<span className='md:hidden font-bold text-white'>
							FreelanceHours
						</span>
						<MonthNavigator />
					</header>

					{/* Page content */}
					<main className='flex-1 overflow-auto p-4 pb-20 md:pb-4'>
						{children}
					</main>
				</div>
			</div>
			<BottomNav />
		</SessionProvider>
	)
}
