import { Module, Global } from '@nestjs/common';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

@Global()
@Module({
  providers: [
    {
      provide: 'RTDB',
      useFactory: async () => {
        const projectId = process.env.FIREBASE_PROJECT_ID!;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
        const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
        const databaseURL = process.env.FIREBASE_DB_URL!;

        const app = initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
          databaseURL,
        });

        return getDatabase(app);
      },
    },
  ],
  exports: ['RTDB'],
})
export class FirebaseModule {}