import { redirect } from 'next/navigation'
import { Paper, Title, Text, Button, Stack, Center } from '@mantine/core'
import { Github } from 'lucide-react'
import { getSession } from '@/lib/auth'
import { signInWithGitHub } from '@/actions/auth'

export default async function LoginPage() {
	const session = await getSession()
	if (session?.user?.id) redirect('/dashboard')

	return (
		<div className='min-h-screen flex items-center justify-center bg-(--bg) p-4'>
			<Center>
				<Paper p='xl' radius='md' withBorder className='w-full max-w-sm'>
					<Stack align='center' gap='lg'>
						<div className='text-center'>
							<Title order={2} mb='xs'>
								FreelanceHours
							</Title>
							<Text c='dimmed' size='sm'>
								Учёт часов и заработка
							</Text>
						</div>

						<form action={signInWithGitHub} className='w-full'>
							<Button
								type='submit'
								fullWidth
								leftSection={<Github size={16} />}
								variant='filled'
							>
								Войти через GitHub
							</Button>
						</form>

						<Text size='xs' c='dimmed' ta='center'>
							Личный инструмент — доступ только с вашего GitHub аккаунта.
						</Text>
					</Stack>
				</Paper>
			</Center>
		</div>
	)
}
