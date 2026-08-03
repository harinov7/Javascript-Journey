// static keyword itu membuat properties atau method didalam class 
// DAN 
// itu milik class, bukan milik object didalamnya
// Jadi cara aksesnya itu className.static

class User {
    static userCount = 0;

    constructor(username) {
        this.username = username;
        User.userCount++;
    }

    static getUserCount() {
        console.log(`There are ${User.userCount} users online`)
    }
}

const user1 = new User("Fadhil");
const user2 = new User("Ibnu")

console.log(user1.username);
console.log(user2.username);

User.getUserCount()