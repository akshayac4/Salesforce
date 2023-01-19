import { LightningElement, wire, track } from 'lwc';
import getDefault from '@salesforce/apex/PaginationController.getDefault';
import saveContact from '@salesforce/apex/PaginationController.saveContact';
import searchContact from '@salesforce/apex/PaginationController.searchContact';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';




export default class Pagination extends LightningElement {
    
    @track contacts;
    // @track NewContacts;
    @track SearchFirstName;
    error;

    // @wire(getDefault)
    // WiredContacts({error,data}){
    //     if (data) { 
    //         console.log({data});
    //         this.contacts = data; 
    //         this.error = undefined;
    //     } else if (error) {
    //         this.error = error;
    //         this.contacts = undefined;
    //     }
    // }
    

    // INIT FUNCTION
    connectedCallback(){
        this.getDefaultData();
    }

    getDefaultData(event){
        getDefault({}).then(data=>{

            this.createListOfData(event,data);

        }).catch(error=>{
            console.log({error});
        });
    }

    // SAVE ALL RECORDS
    saveRecord(){
        console.log(this.contacts);
        saveContact({listt:this.contacts.childList}).then(data=>{
            this.showToastMsg();
        }).catch(error=>{
            console.log({error});
        });
    }

    
    searchFirstName(event){
        console.log(this.SearchFirstName);
        console.log(event.target.value);
        
        this.SearchFirstName = event.target.value;

        // REMOVE THIS METHOD FROM HERE AND MAKE IT A BUTTON CLICK
        if(this.SearchFirstName == '' ) this.getDefaultData();
        else this.searchRecord();
    }
    

    searchRecord(event){
        searchContact({firstName:this.SearchFirstName}).then(data=>{
            this.createListOfData(event,data);
        }).catch(error=>{
            alert('Something went Wrong!');
        });
        
    }
    
    onNameChange(event){
        
        const index = event.target.dataset.id;
        const field = event.target.name;
        console.table(JSON.stringify(this.contacts));
        
        
        if(field == 'FirstName'){
            var x = JSON.parse(JSON.stringify(this.contacts));
            x[index]['FirstName'] = event.target.value;
            console.log({x});
            this.contacts = x;
            // this.contacts[index]['FirstName'] = event.target.value;
            }else if(field == 'LastName'){
                this.contacts[index]['LastName'] = event.target.value;
            }else if(field == 'Email'){
                this.contacts[index]['Email'] = event.target.value;
            }else if(field == 'Phone'){
                this.contacts[index]['Phone'] = event.target.value;
            }
        
        // console.log('==>');
        // console.log(this.contacts.find(ele => ele.Id == event.target.dataset.id));
        
        // let ContactFirstName = this.contacts.find(ele => ele.Id == event.target.dataset.id);
        // console.log(ContactFirstName.FirstName);
        // console.log(event.target.value);
        
        // // this.contacts = [...this.contacts];
    }


    // THIS METHOD CREATES LIST FOR DATA AS FIELDS ARE AVAILABLE
    createListOfData(event, data){
        var options=[];
        var NewOptions=[];
        var globalkeys = new Set();
        
        
        data.forEach(element => {
            Object.keys(element).find(key => {
                globalkeys.add(key);
            });
        });

        /**************************************************************************************************/

        var childList1 = [];
        data.forEach(ele =>{
            
            globalkeys.forEach(globKey => {
                childList1.push({label: globKey,value:ele[globKey]});
            });

            NewOptions.push({label: ele['Id'],value: childList1});
            childList1 = [];
        });

        console.log('{NewOptions} ====>');
        console.log({NewOptions});
        
        this.contacts = NewOptions;
    }
    
    showToastMsg() {
        const event = new ShowToastEvent({
            title: 'Success!',
            message: 'Data Saved Sucessfully!',
            // messageData: [
            //     'Salesforce',
            //     {
            //         url: 'http://www.salesforce.com/',
            //         label: 'here',
            //     },
            // ],
            variant : 'Success'
        });
        this.dispatchEvent(event);
    }
}