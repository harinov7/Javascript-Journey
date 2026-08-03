const kandang = ["Domba", "Singa", "Siput", "Macan", "Sapi"]

const kandangRapi = kandang.filter(kandangFormatS)
const hewan = kandang.filter(hewanLimaHuruf)

console.log(kandangRapi)
console.log(hewan)

function kandangFormatS(element) {
    return element.charAt(0) === "S";
}

function hewanLimaHuruf(element) {
    return element.length >= 5;
}