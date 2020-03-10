import { Component, Renderer, NgZone, NgModule } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import ChallengeHandler from '../../componentScripts/challengeHandler';
import { LiveUpdateProvider } from '../../providers/live-update/live-update';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-otplogin',
  templateUrl: 'otplogin.html'
})
@NgModule({
  providers: [LiveUpdateProvider]
})
export class OtploginPage {
  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public dataStore: DataStore,
    public liveUpdateService: LiveUpdateProvider,
    public alertCtrl: AlertController,
    public zone: NgZone
  ) {}
  private TwilioOTPChallengeHandler: WL.Client.SecurityCheckChallengeHandler;
  onSuccessPage: any = TabsPage;
  phoneNumber: string = '';
  securityCheck: string = 'TwilioOTP';

  registerChallengeHandler() {
    this.TwilioOTPChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(
      'TwilioOTP'
    );
    this.TwilioOTPChallengeHandler.handleChallenge = (challenge: any) => {
      console.log('--> TwilioOTPChallengeHandler.handleChallenge called');
      this.displayLoginChallenge(challenge);
    };
  }

  displayLoginChallenge(response) {
    if (response.errorMsg) {
      var msg = response.errorMsg;
      console.log('--> displayLoginChallenge ERROR: ' + msg);
    }
    let prompt = this.alertCtrl.create({
      title: msg,
      message: '',
      inputs: [
        {
          name: 'OTP',
          placeholder: 'Enter the verification code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.TwilioOTPChallengeHandler.cancel();
          }
        },
        {
          text: 'Verify',
          handler: data => {
            data.phoneNumber = response.phoneNumber;
            data.countryCode = response.countryCode;
            this.TwilioOTPChallengeHandler.submitChallengeAnswer(data);
          }
        }
      ]
    });
    prompt.present();
  }

  register() {
    this.registerChallengeHandler();
    let credentials = {
      phoneNumber: this.phoneNumber,
      countryCode: '1'
    };
    WLAuthorizationManager.login(this.securityCheck, credentials).then(
      () => {
        console.log('-->  Phone Number Registration: Success ');
        this.zone.run(() => {
          //   this.result = "Phone Number Successfully verifed";
          this.phoneNumber = '';

          this.navCtrl.push(this.onSuccessPage);
        });
      },
      function(error) {
        console.log('--> Phone Registration:  ERROR ', error.responseText);
        this.zone.run(() => {
          //   this.result = "Phone Number Verification Failed";
          this.phoneNumber = '';
        });
      }
    );
  }
}
