import { LightningElement, wire, track, api } from 'lwc';

import getDefault from '@salesforce/apex/oneClickFieldUpdateController.getDefault';

import { getRecord, getFieldValue } from "lightning/uiRecordApi";

export default class OneClickFieldUpdate extends LightningElement {

    @api recordId;
    @api ObjectName;
    @api FieldName;

    @track SObjectData;

    connectedCallback(){
        this.getDefault();
    }

    getDefault(event){
        getDefault({ObjectName: this.ObjectName, FieldName: this.FieldName, recordId: this.recordId}).then(data =>{
            console.log(data);
            this.SObjectData = data;
        });
    }

    onClick(event){
        console.log(event.target.id);
    }

    // Depricate
    allowDrop(event){
        event.preventDefault();
        console.log('Here');
    }
}