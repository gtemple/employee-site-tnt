import Link from "next/link";
import SchoolUpdate from "@/app/components/moderator/SchoolUpdate";
import { isModerator } from "@/app/api/authenticatePriviledges";
import { getAllBoards } from "@/app/api/boards/getBoards";
import { getSchoolData } from "@/app/api/schools/getSchools";
import Params from "@/app/typescript/params";

export default async function UpdateHotel({ params }: Params) {
  const writeAccess = await isModerator();
  const boardData = await getAllBoards();
  const boards = boardData && boardData.allBoardData || []; 

  if (!writeAccess) {
    return <div>Access Denied</div>;
  }
  //@ts-ignore
  const { schoolData } = await getSchoolData(params.id);
  const school = schoolData && schoolData[0];

  return (
    <div>
      <div>
        <div>Update site: {school.name}</div>
        <div>
          <SchoolUpdate boards={boards} school={school} />
        </div>
      </div>
      <Link href="/pages/moderator/schools/all-schools">Back</Link>
    </div>
  );
}
