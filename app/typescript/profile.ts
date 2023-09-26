export default interface Profile {
  id: string,
  first_name: string;
  last_name: string;
  user_id: string;
  email: string;
  admin: boolean;
  moderator: boolean;
  active: boolean;
}