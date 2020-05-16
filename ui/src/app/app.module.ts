import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire'
import en from '@angular/common/locales/en'
import { registerLocaleData } from '@angular/common'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SharedModule } from './shared.module'

registerLocaleData(en)

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
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
