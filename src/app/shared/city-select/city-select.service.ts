import { Injectable } from '@angular/core';

export interface City {
    city: string,
    total: number
}

@Injectable()
export class CitySelectService {
    cities: Array<City> = [
   
    {city: 'Aurora, CO', total: 0},
    {city: 'Boulder, CO', total: 0}, 
    {city: 'Colorado Springs, CO', total: 0}, 
    {city: 'Denver, CO', total: 0},
    {city: 'Fort Collins, CO', total: 0},
    {city: 'Frisco, CO', total: 0},
    {city: 'Greenwood Villiage, CO', total: 0},
    {city: 'Lakewood, CO', total: 0},
    {city: 'Arlington, VA', total: 0},
    {city: 'Fairfax, VA', total: 0},
    {city: 'Leesburg, VA', total: 0},
    ];

    getCities = () => {
        return this.cities;
    }
}
