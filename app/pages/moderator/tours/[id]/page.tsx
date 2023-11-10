import React from "react";
import Link from "next/link";
import { getTourData } from "@/app/api/tours/getTours";

import Button from "@mui/material/Button";
import UserProfile from "@/app/components/admin/UserProfile";

export default async function Tour({ params }: { params: { id: string } }) {
  //@ts-ignore
  const { tourData } = await getTourData(params.id);
  const tour = tourData && tourData[0];

  return (
    <div>
      <div>
        <div>
          School: {tour.school} start: {tour.start} end: {tour.end}
        </div>
        <div>{/* <UserProfile profile={profileData[0]} /> */}</div>
      </div>
      <Link href="/pages/admin/dashboard">Back</Link>
    </div>
  );
}
