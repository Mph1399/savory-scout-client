import { Injectable } from '@angular/core';

export interface City {
    city: string,
    total: number
}

@Injectable()
export class CitySelectService {
    cities: Array<City> = [{city: 'Colorado Springs, CO', total: 0}, {city: 'Denver, CO', total: 0} ];

    getCities = () => {
        return this.cities;
    }
}
