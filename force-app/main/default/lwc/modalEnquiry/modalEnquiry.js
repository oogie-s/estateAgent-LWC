import { api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class ModalEnquiry extends LightningModal {
    handleOkay() {
        this.close('okay');
    }
}