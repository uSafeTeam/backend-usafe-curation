
export interface NewProduct {
  id: string;
  name: string;
  composition: string;
  isAlreadyInFireBase: boolean;
  image_url: string;
  barcode: string;
  business: string;
  country: string;
  image_path: string;
  inserted_date: string | Date;
  updated_date?: string | Date | null;
  who_update?: string | null;
  who_send_firebase?: string | null;
  is_definitive_image: boolean;
}