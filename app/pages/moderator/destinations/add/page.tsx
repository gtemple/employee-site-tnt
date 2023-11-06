import Link from "next/link";
import DestinationAdd from "@/app/components/moderator/DestinationAdd";
import { isModerator } from "@/app/api/authenticatePriviledges";

export default async function AddDestination() {
  const writeAccess = await isModerator();

  if (!writeAccess) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <div>
        <div>Add Hotell</div>
        <div>
          <DestinationAdd />
        </div>
      </div>
      <Link href="/pages/moderator/dashboard">Back</Link>
    </div>
  );
}