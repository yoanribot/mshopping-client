export default class Post {
    constructor({ _id= '', title= '', content='', author='', votes= 0, date= '' }) {
        this.id = _id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.votes = votes;
        this.date = date;
    }
}