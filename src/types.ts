export interface Category extends Model {
  name: string;
}

export interface Item extends Model {
  color: string;
  description: string;
  details: {
    items: string[];
    name: string;
  }[];
  images: {
    alt: string;
    id: string;
    image: string;
    name: string;
  }[];
  name: string;
  price: number;
  status: "Available" | "Rented" | "Reserved";
}

export interface Model {
  created_at: string;
  id: string;
  updated_at: string;
}
