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
        const databaseURL = "https://usafe-v1-default-rtdb.firebaseio.com";
        if (!databaseURL) {
          throw new Error('FIREBASE_DB_URL não definida');
        }

        const projectId   = "usafe-v1";
        const clientEmail = "backendnestjs@usafe-v1.iam.gserviceaccount.com";
        let privateKey    = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCX0sBhdujxjTcW\nueeaPfh8S6c8Qp338+uUm5llLH2HjoHCsNLPzR2wT24g3aXziKDgDXpjM8zdoHgc\nH+FQKnZeuzq6lCAdGEU1gy5ljWoWGggtP4vfEPol4AASiJxnutzVOjDptBmaCeNf\nVJz3Rcr0+WcevBJgym0WCyt6RYEzrRoZbmlOmPDnqtQ+FwiTPMH0W0O4KKPiJdgM\n/mogLEejB3gEsALl9H7F4OUIJ/BeZgEAU3KDE+xDrblOs9/DlJ7Rj7V+NkTVh7q0\n9PDY/5/7dxwWNg75VowjoHtdFSTLwWUSRyJBWLfqB9eQmYEwbR9TITOzJUEp+ax6\nyndjRyyhAgMBAAECggEAHQmXduytv+lQ5H1Y8RSyLl+v1CQvn2ldINajv4iDV8Zn\nRgvYvhrOd1axywJph4sVrdSWGFwjbi4PWt20E8eTTSoFIQNMoxPtxL7axFyIMkL3\nVmQlhdvy5ASULvdG5sYED5oqGcCy9tW2UZjWzqpgF3uOAABbiXyd4Y3wWlnpzK6e\ntkwRpNDjJ6S1bX/Wc92rtrdC12DnmvjeCu8m3G9G+GUIulF15FjoAOzpZYlaqLjN\nQA5yKcAKKVq/navo3/PlkJaBU0SCk4K6skH3vQuam367LSWtRXaZtAJ9N7kz92XT\nwuxLR6jZ4kiCjHW3TMbaskK6sASRCM6D4KqG6vIXGwKBgQDWXrH1JYZWf45WjQJ2\nvlcKVokspdV+ZsIB1N/gQr3WPGGPcBlpxdfSclbbMk12qMlJmgqlGmnjFfUuub7N\n3UkFjlp4W3WIn2yjoPTFICL8UfCU0PhRWADZ2IKZgGiMG62uHftpmH9v/9dxKuLC\nGAW7I5fBHWgVaoBvLUit5gvXlwKBgQC1TpO68N2/VPzC7G+rlOhXDk3oP1/R0bDK\n8HBHMLS4/hQ5aPMH/SQCHoVtIthrOj543YN2+3R0zZazMiWymHSO04zwjUFYkwG1\npcAkjZubewOUK6SlmVTQmY9Z8DtAajEKLOtOs+Uv35oA+WRH314j1rSyGOzJmtKH\nHso1IerkhwKBgALAOlZkAeJQRrpTmul9Lc7DJ4V8J0408V5mpezRzm/WXIYjsR/L\nWyanMvgjIB1asyKPqH1P5nX0jS3pUkqAAXThy8Vpnwt+yD0dTqbM78X/IzA1skoQ\n8Anbnmlr3WuW21a1qclEHLaKOPCJ1VkaR9CL92GSCAjmUfmbQiiBIDvHAoGAX1ro\nT5WGyq5EEbCQOsmiOMcJKnDKUGvcc59pLcfsBK98q4UK7NSyL3sl6XQ+JocHfEHk\ndpthcF0AOVbShM+x3bxdj9Z6277VU1fNamwfvvI/u5oIih/Of7eDsWWrhAFVsWhW\niZoLm9YaBRElMLfFp0uw1UpOnumSeAY1iyQ/idkCgYEAy+NFL0Su9RYdItJTrtp7\nC8+PuZIdLjlEYC2ywkDl6U+sHfpXqLtEXa0ClzWLqk0Uo339XVmzA5w2ip2PD3HV\nMAalqaKgVK75j7Q8ztSYzXqWJRPfMfGj7Z9+H9RHtRoxSVoqJLYt2c2KPNtnJPZt\nA7GOPVyws0GfU4UkFSNjWJM=\n-----END PRIVATE KEY-----\n";

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