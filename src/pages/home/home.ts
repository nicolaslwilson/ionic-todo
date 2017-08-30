import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;

  constructor(
    public dataService: DataProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController) {

      this.dataService.getData()
        .then((todos) => {

          if(todos) {
            this.items = JSON.parse(todos);
          }

        })
    }

  ionViewDidLoad() {

    this.items = [
      {title: 'hi1', description: 'test1'},
      {title: 'hi2', description: 'test2'},
      {title: 'hi3', description: 'test3'},
    ]
  }

  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if(item) {
        this.saveItem(item);
      }
    })

    addModal.present();

  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
