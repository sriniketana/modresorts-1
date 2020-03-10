import { Component, Renderer, NgZone } from '@angular/core';
import { App, NavController, ModalController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    constructor(
        public navCtrl: NavController,
        public renderer: Renderer,
        public dataStore: DataStore,
        public appCtrl: App,
    ) { }

    username = this.dataStore.username;
    taskNumber = this.dataStore.taskNumber;

    logout() {
        var self = this;
        WLAuthorizationManager.logout('UserLogin').then(
            () => {
                WL.Logger.debug('logout onSuccess');
                self.appCtrl.getRootNav().push(LoginPage);
            },
            response => {
                WL.Logger.error('logout onFailure: ' + JSON.stringify(response));
            }
        );
    }
}
