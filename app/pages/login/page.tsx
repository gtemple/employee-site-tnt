import Link from 'next/link'
import Messages from './messages'

import './login.css'

export default function Login() {
  return (
    <div>
      <div className='login-box'>
          <form
            action="/api/auth/sign-in"
            method="post"
          >
            <label htmlFor="email">Email</label>
            <input
              name="email"
              placeholder="you@example.com"
              className='text-input'
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className='text-input'
              required
            />
            <button className='test'>Sign In</button>
            <Messages />
          </form>
      <Link href="/pages/signup">Sign Up</Link>
      </div>
    </div>
  )
}
