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
            className="text-form"
          >
            <div className='form-field-group'>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                placeholder="you@example.com"
                className='text-input'
                required
              />
            </div>
              <div className='form-field-group'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className='text-input'
                required
              />
            </div>
            <button>Sign In</button>
            <Messages />
          </form>
          <Link href="/pages/signup">Sign Up</Link>
      </div>
    </div>
  )
}
