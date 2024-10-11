import { LightningElement, track, api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class Lwc_TextBox extends LightningElement 
{
    @track _txtBoxVal = '';
    @api availableActions = [];

    @api
    get txtBoxVal()
    {
        return this._txtBoxVal;
    }

    set txtBoxVal(val)
    {
        this._txtBoxVal = val;
    }

    handleChange(event)
    {
        const elementName = event.target.name;
        const elementValue = event.target.value;

        if(elementName === 'msgToSend')
        {
            this._txtBoxVal = elementValue;
        }
    }

    handleClick(event)
    {
        const attributeChangeEvent = new FlowAttributeChangeEvent('txtBoxVal', this._txtBoxVal);
        this.dispatchEvent(attributeChangeEvent);
    }

    @api
    validate()
    {
        if(this._txtBoxVal.includes('oracle'))
        {
            return { isValid : true };
        }
        return{
            isValid : false,
            errorMessage : 'You cannot have string oracle in String'
        };
    }

    handleNext(event)
    {
        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }
}