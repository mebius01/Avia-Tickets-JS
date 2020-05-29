import '../css/style.css';
import locations from './store/location';
import './plugins';
import formUi from './views/form';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUi.form;

    // Events
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        onFormSubmit();
    })

    // Handlers
    async function initApp() {
        await locations.init();
        formUi.setAutocompliteData(locations.shortCitiesList);
    }
    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUi.originValue);
        const destination = locations.getCityCodeByKey(formUi.destinationValue);
        const depart_date = formUi.departDateValue;
        const return_date = formUi.returnDateValue;

        console.log(origin, destination, depart_date, return_date);
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date
        })

    }
})