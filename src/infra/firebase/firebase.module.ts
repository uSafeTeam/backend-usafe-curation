// src/infra/firebase/firebase.module.ts
import { Module, Global } from '@nestjs/common';
import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getDatabase, Database } from 'firebase-admin/database';

@Global()
@Module({
  providers: [
    {
      provide: 'RTDB',
      useFactory: (): Database => {
        const databaseURL = process.env.FIREBASE_DB_URL;
        if (!databaseURL) {
          throw new Error('FIREBASE_DB_URL não definida');
        }

        const projectId   = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        let privateKey    = process.env.FIREBASE_PRIVATE_KEY || '';

        // Se vier com \n literais, converte; se já veio com quebras reais, isso é inofensivo
        if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');

        if (getApps().length === 0) {
          if (projectId && clientEmail && privateKey) {
            // Caminho 1: usar credenciais via env/Secret Manager
            initializeApp({
              credential: cert({ projectId, clientEmail, privateKey }),
              databaseURL,
            });
            console.log('[Firebase] init: cert(env) + DB_URL');
          } else {
            // Caminho 2: usar credencial padrão do Cloud Run (service account do serviço)
            initializeApp({
              credential: applicationDefault(),
              databaseURL,
            });
            console.log('[Firebase] init: applicationDefault() + DB_URL');
          }
        }

        // retorna a instância padrão do banco de dados
        return getDatabase();
      },
    },
  ],
  exports: ['RTDB'],
})
export class FirebaseModule {}