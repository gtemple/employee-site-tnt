import Link from 'next/link'

export default function UpdateUser() {
  
  return (
    <div>
      <Link href="/">Back</Link>

      <form
        action="/auth/update"
        method="post"
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <input
          type="text"
          name="first_name"
          required
        />
        <input
          type="text"
          name="last_name"
          required
        />
        <input
          type="hidden"
          name="user_id"
          value="something"
        />
        <button>Update</button>
      </form>
    </div>
  )
}
