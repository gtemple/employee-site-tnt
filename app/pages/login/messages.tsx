'use client'

import { useSearchParams } from 'next/navigation'

export default function Messages() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error && (
        <p>
          {error}
        </p>
      )}
      {message && (
        <p>
          {message}
        </p>
      )}
    </>
  )
}
