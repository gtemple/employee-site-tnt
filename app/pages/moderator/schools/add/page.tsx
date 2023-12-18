import Link from "next/link";
import SchoolAdd from "@/app/components/moderator/SchoolAdd";
import { isModerator } from "@/app/api/authenticatePriviledges";
import { getAllBoards } from "@/app/api/boards/getBoards";

export default async function AddSchool() {
  const writeAccess = await isModerator();
  const boardData = await getAllBoards();

  const boards = boardData?.allBoardData;

  if (!writeAccess) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <div>
        <h3>Add School</h3>
        <div>
          {boards !== undefined && (<SchoolAdd boards={boards} />) || <div className='fetch-fail'>Board Fetch Failed</div>}
        </div>
      </div>
    </div>
  );
}
