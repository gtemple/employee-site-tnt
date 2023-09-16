import Link from 'next/link'

export default function UpdateUser() {
  return (
    <div>
      <Link href="/">Back</Link>

      <form
        action="/auth/update-user"
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
          type="first_name"
          name="first_name"
          required
        />
                <input
          type="last_name"
          name="last_name"
          required
        />
        <button>Update</button>
      </form>
    </div>
  )
}
