import { redirect } from 'next/navigation'
import { Paper, Title, Text, Button, Stack, Center } from '@mantine/core'
import { Github } from 'lucide-react'
import { getSession } from '@/lib/auth'
import { signInWithGitHub } from '@/actions/auth'

export default async function LoginPage() {
  const session = await getSession()
  if (session?.user?.id) redirect('/dashboard')

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-4">
      <Center>
        <Paper p="xl" radius="md" withBorder className="w-full max-w-sm">
          <Stack align="center" gap="lg">
            <div className="text-center">
              <Title order={2} mb="xs">
                FreelanceHours
              </Title>
              <Text c="dimmed" size="sm">
                Track your hours and earnings
              </Text>
            </div>

            <form action={signInWithGitHub} className="w-full">
              <Button
                type="submit"
                fullWidth
                leftSection={<Github size={16} />}
                variant="filled"
              >
                Continue with GitHub
              </Button>
            </form>

            <Text size="xs" c="dimmed" ta="center">
              Personal tool — only your GitHub account has access.
            </Text>
          </Stack>
        </Paper>
      </Center>
    </div>
  )
}
