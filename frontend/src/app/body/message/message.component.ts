import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/data-service/message.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  closeResult: string;
  messageData = {};
  messageS = new Message();
  name: any;
  sentTime: any;
  sentName: any;
  recievedTime: any;
  recievedName: any;
  sendandrecieve: any;

  constructor(private modalService: NgbModal, private messageService: MessageService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getMessageByUserId();
  }

  getMessageByUserId(){
    let data = {
      userid: this.authService.getUserDetails()['_id']
    }
    this.messageService.getMessageId(data).subscribe(
      (res) => {
        this.messageData = res;
        console.log(this.messageData)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  
  sendMessage(){
    this.messageS.from = this.authService.getUserDetails()['_id']
    this.messageService.sendMessage(this.messageS).subscribe(
      (res) => {
        console.log(res)
        this.getMessageByUserId()
        this.modalService.dismissAll();
      },
      (err) => {
        console.log(err)
      }
    )
  }

  deleteMessage(){
    let data = {
      msgId: this.messageS.msgId
    }
    let conf = confirm("are you sure you want to delete this message")
    if(conf == true){
      this.messageService.deleteMessage(data).subscribe(
      () =>{
        this.getMessageByUserId()
        this.modalService.dismissAll()
      },
      err => {
        console.log(err)
      }
    )
    }else{
      console.log("canced")
    }
  }

  open(content, clickMsgId, recievedId) {
    this.messageS.msgId = clickMsgId;
    this.messageS.to = recievedId;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
