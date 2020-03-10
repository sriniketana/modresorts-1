import { Component, Renderer, NgZone } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import WatsonChat from '../../componentScripts/chat';
import { Platform } from 'ionic-angular';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'page-chatbot',
    templateUrl: 'chatbot.html'
})
export class ChatbotPage {
    constructor(
        public navCtrl: NavController,
        public renderer: Renderer,
        public dataStore: DataStore,
        private zone: NgZone,
        private cdr: ChangeDetectorRef,
        public platform: Platform,
        public elem: ElementRef
    ) {
        this.watsonChat.init(
            this.url,
            this.iam_apikey,
            this.workspaceId,
            eval('this.shouldSendWatsonAssistantAnalytics')
        );
        platform.ready().then(() => {
            this.message();
        });
    }

    messages = [];
    input: any;
    watsonChat = new WatsonChat();
    pageTagName: any;
    username = (this.dataStore as any).username || 'USER';

    message() {
        this.watsonChat.sendMessage(this.messages, this.input, (err, msgs) => {
            this.zone.run(() => {
                this.messages = msgs;
                this.input = '';
            });
        });
        this.cdr.detectChanges();
    }

    ionViewDidLoad() {
        this.pageTagName = this.elem.nativeElement.tagName.toLowerCase();
        const scrollContentSelector = this.pageTagName + ' .scroll-content';
        const scrollElement: HTMLElement = document.querySelector(
            scrollContentSelector
        ) as HTMLElement;
        scrollElement.style.overflow = 'hidden';
    }

    // provide the url, iam api key and workspace id
    url = 'https://gateway-syd.watsonplatform.net/assistant/api';
    iam_apikey = 'T7lXyuaIGlZHoNDPy7LIqqk3DDodkiBdsbgCEMYfwZPz';
    workspaceId = '7029fb13-afd0-44b4-8f3c-cd84b148ec29';
    shouldSendWatsonAssistantAnalytics = true;
}
