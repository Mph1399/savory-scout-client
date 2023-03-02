import { Subscription } from 'rxjs';
import { Special } from './../models/special.model';
import { FilterState, } from '../dialogs/search-filter/store/search-filter.reducers';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '../models/location.model';
import * as moment from 'moment'
import * as SearchFilterSelectors from '../dialogs/search-filter/store/search-filter.selectors';
import { initialState } from '../dialogs/search-filter/store/search-filter.reducers';
import getDistance from 'geolib/es/getDistance';
import convertDistance from 'geolib/es/convertDistance';
import { GeolocationService } from './geolocation.service';

@Injectable()
export class DisplayLocationsService implements OnDestroy {
  userLat = 0;
  userLng = 0;
  searchLat = 0;
  searchLng = 0;
  searchCoords$: Subscription;
  userCoords$: Subscription;
  categories = ['food', 'drinks', 'events'];
  dateTypes = ['recurringSpecials', 'specificDateSpecials'];
  todaysDate = moment().format('MMMM Do YYYY');
  dayOfTheWeek = moment().format('ddd');
  searchFilter: FilterState = initialState;
  secondaryCategories = [
    'breakfast',
    'lunch',
    'dinner',
    'happyHour',
    'brunch',
    'kids',
  ];
  secondaryFeatures = ['outdoorSeating'];
  searchFilter$ = this.store
    .select(SearchFilterSelectors.getFilterState)
    .subscribe((filterState) => (this.searchFilter = filterState));

  constructor(private geoService: GeolocationService, private store: Store) {
    this.searchCoords$ = this.geoService.searchCoords.subscribe((coords) => {
      this.searchLat = coords.location.lat;
      this.searchLng = coords.location.lng;
    });
    this.userCoords$ = this.geoService.userCoords.subscribe((coords) => {
      this.userLat = coords.location.lat;
      this.userLng = coords.location.lng;
    });
  }

  filterLocationResults = (locations: Location[]) => {
    // console.log('Filters: ', this.searchFilter.filters);
    // console.log('locations AT BEGINNING FILTER LOC: ', locations);
    locations = JSON.parse(JSON.stringify(locations));
    /* The locations are meant to be retrieved from the DB once and filter changes will just change the display. 
    Use a display boolean as the ultimate decider on whether or not to display the location.
    Use Active on on the location to show that the location has at least one active special.
    Use Active on the category and individual Special to trace the special for display
    */

    /* Group the specials that have matching times,categories, days/date so that they can be displayed as a group un the search results */
    locations.forEach((location, index) => {
      // console.log('lat:', this.lat, 'lng:', this.lng, 'lat:', location.lat as number, 'lng:', location.lng as number)
      /* we only want to add a distance, display bool and group the specials according to matching criteria once after the initial database pull */
      if (!locations[index].distance) {
        /*  Assign a distance to each location. This distance will later be used for displaying the special depending on the filter radius.  */
        locations[index].distance = convertDistance(
          getDistance(
            { lat: this.userLat, lon: this.userLng },
            { lat: location.lat as number, lon: location.lng as number }
          ),
          'mi'
        );
        // console.log(convertDistance( locations[index].distance as number, 'mi'));

        locations[index] = this.groupSpecialsWithMatchingCriteria(location);
        /* Add a bool to the location with the name of display. Set it to false. Display will be the main determiner of showing the location */
        locations[index].display = false;
      }
    });
    /* Filter out locations according to the three main categories selected in the filter. i.e Food, drinks, events */

    /* Now we have locations array that just contains locations that offer a special on one of the selected main categories. Next we
    need to determine if the "Active filter is selected. If so, run the locations array through a method that returns the location only
    if one of the specials is currently happening." */
    // console.log('Locations b4 filter: ', locations)

    return this.displaySelectedCategories(locations);
  };

  displaySelectedCategories = (locations: Location[]): Location[] => {
    const locationsWithSelectedCategories: Location[] = JSON.parse(
      JSON.stringify(locations)
    );

    /*  Check to see if the location has specials that meet the filter crieria first. I.e it has Drink specials if that's selected. */
    locations.forEach((location, index) => {
     // console.log(locationsWithSelectedCategories[index].name.toUpperCase())
      /* Reset the active and display status of the currently saved location before filtering */
      locationsWithSelectedCategories[index].active = false;
      locationsWithSelectedCategories[index].display = false;
      // console.log(locationsWithSelectedCategories[index])
      /* Loop through the main categories i.e Food, Drinks, Events */
      this.categories.forEach((category) => {
        //  console.log(locationsWithSelectedCategories[index])
        /* 
        Reset the active status of the currently saved location category before filtering 
        */
        locationsWithSelectedCategories[index][category].active = false;
        locationsWithSelectedCategories[index][category].display = false;
        // console.log(locationsWithSelectedCategories[index]) stop
      // console.log(`Category: ${category}`,this.searchFilter.filters[category])
        /* 
        If the current category is selected in the search filter, proceed with discovering if that category has any specials.
        */
        if (this.searchFilter.filters[category]) {
          /* 
           Loop through each date type (recurring & specific) to see if specials exist.
          */
          this.dateTypes.forEach((dateType) => {
           //   console.log(locationsWithSelectedCategories[index])
            /* 
            If the location category( i.e food) has specials in the array of it's dateType (i.e recurringSpecials or specificDateSpecials), then proceed
            */
            if (location[category as keyof typeof location]![dateType as keyof typeof location].length > 0) {
              /* 
               This location offers specials in a main category that is currently selected in the main search filter. 
               Check if that category has a special that is currently active, if Active is currently selected in the main search filter, by sending it to a helper function. 
               */
              if (this.searchFilter.filters.active) {
               // console.log('Locations ACTIVE: ', locationsWithSelectedCategories[index])
                /* 
               The search filter has the "Active" filter selected so we only want to display specials that are currently happening. 
               Use the displayLocationWithActiveSpecials method to return an object {specials: Specials, active: boolean} Each special will now have been sorted by
               it's "Active status" and the active and display booleans for that special will be set to true if the special is happening now. Active bool on in the 
               returned object will be set to true if one of the specials turned out to be active so that we know to display the whole category as active in the html.
               */
                let activeFilteredSpecials = this.determineIfHasActiveSpecials( location[category][dateType], category, dateType);

                /* 
                If one of the specials turns out to be active, mark the location and the location category as active: true. 
                displayLocationWithActiveSpecials will return an active:true boolean in the object if any specials turned out to be active 
                */

                activeFilteredSpecials.active ? (locationsWithSelectedCategories[index].active = true)  : '';
                activeFilteredSpecials.active ? (locationsWithSelectedCategories[index][category].active = true)  : '';
                
                /* 
                Secondary categories that can be selected in the search filter (Happy Hour, Brunch etc) have to be filtered. This will return an object 
                containing the specials array and display:true boolean if and of the specials have a matching selected category.  
                */
                const secondaryCategoryFilteredSpecials = this.filterSecondaryCategories(activeFilteredSpecials.specials);
                /* 
                If one of the specials is set to display = true, set the category and location to display = true;
                */
               // secondaryCategoryFilteredSpecials.display ? console.log('Setting category and location to true')  : console.log('False finding for', locationsWithSelectedCategories[index].name);
                secondaryCategoryFilteredSpecials.display ? (locationsWithSelectedCategories[index].display = true)  : '';
                secondaryCategoryFilteredSpecials.display ? (locationsWithSelectedCategories[index][category].display = true)  : '';

                locationsWithSelectedCategories[index][category][dateType] =  secondaryCategoryFilteredSpecials.specials;
                
                                                                  //  console.log(locationsWithSelectedCategories[index])
              } else {
                                                                  //  console.log(locationsWithSelectedCategories[index])
                /* 
                Active isn't selected but the filter found that specials exist in the current main category. 
                This means we're going to display all locations by setting the location.display to true 
                */
                                                                  // locationsWithSelectedCategories[index].active = true;
                                                                    // locationsWithSelectedCategories[index][category].active = true;
                locationsWithSelectedCategories[index].display = true;
                locationsWithSelectedCategories[index][category].display = true;
                // SHould probably set all location specials to display true
                locationsWithSelectedCategories[index][category][
                  dateType
                ].color = 'gray';
                                                                // location[category].active = true;
                                                                // locationsWithSelectedCategories[index][category][dateType] = location[category][dateType];
              }
       
            
            }
          });
        } else {
                                              //  console.log(locationsWithSelectedCategories[index])
                                              // console.log(category + ' Is inactive')
          /* 
          The current category isn't selected in the filter. Just set the location category of the locationsWithSelectedCategories to Active = false  
          */
          locationsWithSelectedCategories[index][category].active = false;
          locationsWithSelectedCategories[index][category].display = false;
          /* Set each special contained in the deselected category to inactive  */
          this.dateTypes.forEach((dateType) =>
            location[category][dateType].forEach((special, k) => {
              locationsWithSelectedCategories[index][category][dateType][
                k
              ].active = false;
              locationsWithSelectedCategories[index][category][dateType][
                k
              ].display = false;
            })
          );
          /// filteredSelectedMainCategories[index] = location;
          //   locationsWithSelectedCategories[index][category].display ? locationsWithSelectedCategories[index][category].display = this.checkForPositiveCategoryDisplay(locationsWithSelectedCategories[index], category) : '';
        }

        /* end of forEeach category */
      });
      //  console.log(locationsWithSelectedCategories[index])
      /* If the category was set to dispay through the filter process, use the filter secondary categories  */
      //  locationsWithSelectedCategories[index].display  ? locationsWithSelectedCategories[index] = this.filterSecondaryCategories(locationsWithSelectedCategories[index]) : '';
      //  console.log(locationsWithSelectedCategories[index])
      /* After the location has been filtered by secondary filters, make sure that at least 1 special is set to display. If not, set the location to display = false */
      //    locationsWithSelectedCategories[index].display  ? locationsWithSelectedCategories[index] = this.checkForPositiveDisplay(locationsWithSelectedCategories[index]) : '';
      /* If the locations distance is outside of the search radius, set its display to false */
      //  console.log(locationsWithSelectedCategories[index])
      const searchDistance = convertDistance(
        getDistance(
          { lat: this.searchLat, lon: this.searchLng },
          { lat: location.lat as number, lon: location.lng as number }
        ),
        'mi'
      );
      searchDistance > this.searchFilter.filters.radius ? (locationsWithSelectedCategories[index].display = false) : '';
    });
    return locationsWithSelectedCategories;
  };

  determineIfHasActiveSpecials = (specials: Special[], category, dateType) => {
    // let tempLocation: Location = location;
    /* 
    For recurring specials, We will first check that the day of the week matches. Then, we will compare the start and end times with the current times  
    */
    specials = JSON.parse(JSON.stringify(specials));
    let tempSpecials: Special[] = specials;
    let active = false;

    specials.forEach((special, i) => {
      //  location[category][dateType].forEach((special: Special, index) => {
      /* 
      reset the active from previous filter setting/search 
      */
      special.active = false;
      special.display = false;
      special.color = 'gray';
      /* 
      For each special, Check if the day of the week for the special matches today in the case of a recurring special.
      If the special is on a specific date, check to see if that date is Todays date. Proceed if a match is found.
      */
      if (
        (dateType == 'recurringSpecials' &&
          special.days!.indexOf(this.dayOfTheWeek) != -1) ||
        (dateType === 'specificDateSpecials' &&
          special.date === this.todaysDate)
      ) {
        /* 
        A match was found for either the current day or date. Send the special to determine if the time of the special is currently active.
        The whole special will be returned. If it is active, the active and display bools will be set to true.   
        */
        tempSpecials[i] = this.determineIfSpecialTimeIsActive(special);
        /* 
        If one of the specials is active, we need to set the whole location as active. Set a var to true and send it to parent method 
        */
        // tempSpecials[i].active ? console.log( tempSpecials[i]) : '';
        tempSpecials[i].active ? (active = true) : '';
      }
      //   });
    });
    return { specials: tempSpecials, active };
    /* dayMatch and date match arrays now contain the specials that are matching todays day or date. 
     Now we need to check if those specials match up with the current time so we can mark them as active
     using a helper function. */
    // console.log('day Match: ', dayMatch, ' Date Match: ', dateMatch )
  };

  // checkForPositiveCategoryDisplay = (location, category) => {
  //   let display = false;
  //     this.dateTypes.forEach(dateType => {
  //       location[category][dateType].forEach(special => {
  //        // console.log(special.display)
  //         special.display ? display = true : ''
  //       })
  //   })
  //   return display;
  //  }
  checkForPositiveDisplay = (location) => {
    //  console.log(location)
    this.categories.forEach((category) => {
      this.dateTypes.forEach((dateType) => {
        location[category][dateType].forEach((special) => {
          // console.log(special.display)
          special.display ? (location.display = true) : '';
          special.display ? (location[category] = true) : '';
        });
      });
    });
    return location;
  };

  determineIfSpecialTimeIsActive = (special) => {
    /*  In order for a special to be active, the start difference should be a negative number and the end should be positive for most cases. */
    const now = moment(moment().format('hh:mmA'), 'hh:mmA');
    const start = moment(special.start, 'hh:mmA');
    const end = moment(special.end, 'hh:mmA');
    /* If the end is after midnight, add a day to adjust for ending on the next day */
    if (end.isBefore(start)) {
      end.add(1, 'day');
    }

    const minutesDiffToStart = start.diff(now, 'minutes', true);
    const minutesDiffToEnd = end.diff(now, 'minutes', true);
    if (minutesDiffToStart < 0 && minutesDiffToEnd > 0) {
      special.active = true;
      special.display = true;

      //console.log('Minutes till end: ', minutesDiffToEnd);
      special.color = this.assignColorToSpecial(minutesDiffToEnd);
    }
    return special;
  };

  assignColorToSpecial = (minutesDiffToEnd, end?, now?) => {
    /* When the specials are displayed, there are four colors that they can be, Red, Yellow, Green or grey. Their color is determined by how much time the special has left 
    until it's over. This helper func will assign a color to the color attribute of each active special*/
    switch (true) {
      case minutesDiffToEnd > 90:
        return 'green';
        break;
      case minutesDiffToEnd <= 90 && minutesDiffToEnd > 30:
        return 'yellow';
        break;
      case minutesDiffToEnd <= 30 && minutesDiffToEnd > 0:
        return 'red';
        break;
      case minutesDiffToEnd < 0:

      default:
        return 'grey';
        break;
    }
  };

  groupSpecialsWithMatchingCriteria = (location: Location) => {
    // create a clone of the location
    let sortedLocation = JSON.parse(JSON.stringify(location));

    this.categories.forEach((category) => {
      this.dateTypes.forEach((dateType) => {
        // set the tempLocation specials arrays to empty array to start with so grouped specials can be added

        sortedLocation[category][dateType] = [];
        location[category][dateType].forEach((special: Special, index) => {
          let match = false;
          // Make a deep copy of the sortedLocation Special
          sortedLocation[category][dateType] = JSON.parse(
            JSON.stringify(sortedLocation[category][dateType])
          );
          // Make a deep copy of title
          const title = JSON.parse(JSON.stringify(special.title));
          const description = JSON.parse(JSON.stringify(special.description));
          // The special has a title and description that are currently a string but we want it to be an array.
          special.title = [];
          special.description = [];
          let price = special.price.toString().toLowerCase();
          price =
            price.indexOf('1/2') !== -1 ||
            price.indexOf('free') !== -1 ||
            price.indexOf('%') !== -1 ||
            price.indexOf('half') !== -1
              ? price
              : `$${price}`;
          special.title.push(`${title} - ${price}`);
          special.description.push(description);
          //console.log('Special Title: ', special.title)
          // sortedLocation[category][dateType] = JSON.parse(JSON.stringify(sortedLocation[category][dateType]))

          // Push the first special to the array
          if (index === 0) {
            sortedLocation[category][dateType].push(special);
            return;
          }

          // if the index is greater than 0 and the start time, end time, special Gategories, and Days or date all match, add the special title to the existing special im arry
          sortedLocation[category][dateType].forEach((sortedSpecial, k) => {
            if (
              index > 0 &&
              special.start == sortedSpecial.start &&
              special.end == sortedSpecial.end &&
              JSON.stringify(special.categories) ==
                JSON.stringify(sortedSpecial.categories) &&
              special.days !== null &&
              JSON.stringify(special.days) == JSON.stringify(sortedSpecial.days)
            ) {
              match = true;
              // console.log('Pushing: ', special.title[0], ' onto : ', sortedLocation[category][dateType][k].title)
              sortedLocation[category][dateType][k].title.push(
                special.title[0]
              );
              sortedLocation[category][dateType][k].description.push(
                special.description[0]
              );
              return;
            } else if (
              index > 0 &&
              special.start == sortedSpecial.start &&
              special.end == sortedSpecial.end &&
              JSON.stringify(special.categories) ==
                JSON.stringify(sortedSpecial.categories) &&
              special.days == null &&
              JSON.stringify(special.date) == JSON.stringify(sortedSpecial.date)
            ) {
              match = true;
              // console.log('Pushing: ', special.title[0], ' onto : ', sortedLocation[category][dateType][k].title)
              sortedLocation[category][dateType][k].title.push(
                special.title[0]
              );
              sortedLocation[category][dateType][k].description.push(
                special.description[0]
              );
            }
          });
          /*  A match was not found so push the special to the sortedSpecials array as a new special. 
          The first special of each category/dateType was already pushed to the new array so only push if 
          the index isn't 0.
          */
          //   console.log('Match: ', match);
          //   !match && index != 0 ? console.log('title: ', special.title) : '';
          if (!match && index != 0) {
            special.title[0] = special.title[0];
            special.description[0] = special.description[0];
          }
          !match && index != 0
            ? sortedLocation[category][dateType].push(special)
            : '';
        });
      });
    });
    return sortedLocation;
  };

  filterSecondaryCategories = (specials: Special[]) => {
                                                    //  console.log('filtering secondary')
    let display = false;
   /* 
   Get a new array of secondary filter options depending of which ones are selected in the search filter
   */
    const selectedCategories = this.secondaryCategories.filter(
      (cat) => this.searchFilter.filters[cat] === true
    );
   // console.log('Selected Secondary Categories: ', selectedCategories.length);
    /*
If the selectedCategories array has no length, then no secondary filters have been selected.
If selectedCategories has a length, make sure ALL categories in selectedCategories have a match in the special categories array.
*/
if (selectedCategories.length > 0) {
   specials.forEach( (special, i) => {
    let match = false;
    selectedCategories.forEach((cat) => {
      special.categories!.indexOf(cat) !== -1 ? (match = true) : '';
    });
    if(match !== false) {
      specials[i].display = true;
      display = true;
    }
  
})
  } else {
    /* 
    No secondary filters are selected.
    If Active is selected in the search filter, set display to true. 
    */
   display = true;
  //  console.log('No Secondary Filters Selected');
    specials.forEach( (special, i) => {
      if(!this.searchFilter.filters.active) {
        specials[i].display = true }
    })

  }
  return {specials, display};
                                     // else {
                                     /* No secondary filters are selected. */
                                           //   !this.searchFilter.filters.active ? (special.display = true) : '';
                                             //   }
                                             //  location[category][dateType][k].display = false;

   
  };

  // filterSecondaryCategories = (location: Location) => {
  //                                                         //  console.log('filtering secondary')

  //   this.categories.forEach((category) => {
  //     this.dateTypes.forEach((dateType) => {
  //       location[category][dateType].forEach((special, k) => {
  //         const selectedCategories = this.secondaryCategories.filter(cat => this.searchFilter.filters[cat] === true)
  //         /*
  //           If the selectedCategories array has no length, then no secondary filters were selected and no additional changes are needed.
  //           If selectedCategories has a length, make sure ALL categories in selectedCategories have a match in the special categories array. n
  //         */
  //        if( selectedCategories.length > 0) {
  //         let match = true;
  //         selectedCategories.forEach(cat => {
  //         special.categories.indexOf(cat) === -1 ? match = false : '';
  //         })
  //         match !== true ? special.display = false : '';
  //        } else {
  //         /* No secondary filters are selected. if the active is set to false, set all special.display to true */
  //         !this.searchFilter.filters.active ? special.display = true : '';
  //        }
  //       //  location[category][dateType][k].display = false;

  //     });
  //   });
  // })
  //   return location;
  // };

  ngOnDestroy() {
    this.searchFilter$.unsubscribe();
    this.searchCoords$.unsubscribe();
    this.userCoords$.unsubscribe();
  }
}
