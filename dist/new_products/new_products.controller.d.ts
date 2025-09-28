import { NewProductDto } from './dto/new_product.dto';
import { NewProductsService } from './new_products.service';
import { UpdateNewProductDto } from './dto/update_new_product.dto';
import { GoManyToFirebaseDto } from './dto/go_many_to_firebase.dto';
export declare class NewProductsController {
    private readonly newProductsService;
    private readonly logger;
    constructor(newProductsService: NewProductsService);
    findAll(): Promise<{
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
    }[]>;
    ping(): {
        message: string;
    };
    findOne(id: string): Promise<{
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
    } | null>;
    create(data: NewProductDto): Promise<{
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
    }>;
    update(id: string, data: UpdateNewProductDto): Promise<{
        success: boolean;
    }>;
    goManyToFireBase(dto: GoManyToFirebaseDto): Promise<boolean>;
    delete(id: string): Promise<{
        affected: number;
    }>;
}
