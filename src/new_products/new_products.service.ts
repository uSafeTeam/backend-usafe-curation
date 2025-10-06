// src/new_products/new_products.service.ts
import {
  Injectable,
  Logger,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Database } from 'firebase-admin/database';
import { NewProductDto } from './dto/new_product.dto';
import { CryptoService } from '../common/crypto_service.service';
import { UpdateNewProductDto } from './dto/update_new_product.dto';

type NewProductModel = {
  name: string;
  barcode: string;
  composition: string;
  image_url: string; // encrypted
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

@Injectable()
export class NewProductsService {
  private readonly logger = new Logger(NewProductsService.name);

  constructor(
    @Inject('RTDB') private readonly db: Database,
    private readonly crypto: CryptoService,
  ) {}

  private col() {
    return this.db.ref('new_products');
  }

  private normalizeBarcode(barcode: string) {
    const underlineIndex = barcode.indexOf('_');
    return underlineIndex !== -1 ? barcode.slice(0, underlineIndex) : barcode;
  }

  async create(data: NewProductDto) {
    const { barcode, composition, image_url, inserted_date } = data;
    if (!barcode || !composition || !image_url) {
      throw new BadRequestException(
        'barcode, composition and image_url are required',
      );
    }

    const encrypted = this.crypto.encrypt(image_url);
    const barcodeWithoutExt = this.normalizeBarcode(barcode);

    const id = barcodeWithoutExt;
    const model: NewProductModel = {
      name: '',
      barcode: id,
      composition,
      image_url: encrypted,
      image_path: barcode, // mantém original
      inserted_date: inserted_date ?? null,
      isAlreadyInFireBase: false,
    };

    await this.col().child(id).set(model);
    return model;
  }

  async update(data: UpdateNewProductDto, id: string) {
    if (!data) throw new BadRequestException('Data to update is required');

    try {
      const patch: Partial<NewProductModel> = {};

      if (data.name !== undefined) patch.name = data.name;
      if (data.composition !== undefined) patch.composition = data.composition;
      if (data.image_url !== undefined) patch.image_url = data.image_url; // já traga criptografado se quiser
      if (data.barcode !== undefined)
        patch.barcode = this.normalizeBarcode(data.barcode);
      if (data.business !== undefined) patch.business = data.business;
      if (data.country !== undefined) patch.country = data.country;
      if (data.inserted_date !== undefined)
        patch.inserted_date = data.inserted_date;
      if (data.updated_date !== undefined)
        patch.updated_date = data.updated_date ?? new Date().toISOString();
      if (data.who_update !== undefined) patch.who_update = data.who_update;
      if (data.who_send_firebase !== undefined)
        patch.who_send_firebase = data.who_send_firebase;
      if (data.is_definitive_image !== undefined)
        patch.is_definitive_image = data.is_definitive_image;
      if (data.image_path !== undefined) patch.image_path = data.image_path;

      // valida existência
      const exists = (await this.col().child(id).get()).exists();
      if (!exists) throw new BadRequestException(`Product ${id} not found`);

      await this.col().child(id).update(patch);
      return true;
    } catch (error: any) {
      this.logger.error(
        `Failed to update product ${id}`,
        error?.stack || String(error),
      );
      return false;
    }
  }

  async goManyToFireBase(
    ids: string[],
    whoSendToFirebase: string,
  ): Promise<boolean> {
    if (!ids || ids.length < 1) {
      throw new BadRequestException('ids to send to FireBase are required');
    }
    try {
      const updates: Record<string, any> = {};
      for (const id of ids) {
        updates[`new_products/${id}/isAlreadyInFireBase`] = true;
        updates[`new_products/${id}/who_send_firebase`] = whoSendToFirebase;
      }
      await this.db.ref().update(updates);
      return true;
    } catch {
      return false;
    }
  }

  async findAll() {
    const snap = await this.col().get();
    if (!snap.exists()) return [];
    const obj = snap.val() as Record<string, NewProductModel>;
    return Object.values(obj);
  }

  async findOne(id: string) {
    const snap = await this.col().child(id).get();
    return snap.exists() ? (snap.val() as NewProductModel) : null;
  }

  async findByAlreadyDataBase() {
    // query: ... where isAlreadyInFireBase == true
    const q = await this.col()
      .orderByChild('isAlreadyInFireBase')
      .equalTo(true)
      .get();
    if (!q.exists()) return [];
    const obj = q.val() as Record<string, NewProductModel>;
    return Object.values(obj);
  }

  async delete(id: string) {
    await this.col().child(id).remove();
    return { affected: 1 }; // para manter interface parecida
  }
}
