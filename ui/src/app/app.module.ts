import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCSapwL6_QF2hcXbxRH14C6grFRVlypAvQ',
  authDomain: 'tribe-test-10024.firebaseapp.com',
  databaseURL: 'https://tribe-test-10024.firebaseio.com',
  projectId: 'tribe-test-10024',
  storageBucket: 'tribe-test-10024.appspot.com',
  messagingSenderId: '464787273469',
  appId: '1:464787273469:web:f404f38a6f7e453da67094',
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
