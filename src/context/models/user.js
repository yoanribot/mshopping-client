export default class User {
    constructor({ name= '', lastname='', description='', age= 0 }) {
        this.name = name;
        this.lastname = lastname;
        this.description = description;
        this.age = age;
        this.fullName = `${name} ${lastname}`;
    }
}