"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("firebase-admin/app");
const database_1 = require("firebase-admin/database");
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: 'FIREBASE_APP',
                useFactory: () => {
                    const databaseURL = process.env.FIREBASE_DB_URL;
                    if (!databaseURL) {
                        throw new Error('FIREBASE_DB_URL não definida');
                    }
                    const projectId = process.env.FIREBASE_PROJECT_ID;
                    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
                    let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
                    if (privateKey.includes('\\n'))
                        privateKey = privateKey.replace(/\\n/g, '\n');
                    if ((0, app_1.getApps)().length === 0) {
                        if (projectId && clientEmail && privateKey) {
                            return (0, app_1.initializeApp)({
                                credential: (0, app_1.cert)({ projectId, clientEmail, privateKey }),
                                databaseURL,
                            });
                        }
                        else {
                            return (0, app_1.initializeApp)({
                                credential: (0, app_1.applicationDefault)(),
                                databaseURL,
                            });
                        }
                    }
                    return (0, app_1.getApps)()[0];
                },
            },
            {
                provide: 'RTDB',
                useFactory: (app) => {
                    return (0, database_1.getDatabase)(app);
                },
                inject: ['FIREBASE_APP'],
            },
        ],
        exports: ['RTDB', 'FIREBASE_APP'],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map