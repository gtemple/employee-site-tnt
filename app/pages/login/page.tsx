import Link from 'next/link'
import Messages from './messages'

export default function Login() {
  return (
    <div>
      <Link href="/">Back</Link>

      <form
        action="/auth/sign-in"
        method="post"
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button>Sign In</button>
        <Messages />
      </form>
    </div>
  )
}
