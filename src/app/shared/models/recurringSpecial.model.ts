export interface RecurringSpecial {
        active: boolean;
        display: boolean;
        specials: Array<string>;
        specialDescriptions: Array<string>;
        days: Array<string>;
        start: number;
        end: number;
        formattedTime: string;
}
