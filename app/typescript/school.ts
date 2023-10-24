export default interface School {
  id: string;
  name: string;
  grade: string;
  created_at: string;
  address: string;
  city: string;
  phone: string;
  postal: string;
  board: string;
  boards: {
    id: string;
    created_at: string;
    name: string;
    acronym: string;
  }
  notes: string | null;
}