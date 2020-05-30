import '../css/style.css';
import locations from './store/location';
import './plugins';
import formUi from './views/form';
import currencyUi from './views/currency';
import ticketsUi from './views/tickets'

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
        const currency = currencyUi.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });

        console.log(locations.lastSearch);
        ticketsUi.renderTickets(locations.lastSearch)
    }
})