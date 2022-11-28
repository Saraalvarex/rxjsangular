export class User {
    constructor(
    public address: {
        geolocation: {
            lat: string,
            long: string
        },
        city: number,
        street: number,
        number: string,
        zipcode: string
    },
    public id: number,
    public email: string,
    public username: string,
    public password: string,
    public name: {
        firstname: string,
        lastname: string
    },
    public phone: string,
    public __v: number
    ){}
}