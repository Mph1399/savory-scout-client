import { SpecificDateSpecial } from './specificDateSpecial.model';
import { RecurringSpecial } from './recurringSpecial.model';
export  interface SpecialObject{
        color: string;
        active: boolean;
        recurring: boolean;
        recurringSpecials: Array<RecurringSpecial>;
        specificDate: false;
        specificDateSpecials: Array<SpecificDateSpecial>;
}
