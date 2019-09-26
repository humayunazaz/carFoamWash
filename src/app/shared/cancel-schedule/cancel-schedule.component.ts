import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-cancel-schedule',
  templateUrl: './cancel-schedule.component.html',
  styleUrls: ['./cancel-schedule.component.css']
})
export class CancelScheduleComponent implements OnInit {
  @Input() wash;
  @Input() id;
  @Input() userPackage;
  constructor(
    private modalService:NgbModal, 
    private activeModal:NgbActiveModal,
    private commonService:CommonService
  ) { }

  ngOnInit() {
  }

  confirm(){
    this.commonService.cancelMembership(this.id, this.wash, this.userPackage).then(() => {
      this.activeModal.dismiss();
    });
  }

  cancel(){
    this.activeModal.dismiss();
  }
}
