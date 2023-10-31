import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div>
      <div>moderator dash</div>
      <div><Link href='/pages/sites/all-sites'>Sites</Link></div>
      <div><Link href='/pages/moderator/tours'>Tours</Link></div>
      <div><Link href='/pages/moderator/schools'>Schools</Link></div>
      <div><Link href='/pages/moderator/hotels'>Hotels</Link></div>
      <div>destinations, restaurants, teachers,</div>
    </div>
  )
};

export default Dashboard