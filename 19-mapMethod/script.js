// .map() intinya hampir sama kaya .forEach(), yang membedakan hanya kalau map bisa mengembalikan array baru

// Jangan lupa variabel penampungnya dibuat dulu

// Contoh kode

const kandang = ["Domba", "Sapi", "Kuda", "Ayam", "Kelinci"]

const kandangRapi = kandang.map(berurutan)

console.log(kandangRapi)

function berurutan(element) {
  return element.toUpperCase()
}