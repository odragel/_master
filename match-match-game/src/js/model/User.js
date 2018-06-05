export class User{
    constructor(firstName, lastName, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;

        window.localStorage.setItem('firstName',firstName);
        window.localStorage.setItem('lastName',lastName);
        window.localStorage.setItem('email',email);
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}