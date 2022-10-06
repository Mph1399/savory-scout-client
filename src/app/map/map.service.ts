import { Injectable } from "@angular/core";
import { Location } from "../shared/models/location.model";

export interface Marker {
    position: {lat: number, lng: number},
    title: string,
    label: {
      color: 'red',
      text: string,
    },
    info: Location,
    options: {}
  }

@Injectable()
export class MapService {
   
    createMarkersArray = (locations: Location[]) => {
        const markers: Marker[] = [];
        locations.forEach(location => {
            markers.push({
                position: {lat: location.lat!, lng: location.lng!}, 
                title: location.name,
                label: {color: 'red', text: location.address},
                info: location,
                options: { animation: google.maps.Animation.BOUNCE }  
            })
        });
        return markers;
    }


}