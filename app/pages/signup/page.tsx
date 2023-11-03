import Link from 'next/link'

export default function Login() {
  return (
    <div>
      {/* <Link href="/">Back</Link>

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
      </form> */}
      <div className='construction'>Thank you for your interest in registering. This site is currently not accepting new users. If you would like to reach the developer for a demo, please contact Giordano at giordanotemple@gmail.com</div>
      <Link href="/pages/login">Login</Link>
    </div>
  )
}
