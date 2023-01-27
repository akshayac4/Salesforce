import { LightningElement, wire, track, api } from "lwc";

import getDefault from "@salesforce/apex/oneClickFieldUpdateController.getDefault";
import updateRecord from "@salesforce/apex/oneClickFieldUpdateController.updateRecord";

import { getRecord, getFieldValue } from "lightning/uiRecordApi";

export default class OneClickFieldUpdate extends LightningElement {
  @api recordId;
  @api ObjectName;
  @api FieldName;

  @track SObjectData;
  @track isLoading;

  connectedCallback() {
    this.getDefault();
    this.isLoading = true;
  }

  getDefault(event) {
    getDefault({
      ObjectName: this.ObjectName,
      FieldName: this.FieldName,
      recordId: this.recordId,
    }).then((data) => {
      console.log(data);
      this.SObjectData = data;
      this.updateRecordView();
      this.isLoading = false;
    });
  }

  onClick(event) {
    console.log(event.target.dataset.id);
    updateRecord({
      FieldName: this.FieldName,
      FieldValue: event.target.dataset.id,
      RecordId: this.recordId,
    }).then((data) => {
      this.getDefault();
    });
  }

  updateRecordView() {
    setTimeout(() => {
      eval("$A.get('e.force:refreshView').fire();");
    }, 1);
  }

  // Depricate
  allowDrop(event) {
    event.preventDefault();
    console.log("Here");
  }
}
