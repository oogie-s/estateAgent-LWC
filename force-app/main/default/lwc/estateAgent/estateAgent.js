import { LightningElement, wire, track } from 'lwc';
import getAllProperties from '@salesforce/apex/PropertyControl.getAllProperties';
import propertyDetailsTemplate from './propertyDetailsTemplate.html'
import defaultTemplate from './estateAgent.html'
import modalEnquiry from 'c/modalEnquiry';

export default class estateAgent extends LightningElement {
    @track properties = [];
    @track propertyTabs = []
    @track propertyToView;

    @wire(getAllProperties)
    processProperties({ error, data})
    {
        if (data)
        {
            this.properties = data;
            this.properties = this.properties.reduce(function(saleTypes, property) {
                const saleType = property.Sold__c ? 'Sold' : property.Sale_Type__c;
                saleTypes[saleType] = saleTypes[saleType] || [];
                saleTypes[saleType].push(property);
                return saleTypes;
            }, {});

            this.propertyTabs.push({ Id: 1, Name: 'Sale', Properties: this.properties.Sale});
            this.propertyTabs.push({ Id: 2, Name: 'Rent', Properties: this.properties.Rent});
            this.propertyTabs.push({ Id: 3, Name: 'Sold', Properties: this.properties.Sold});
            this.properties = [];
        }
        else if (error)
        {
            console.log(error);
        }
    }
    
    showDetails = false;

    render() {
        return this.showDetails ? propertyDetailsTemplate : defaultTemplate;
    }

    switchPropertyDetail(event){ 
        this.showDetails = !this.showDetails; 

        if (this.showDetails) {
            var propertyId = event.currentTarget.dataset.id;
            var propertyTabId = event.currentTarget.dataset.tabId;

            this.propertyToView = this.propertyTabs.find(n => n.Id == propertyTabId).Properties.find(n => n.Id == propertyId);
        }
    }

    handleClick() {
        modalEnquiry.open({
            size: 'small'
        })
    }

}
