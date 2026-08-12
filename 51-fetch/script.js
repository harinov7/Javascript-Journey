// fetch => Mengambil data dari suatu API
//          fetch(url)
//          return nya bentuk promise

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(values => values.forEach(value => console.log(value.name)))

// async function getUser(url) {
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error("endpoint tidak ada")
//         }
//         const users = await response.json()

//         const userNames = users.map(value => value.name)

//         console.log(userNames)
//     }
//     catch (error) {
//         console.error(error)
//     }
// }

// getUser("https://jsonplaceholder.typicode.com/users")



async function getData(url) {
    const response = await fetch(url)

    const data = await response.json()

    const userNames = data.map(value => value.name)

    return userNames
}

async function user() {
    const userName = await getData("https://jsonplaceholder.typicode.com/users")
    return userName
}