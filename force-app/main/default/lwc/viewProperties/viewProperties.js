import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getListofProperties from '@salesforce/apex/PropertyController.getListofProperties';
import getListofSoldProperties from '@salesforce/apex/PropertyController.getListofSoldProperties';

export default class ViewProperties extends NavigationMixin(LightningElement) {
    renderedCallback() {
        this.setTextHeights();
    }
    
    connectedCallback() {
        this.setTextHeights();
    }

    tabActivated() {
        this.setTextHeights();
    }

    async setTextHeights() {
        await Promise.resolve();
        let images = this.template.querySelectorAll('img');
        let texts = this.template.querySelectorAll('div.textContainer');
        images.forEach(function (image) {
            let imgHeight = image.getBoundingClientRect().height;
            if (imgHeight > 0)
            {
                let propertyId = image.dataset.id;
                texts.forEach(function (text) {
                    if (text.dataset.id == propertyId)
                    {
                        text.style = 'overflow: auto; max-height:' + imgHeight + 'px;';
                    }
                });                
            }
        });
    }

    @wire(getListofProperties, {sale_type: 'Sale', sold: false}) saleProperties;
    @wire(getListofProperties, {sale_type: 'Rent', sold: false}) rentProperties;
    @wire(getListofSoldProperties) soldProperties;

    viewProperty(event) {

        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: { componentName: 'c__ViewPropertyAura' },
             state: { c__propertyID: event.currentTarget.dataset.id}
        });
    }

    
}
