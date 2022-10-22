export interface Special {
         active: boolean,
         type: number,
         title: string | string[],
         description: string | string[],
         start: number,
         end: number,
         price: number,
         startFormatted: string,
         endFormatted: string,
         days?: string[],
         formattedTime?: string,
         date?: string,
         categories?: string
         color? : string
  
}

export interface SortedSpecial {
    active: boolean,
    type: number,
    title: string[],
    description: string,
    start: number,
    end: number,
    price: number,
    startFormatted: string,
    endFormatted: string,
    days?: string[],
    formattedTime?: string,
    date?: string,
    categories?: string
    color? : string

}
