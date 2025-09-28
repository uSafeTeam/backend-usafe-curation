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
var NewProductsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProductsController = void 0;
const common_1 = require("@nestjs/common");
const new_product_dto_1 = require("./dto/new_product.dto");
const new_products_service_1 = require("./new_products.service");
const update_new_product_dto_1 = require("./dto/update_new_product.dto");
const go_many_to_firebase_dto_1 = require("./dto/go_many_to_firebase.dto");
let NewProductsController = NewProductsController_1 = class NewProductsController {
    newProductsService;
    logger = new common_1.Logger(NewProductsController_1.name);
    constructor(newProductsService) {
        this.newProductsService = newProductsService;
    }
    findAll() {
        try {
            return this.newProductsService.findAll();
        }
        catch (error) {
            this.logger.error('Failed to retrieve products', error.stack);
            throw new common_1.InternalServerErrorException('Erro ao buscar produtos');
        }
    }
    ping() {
        return { message: 'pong' };
    }
    findOne(id) {
        return this.newProductsService.findOne(id);
    }
    create(data) {
        return this.newProductsService.create(data);
    }
    async update(id, data) {
        try {
            const updated = await this.newProductsService.update(data, id);
            if (!updated) {
                throw new common_1.InternalServerErrorException(`Produto com id ${id} não encontrado`);
            }
            return { success: true };
        }
        catch (err) {
            this.logger.error(`Failed to update product ${id}`, err.stack);
            throw new common_1.InternalServerErrorException('Erro ao atualizar produto');
        }
    }
    goManyToFireBase(dto) {
        this.logger.log(`Going to send products to Firebase ${dto.ids}`, dto.ids);
        this.logger.log(`Going to send products to Firebase ${dto.whoSendToFirebase}`, dto.whoSendToFirebase);
        return this.newProductsService.goManyToFireBase(dto.ids, dto.whoSendToFirebase);
    }
    delete(id) {
        return this.newProductsService.delete(id);
    }
};
exports.NewProductsController = NewProductsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewProductsController.prototype, "ping", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_product_dto_1.NewProductDto]),
    __metadata("design:returntype", void 0)
], NewProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_new_product_dto_1.UpdateNewProductDto]),
    __metadata("design:returntype", Promise)
], NewProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/goManyToFireBase'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [go_many_to_firebase_dto_1.GoManyToFirebaseDto]),
    __metadata("design:returntype", void 0)
], NewProductsController.prototype, "goManyToFireBase", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewProductsController.prototype, "delete", null);
exports.NewProductsController = NewProductsController = NewProductsController_1 = __decorate([
    (0, common_1.Controller)('/newProducts'),
    __metadata("design:paramtypes", [new_products_service_1.NewProductsService])
], NewProductsController);
//# sourceMappingURL=new_products.controller.js.map