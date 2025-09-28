import { Database } from 'firebase-admin/database';
import { NewProductDto } from './dto/new_product.dto';
import { UpdateNewProductDto } from './dto/update_new_product.dto';
import { CryptoService } from 'src/common/crypto_service.service';
type NewProductModel = {
    id: string;
    name: string;
    barcode: string;
    composition: string;
    image_url: string;
    image_path: string;
    inserted_date?: string | Date | null;
    updated_date?: string | Date | null;
    business?: string | null;
    country?: string | null;
    who_update?: string | null;
    who_send_firebase?: string | null;
    is_definitive_image?: boolean | null;
    isAlreadyInFireBase?: boolean | null;
};
export declare class NewProductsService {
    private readonly db;
    private readonly crypto;
    private readonly logger;
    constructor(db: Database, crypto: CryptoService);
    private col;
    private normalizeBarcode;
    create(data: NewProductDto): Promise<NewProductModel>;
    update(data: UpdateNewProductDto, id: string): Promise<boolean>;
    goManyToFireBase(ids: string[], whoSendToFirebase: string): Promise<boolean>;
    findAll(): Promise<NewProductModel[]>;
    findOne(id: string): Promise<NewProductModel | null>;
    findByAlreadyDataBase(): Promise<NewProductModel[]>;
    delete(id: string): Promise<{
        affected: number;
    }>;
}
export {};
