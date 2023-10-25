import School from "./school";
export default interface Tour {
  id: string;
  start: string;
  end: string;
  school: number;
  schedule: string;
  destination: string;
  notes: string;
  schools: School;
}