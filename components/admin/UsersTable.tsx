import React from 'react'

export default function UsersTable({userData}) {
  const profiles = userData['data']

  return (
    <div>
      {profiles.map((profile) => {
        return (
          <div>
            <div>
              {profile.first_name}
            </div>
            <div>
              {profile.last_name}
            </div>

          </div>)
       })
      }
      usersTable
    </div>
  )
};