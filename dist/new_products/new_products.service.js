"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NewProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProductsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_service_service_1 = require("../common/crypto_service.service");
let NewProductsService = NewProductsService_1 = class NewProductsService {
    db;
    crypto;
    logger = new common_1.Logger(NewProductsService_1.name);
    constructor(db, crypto) {
        this.db = db;
        this.crypto = crypto;
    }
    col() {
        return this.db.ref('new_products');
    }
    normalizeBarcode(barcode) {
        const underlineIndex = barcode.indexOf('_');
        return underlineIndex !== -1 ? barcode.slice(0, underlineIndex) : barcode;
    }
    async create(data) {
        const { barcode, composition, image_url, inserted_date } = data;
        if (!barcode || !composition || !image_url) {
            throw new common_1.BadRequestException('barcode, composition and image_url are required');
        }
        const encrypted = this.crypto.encrypt(image_url);
        const barcodeWithoutExt = this.normalizeBarcode(barcode);
        const id = this.col().push().key;
        const model = {
            id,
            name: '',
            barcode: barcodeWithoutExt,
            composition,
            image_url: encrypted,
            image_path: barcode,
            inserted_date: inserted_date ?? null,
            isAlreadyInFireBase: false,
        };
        await this.col().child(id).set(model);
        return model;
    }
    async update(data, id) {
        if (!data)
            throw new common_1.BadRequestException('Data to update is required');
        try {
            const patch = {};
            if (data.name !== undefined)
                patch.name = data.name;
            if (data.composition !== undefined)
                patch.composition = data.composition;
            if (data.image_url !== undefined)
                patch.image_url = data.image_url;
            if (data.barcode !== undefined)
                patch.barcode = this.normalizeBarcode(data.barcode);
            if (data.business !== undefined)
                patch.business = data.business;
            if (data.country !== undefined)
                patch.country = data.country;
            if (data.inserted_date !== undefined)
                patch.inserted_date = data.inserted_date;
            if (data.updated_date !== undefined)
                patch.updated_date = data.updated_date ?? new Date().toISOString();
            if (data.who_update !== undefined)
                patch.who_update = data.who_update;
            if (data.who_send_firebase !== undefined)
                patch.who_send_firebase = data.who_send_firebase;
            if (data.is_definitive_image !== undefined)
                patch.is_definitive_image = data.is_definitive_image;
            if (data.image_path !== undefined)
                patch.image_path = data.image_path;
            const exists = (await this.col().child(id).get()).exists();
            if (!exists)
                throw new common_1.BadRequestException(`Product ${id} not found`);
            await this.col().child(id).update(patch);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to update product ${id}`, error?.stack || String(error));
            return false;
        }
    }
    async goManyToFireBase(ids, whoSendToFirebase) {
        if (!ids || ids.length < 1) {
            throw new common_1.BadRequestException('ids to send to FireBase are required');
        }
        try {
            const updates = {};
            for (const id of ids) {
                updates[`new_products/${id}/isAlreadyInFireBase`] = true;
                updates[`new_products/${id}/who_send_firebase`] = whoSendToFirebase;
            }
            await this.db.ref().update(updates);
            return true;
        }
        catch {
            return false;
        }
    }
    async findAll() {
        const snap = await this.col().get();
        if (!snap.exists())
            return [];
        const obj = snap.val();
        return Object.values(obj);
    }
    async findOne(id) {
        const snap = await this.col().child(id).get();
        return snap.exists() ? snap.val() : null;
    }
    async findByAlreadyDataBase() {
        const q = await this.col().orderByChild('isAlreadyInFireBase').equalTo(true).get();
        if (!q.exists())
            return [];
        const obj = q.val();
        return Object.values(obj);
    }
    async delete(id) {
        await this.col().child(id).remove();
        return { affected: 1 };
    }
};
exports.NewProductsService = NewProductsService;
exports.NewProductsService = NewProductsService = NewProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RTDB')),
    __metadata("design:paramtypes", [Object, crypto_service_service_1.CryptoService])
], NewProductsService);
//# sourceMappingURL=new_products.service.js.map