import { Injectable } from '@angular/core';

export interface City {
    city: string,
    total: number
}

@Injectable()
export class CitySelectService {
    cities: Array<City> = [{city: 'Alexandria, VA', total: 0}, {city: 'Arlington, VA', total: 0}, {city: 'Ashburn, VA', total: 0}, {city: 'Centreville, VA', total: 0}, {city: 'Fairfax, VA', total: 0}, {city: 'Falls Church, VA', total: 0}, {city: 'Gainesville, VA', total: 0}, {city: 'Herndon, VA', total: 0}, {city: 'Leesburg, VA', total: 0}, {city: 'Manassas, VA', total: 0}, {city: 'Reston, VA', total: 0}, {city: 'Sterling, VA', total: 0}, {city: 'Washington, DC', total: 0}];

    getCities = () => {
        return this.cities;
    }
}
