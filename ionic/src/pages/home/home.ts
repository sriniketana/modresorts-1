import { Component, Renderer, NgZone } from '@angular/core';
import { App, NavController, ModalController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public dataStore: DataStore,
    public appCtrl: App,
    public ngZone: NgZone
  ) {
    
  }
}
//This is a dummy change. If you don't like it, delete it - you don't have to tell me about it too 
