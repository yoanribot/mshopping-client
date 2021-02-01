export default class Post {
    constructor({ title= '', content='', author='', votes= 0, date= '' }) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.votes = votes;
        this.date = date;
    }
}