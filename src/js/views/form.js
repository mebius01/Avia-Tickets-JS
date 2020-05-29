import {
    getAutocompleteInstance,
    getDatepickerInstance
} from '../plugins/materialize';

class FormUi {
    constructor(autocompleteInstance, datepickerInstance) {
        this._form = document.forms['locationControl'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');

        this.originAutocomplite = autocompleteInstance(this.origin);
        this.destinationAutocomplite = autocompleteInstance(this.destination);
        this.departDatePiker = datepickerInstance(this.depart);
        this.returnDatePiker = datepickerInstance(this.return);
    }

    get originValue() {
        return this.origin.value;
    }
    get destinationValue() {
        return this.destination.value;
    }
    get departDateValue() {
        return this.departDatePiker.toString();
    }
    get returnDateValue() {
        return this.returnDatePiker.toString();
    }

    get form() {
        return this._form;
    }

    setAutocompliteData(data) {
        this.originAutocomplite.updateData(data);
        this.destinationAutocomplite.updateData(data);
    }
}

const formUi = new FormUi(getAutocompleteInstance, getDatepickerInstance);

export default formUi;