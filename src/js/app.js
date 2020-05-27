import locations from './store/location';

locations.init().then(res => {
    console.log(res);
    console.log(locations);
})