import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../data-service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // msg = new Message();
  // id = this.msg._id; 
  // to = this.msg.to;
  // from = this.msg.from;

  $msg = [];

  constructor(private messageService : MessageService) { }

  ngOnInit() {
  }

  
  getMessageById(msgId){
    this.messageService.getMessageId(msgId).subscribe(
      (result) =>{
        this.$msg= []
        this.$msg.push(...result);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getAllMessages(){
    this.messageService.getAllMessages().subscribe(
      (res) =>{
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
     )
  }

  

}
