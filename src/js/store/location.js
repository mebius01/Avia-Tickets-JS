import api from '../services/apiService';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ]);
        const [countries, cities] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        return response;
    }


    getCityCodeByKey(key) {
        return this.cities[key].code;
    }

    createShortCitiesList(citiesObj) {
        return Object.entries(citiesObj).reduce((acc, [key]) => {
            acc[key] = null;
            return acc;
        }, {})
    }

    serializeCountries(countries) {
        // {'contry_cod': { ... }}
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        // {cities name, country name: { ... }}
        return cities.reduce((acc, city) => {
            const contry_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const key = `${city_name},${contry_name}`;
            acc[key] = city;
            return acc
        }, {})
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        console.log(response);
    }
}

const locations = new Locations(api);

export default locations