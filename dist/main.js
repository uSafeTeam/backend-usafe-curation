"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    const port = Number(process.env.PORT) || 8080;
    console.log('🚀 Boot iniciando | PORT=', process.env.PORT);
    await app.listen(port, '0.0.0.0');
    console.log(`✅ Server ouvindo em http://0.0.0.0:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map