import Link from "next/link";
import { getUser } from "../api/authenticatePriviledges";
import "@/app/styles/moderator/moderator-nav.css";

const ModeratorNavigation = async () => {
  const user = await getUser();

  //@ts-ignore
  const profile = user[0]
  return profile.moderator ? (
    <div className="moderator-dash">
      <Link href="/pages/sites">Sites</Link>
      <Link href="/pages/moderator/restaurants">Restaurants</Link>
      <Link href="/pages/moderator/tours">Tours</Link>
      <Link href="/pages/moderator/schools">Schools</Link>
      <Link href="/pages/moderator/hotels">Hotels</Link>
    </div>
  ) : null;
};

export default ModeratorNavigation;
