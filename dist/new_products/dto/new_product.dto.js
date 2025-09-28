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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProductDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class NewProductDto {
    barcode;
    composition;
    image_url;
    inserted_date;
}
exports.NewProductDto = NewProductDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Barcode tem que ser uma string' }),
    __metadata("design:type", String)
], NewProductDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Composição tem que ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Composição não pode ser vazio' }),
    __metadata("design:type", String)
], NewProductDto.prototype, "composition", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'URL da imagem tem que ser uma string' }),
    __metadata("design:type", String)
], NewProductDto.prototype, "image_url", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], NewProductDto.prototype, "inserted_date", void 0);
//# sourceMappingURL=new_product.dto.js.map