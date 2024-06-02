import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"littlelinguist-8f681","appId":"1:874882259141:web:616dacde6f1030ab17b8ac","storageBucket":"littlelinguist-8f681.appspot.com","apiKey":"AIzaSyCdmaBEkr5E77Ui3Ztrh9cfYf506_aUzRA","authDomain":"littlelinguist-8f681.firebaseapp.com","messagingSenderId":"874882259141","measurementId":"G-JFHBYZXGEE"})), provideFirestore(() => getFirestore())]
};
