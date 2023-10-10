export default interface Site {
  id: string;
  name: string;
  city: number;
  address: string;
  website: string;
  postal: string;
  phone: string | null;
  description: string | null;
  image: string | null;
}