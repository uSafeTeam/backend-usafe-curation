// firebase.module.ts
import { Module, Global } from '@nestjs/common';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

@Global()
@Module({
  providers: [
    {
      provide: 'RTDB',
      useFactory: () => {
        const app = initializeApp({
          credential: applicationDefault(),
          databaseURL: process.env.FIREBASE_DB_URL!, // deixe só essa env
        });
        return getDatabase(app);
      },
    },
  ],
  exports: ['RTDB'],
})
export class FirebaseModule {}