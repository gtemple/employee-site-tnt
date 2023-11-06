import Link from 'next/link'
import { redirect } from "next/navigation";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Messages from './messages'


import './login.css'

export default async function Login() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }
  
  return (
    <div>
      <div className='login-box'>
          <form
            action="/api/auth/sign-in"
            method="post"
            className="text-form"
          >
            <div className='form-field-group'>
              <label className='label' htmlFor="email">Email</label>
              <input
                name="email"
                placeholder="you@example.com"
                className='text-input'
                required
              />
            </div>
              <div className='form-field-group'>
              <label className='label' htmlFor="password">Password</label>
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
          <Link className="landing-btn" href="/pages/signup">Sign Up</Link>
      </div>
    </div>
  )
}
