import { LightningElement,  wire, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import getProperty from '@salesforce/apex/PropertyController.getProperty';
import modalEnquiry from 'c/modalEnquiry';
 
export default class viewProperty extends NavigationMixin(LightningElement) {

    @track propertyDetails;

    @wire(CurrentPageReference)
        getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.propertyID = currentPageReference.state.c__propertyID;
        }
    }

    @wire(getProperty, {propertyId: '$propertyID'}) propertyDetails;

    handleClick() {
        modalEnquiry.open({
            size: 'small'
        })
      }

    goBack() {
        let cmpDef = {
            componentDef: "c.viewProperties"
        };

        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedDef
            }
        });
    }
}