export class User {
  constructor(
    public email: string | null,
    public uid: string | null,
    public token: string | null,
  ) {}

  // get token() {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return null;
  //   }
  //   return this._token;
  // }
}
