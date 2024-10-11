import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import createAccount from '@salesforce/apex/QuickActionController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuickAccount extends LightningElement 
{
    name = '';
    phone = '';
    isSpinner = false;

    @api recordId;

    connectedCallback()
    {
        this.name = 'Sairam from Js';
        this.phone = '8797975487';
    }

    handleChange(event)
    {           
        event.preventDefault();
        const elementName = event.target.name;
        const elementValue = event.target.value;

        if(elementName === 'name')
        {
            this.name = elementValue;
        }
        else if(elementName === 'phone')
        {
            this.phone = elementValue;
        }
    }
    closeAction()
    {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleSave = event => {
        this.isSpinner = true;
        event.preventDefault();

        // Call an apex class
        createAccount({name : this.name, phone : this.phone, parentRecordId : this.recordId}).then(result => 
                                                                                        {
                                                                                            console.log('Result : \n', result);
                                                                                            

                                                                                            const successMessage = new ShowToastEvent({
                                                                                                                        title : 'success',
                                                                                                                        message : 'Record has been Created Successfully.',
                                                                                                                        variant : 'success',
                                                                                                                        mdoe : 'dismissable'
                                                                                            });

                                                                                            this.dispatchEvent(successMessage);
                                                                                            this.closeAction();

                                                                                        })
                                                                                        .catch(error => {
                                                                                            console.log('Error : \n', error);
                                                                                        })
                                                                                        .finally(() => {
                                                                                            this.isSpinner = false;
                                                                                        })
        
    }
}