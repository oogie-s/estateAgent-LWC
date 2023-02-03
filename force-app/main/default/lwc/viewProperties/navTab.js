// navTab.js
import { LightningElement, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class LWCSourceNavigation extends NavigationMixin(LightningElement) {
         
    handleLWCNavigate() {
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__Navigation"
            },
            state: {
                c__label: 1000
            }
        });
    }
         
}