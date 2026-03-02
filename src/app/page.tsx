import { redirect } from 'next/navigation'

// Root path always redirects: middleware will send to /login if unauthenticated.
export default function RootPage() {
  redirect('/dashboard')
}
