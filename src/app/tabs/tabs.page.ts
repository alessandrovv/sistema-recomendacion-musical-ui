import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PlayerService } from '../services/func/player.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  playerOpen = false;
  currentSong: any = null;

  constructor(
    private actionSheetController: ActionSheetController,
    private playerService: PlayerService,
  ) {}

  ngOnInit(){
    this.playerService.currentSong$.subscribe((song)=>{
      this.currentSong = song;
      console.log(song);
    });
  }

  // Select action
  async selectAction() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Add something',
          icon: 'wallet',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Change something',
          icon: 'swap-horizontal-outline',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Set something',
          icon: 'calculator',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }
}
