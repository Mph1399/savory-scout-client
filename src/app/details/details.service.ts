import { Injectable } from "@angular/core";
import { Day } from "src/app/shared/models/day.model";
import * as moment from 'moment';

export interface CategoryDetails {
    category: string,
    days: Day[]
    }


@Injectable()
export class DetailsService {
    days: Day[];
    constructor(
        // public displayRestaurantFilterService: DisplayRestaurantsFilterService
        ) {}
  
    displayDays = (category, importedSpecials) => {
      /*  */
      const days: Day[] = [];
      const wd = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      // Loop through wd(week days)
      wd.forEach((element, index) => {
        // create a day object and add the day of the week(element) to each
        const dayObject = {
          day: element,
          open: false,
          displayRecurring: this.displayRecurringDay(index, importedSpecials).display,
          recurringSpecials: this.displayRecurringDay(index, importedSpecials).specials,
          displaySpecificDay: this.displaySpecificDay(index, importedSpecials).display,
          specificDateSpecials: this.displaySpecificDay(index, importedSpecials).specials
        };
        // push that obect to the global days array if display = true
        if (dayObject.displayRecurring || dayObject.displaySpecificDay){
          days.push(dayObject);
        }
  
      });
    //  console.log(category + ' days object: ', days)
      return days;
    }
  
    displayRecurringDay = (i, importedSpecials) => {
      /* This function is a helper funtion for the displayDays Function Above
      That Function returns an array of object. Each Objects represents a day of the week
      This function is called for each day of the week and the location provided.
      This function will use the location data to determine whether or not that particular day of the week
      should be displayed or not */
      // console.log('Location In Display Day: ', location);
      const specials: CategorySpecials[] = [];
      let display = false;
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
      importedSpecials.recurringSpecials.forEach((special) => {
      //  console.log('Special: ', special)
            // Check recurring Specials for a day of the week match by looping through each day of the week
        //      console.log('Day: ', days[i])
              try { const result1 = special.days.indexOf(days[i]);
                 // If a match is found for the day of the week, set display to true
                 if (result1 !== -1) {
             //      console.log('Saving: @ day '+ index, result1);
  
                   specials.push({
                     specials: special.title,
                     specialDescriptions: special.specialDescriptions,
                     price: special.price,
                     start: special.start,
                     end: special.end
                   });
                   display = true;
                 }
               } catch (e) {}
        // console.log('State: ', counter, display, specials)
      }); // End forEach
  
    //  console.log('Returning: ',display, specials )
      return { display, specials };
    }
  
    displaySpecificDay(day, importedSpecials): { display; specials } {
    //  console.log("Specific Day Filter Location: ", location);
  
      // Create a variable to push specials into
      const specials: CategorySpecials[] = [];
      // Create bool to set if a special is found for that date
      let display = false;
  
        // loop through specific date specials
        importedSpecials.specificDateSpecials.forEach(special => {
          // Create a function to push a special object into the specials array
        const push = (finalSpecial) => {
            const start = finalSpecial.start;
            const end = finalSpecial.end;
            // const formattedDate = moment(finalSpecial.date, 'YYYY-MM-DD').format(
            //   'ddd DD/MM/YYYY'
            // );
            specials.push({
              date: finalSpecial.date,
              price: finalSpecial.price,
              specials: special.title,
              specialDescriptions: special.specialDescriptions,
              start,
              end,
            });
          };
          //  Splice the date out of the date string. Ex. 'Mon 2018-12-10' to '2018-12-10'
          const date = special.date;
          const dayOfTheWeek = moment(special.date, 'MMMM Do YYYY').format('ddd');
  
          // If the day of the special matches the day of the week submitted to the function
          if (day === dayOfTheWeek) {
            // Get the amount of days from now until that date.
            // Dates in the future will be a negative number & Past will be positive.
            const difference = moment({ hours: 0 }).diff(date, 'days');
            console.log('Date Diff: ', difference)
  
            // If the date is within 2 weeks
            if (difference >= -13 && difference <= 0) {
              push(special);
              display = true;
            }
          }
        });
      
      return { display, specials };
    }
}

export interface CategorySpecials {
    start: string,
    end: string,
    price: string,
    specials: string[],
    specialDescriptions: string[]
    date?: string,
    days?: string[]
}