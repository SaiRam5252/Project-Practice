import { LightningElement, api } from 'lwc';
import getContactsToPass from '@salesforce/apex/ContactController.getContactsToPass';

export default class DynamicValueViaAppBuilder extends LightningElement 
{
    @api pDoNotCall = false;
    @api pLimitVal = 2;
    data;

    connectedCallback()
    {
        this.getAllContacts();
    }
    getAllContacts()
    {
        getContactsToPass({bDoNotCall : this.pDoNotCall, limitVal : this.pLimitVal}).then(result => {
            window.console.log('Result >>> \n' +result);
            this.data = result;
        })
        .catch(error => {
            window.console.log('Error =====> \n' +JSON.stringify(error));
        })
    }
}