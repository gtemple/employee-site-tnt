import React from "react";
import Link from "next/link";
import "@/app/styles/moderator/dash.css";

const Dashboard = () => {
  return (
    <div className='moderator-container'>
      <div className="moderator-title">Moderator Dashboard</div>

      <div className="moderator-dash">
        <Link href="/pages/sites/all-sites">Sites</Link>
        <Link href="/pages/moderator/restaurants">Restaurants</Link>
        <Link href="/pages/moderator/tours">Tours</Link>
        <Link href="/pages/moderator/schools">Schools</Link>
        <Link href="/pages/moderator/hotels">Hotels</Link>
        <div>to be added: destinations, teachers</div>
      </div>
    </div>
  );
};

export default Dashboard;
