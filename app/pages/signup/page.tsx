import Link from 'next/link'

export default function Login() {
  return (
    <div>
      <Link href="/">Back</Link>

      <form
        action="/api/auth/sign-up"
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
        <input
          type="first_name"
          name="first_name"
          required
        />
                <input
          type="last_name"
          name="last_name"
          required
        />
        <button>Sign up</button>
      </form>
    </div>
  )
}
