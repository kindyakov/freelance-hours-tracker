'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DatesProvider } from '@mantine/dates'
import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

// Set Russian locale globally for all dayjs calls on the client
dayjs.locale('ru')

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // One QueryClient per browser session — not shared across requests.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 1000, // 10 min
            gcTime: 30 * 60 * 1000, // 30 min
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DatesProvider settings={{ locale: 'ru' }}>
        {children}
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </DatesProvider>
    </QueryClientProvider>
  )
}
