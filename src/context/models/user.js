export default class User {
    constructor({ _id='', name= '', lastname='', description='', age= 0 }) {
        this.id = _id;
        this.name = name;
        this.lastname = lastname;
        this.description = description;
        this.age = age;
        this.fullName = `${name} ${lastname}`;
    }
}