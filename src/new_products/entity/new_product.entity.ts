import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NewProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  name: string;

  @Column()
  composition: string;

  @Column({ default: false })
  isAlreadyInFireBase: boolean;

  @Column({ default: null })
  image_url: string;

  @Column()
  barcode: string;

  @Column()
  business: string;

  @Column()
  country: string;

  @Column()
  image_path: string;

  @Column()
  inserted_date: Date;

  @Column({ default: null })
  updated_date: Date;
  
  @Column({ default: null })
  who_update: string;

  @Column({ default: null })
  who_send_firebase: string;
  
  @Column({default: false})
  is_definitive_image : boolean;
}
