import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-confirm-package',
  templateUrl: './confirm-package.component.html',
  styleUrls: ['./confirm-package.component.css']
})
export class ConfirmPackageComponent implements OnInit {
  @Input() selectedPackage;
  @Input() renewalDate;
  @Input() id;
  errors:boolean = false;
  car:string = '';
  totalAmount = 0;
  constructor(
    private modalService:NgbModal, 
    private activeModal:NgbActiveModal,
    private commonService:CommonService,
    private toastyService:ToastyService
  ) { }

  ngOnInit() {
    
  }

  cancel(){
    this.activeModal.dismiss();
  }

  confirm(){
    if(this.car != ''){
      this.commonService.updateMembership(this.selectedPackage, this.id, this.totalAmount, this.car);
      this.activeModal.dismiss();
      this.toastyService.success('Your Package is updated');
    } else{
      this.errors = true;
    }
    
  }

  updateAmount(event){
    this.car = event;
    if(event == 'suv'){
      this.totalAmount = this.selectedPackage.suv;
    } else if(event == 'sedan'){
      this.totalAmount = this.selectedPackage.sedan;
    } else{
      this.totalAmount = this.selectedPackage.amount;
    }
  }

}
