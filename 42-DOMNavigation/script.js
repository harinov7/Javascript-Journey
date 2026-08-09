// DOM Navigation

// .firstElementChild
// .lastElementChild
// .nextElementSibling
// .previousElementSiblings
// .parentElement
// .children



//----------.firstElementChild-------------

// const vegetables = document.getElementById("vegetables")
// const firstChild = vegetables.firstElementChild;

// firstChild.style.backgroundColor = "yellow"



//----------.lastElementChild--------------

// const dessert = document.getElementById("dessert")
// const lastChild = dessert.lastElementChild;

// lastChild.style.backgroundColor = "yellow"

// Contoh pakai query selector all
// const ulElement = document.querySelectorAll("ul")
// ulElement.forEach((element) => {
//     const lastChild = element.lastElementChild;
//     lastChild.style.backgroundColor = "yellow"
// })



//-----------.nextElementSibling-----------

// const apple = document.getElementById("apple");
// const siblings = apple.nextElementSibling;
// siblings.style.backgroundColor = "yellow"



//-----------.previousElementSibling-----------

// const vegetables = document.getElementById("vegetables");
// const siblings = vegetables.previousElementSibling;
// siblings.style.backgroundColor = "yellow"



//-----------.parentElementSibling-----------

// const element = document.getElementById("apple");
// const parent = element.parentElement;
// parent.style.backgroundColor = "yellow"

//-----------.children-----------

const element = document.getElementById("fruits")
const children = element.children;

children[0].style.backgroundColor = "red"

// Akses pake array: 
// Array.from(children).forEach(children => {
//     children.style.backgroundColor = "yellow"
//     console.log(children)
// })