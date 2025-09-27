// src/infra/firebase/firebase.module.ts
import { Module, Global } from '@nestjs/common';
import { initializeApp, applicationDefault, cert, getApps, App } from 'firebase-admin/app';
import { getDatabase, Database } from 'firebase-admin/database';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: (): App => {
        const databaseURL = process.env.FIREBASE_DB_URL;
        if (!databaseURL) {
          throw new Error('FIREBASE_DB_URL não definida');
        }

        const projectId   = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        let privateKey    = process.env.FIREBASE_PRIVATE_KEY || '';

        if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');

        if (getApps().length === 0) {
          if (projectId && clientEmail && privateKey) {
            return initializeApp({
              credential: cert({ projectId, clientEmail, privateKey }),
              databaseURL,
            });
          } else {
            return initializeApp({
              credential: applicationDefault(),
              databaseURL,
            });
          }
        }

        return getApps()[0]; // se já existe, retorna o default
      },
    },
    {
      provide: 'RTDB',
      useFactory: (app: App): Database => {
        return getDatabase(app);
      },
      inject: ['FIREBASE_APP'],
    },
  ],
  exports: ['RTDB', 'FIREBASE_APP'],
})
export class FirebaseModule {}