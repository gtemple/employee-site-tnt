import Link from 'next/link'
import { TextField, Button } from '@mui/material'

export default function UpdateUser() {
  
  return (
    <div>
      <Link href="/">Back</Link>
        <form
          action="api/auth/update"
          method="post"
        >
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" name="password" required/>
            <TextField id="outlined-basic" label="First Name" variant="outlined" type="text" name="first_name" required/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" type="text" name="last_name" required/>
            <button>Update</button>
        </form>
    </div>
  )
}
