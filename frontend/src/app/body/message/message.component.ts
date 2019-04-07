import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/data-service/message.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';

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

  getMessageBtId(){

  }
  
  sendMessage(newMessage){
    for(let recived of this.messageData['recieved']){
      this.messageS.to = recived.from.id
    }
    for(let sent of this.messageData['sent']){
      this.messageS.from = sent.to.id
    }
    this.messageService.sendMessage(this.messageS).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  open(content) {
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
