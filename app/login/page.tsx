import Link from 'next/link'
import Messages from './messages'

export default function Login() {
  return (
    <div>
      <Link
        href="/"
      >{' '}
        Back
      </Link>

      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label htmlFor="email">Email</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
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
        <button formAction="/auth/sign-up" >Sign Up</button>
        <Messages />
      </form>
    </div>
  )
}
