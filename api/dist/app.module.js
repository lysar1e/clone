"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const products_model_1 = require("./products/products.model");
const auth_module_1 = require("./auth/auth.module");
const user_model_1 = require("./auth/user.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            products_module_1.ProductsModule,
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: "ec2-52-211-158-144.eu-west-1.compute.amazonaws.com",
                port: 5432,
                username: "migkakjbqnvdfh",
                password: "4e4a38d27f7def94c00671e16f4735c38950804fb5a649f000c0939c9382cc68",
                database: "de0aualmrml6cs",
                models: [products_model_1.Product, user_model_1.User],
                autoLoadModels: true,
                dialectOptions: {
                    ssl: { rejectUnauthorized: false },
                },
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map