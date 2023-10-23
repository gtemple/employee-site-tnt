import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div>
      <div>moderator dash</div>
      <div><Link href='/pages/sites/all-sites'>Sites</Link></div>
      <div><Link href='/pages/moderator/tours/all-tours'>Tours</Link></div>
      <div><Link href='/pages/moderator/tours/all-schools'>Schools</Link></div>
      <div>Hotels, destinations</div>
    </div>
  )
};

export default Dashboard