import Board from "./board";
export default interface School {
  id: string;
  name: string;
  grade: string;
  created_at: string;
  teacher: string;
  address: string;
  city: string;
  phone: string;
  postal: string;
  board: string;
  notes: string | null;
  boards: Board;
}