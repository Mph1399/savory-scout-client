export class SpecificDateSpecial {
    constructor(
       public active: boolean,
       public specials: Array<string>,
       public date:string,
       public start:number,
       public end:number,
       public formattedTime: string
    ){
    }
}