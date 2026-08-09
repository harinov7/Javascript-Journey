
// STEP 1 BIKIN ELEMENNYA
const myH1 = document.createElement("h1");

// STEP 2 TAMBAHKAN ATRIBUT DAN PROPERTIES
myH1.textContent = `New Element Here`;
myH1.style.fontSize = "1rem";
myH1.style.fontWeight = "bold";
myH1.style.backgroundColor = "lightgreen";
myH1.style.textAlign = "center";
myH1.id = "myH1" // Menamai id
// myH1.className = "box" // Menamai class 

// STEP 3 TEMPELKAN ELEMEN KE DOM
// document.body.append(myH1); // Menaruh element ke urutan paling akhir
// document.body.prepend(myH1); // Menaruh element ke urutan paling awal
document.getElementById("box1").append(myH1); // Menempel elemen ke box 1, dapet urutannya paling bawah
// document.getElementById("box1").prepend(myH1); // Menempel elemen ke box 1, dapet urutannya paling atas

// const box2 = document.getElementById("box2");
// document.body.insertBefore(myH1, box2); // Menaruh element baru diatas box 2

// const boxes = document.querySelectorAll(".box");
// document.body.insertBefore(myH1, boxes[1]); // Menaruh element baru diatas boxes[index]

// STEP 4 KALO MAU HAPUS ELEMEN

// document.body.removeChild(myH1); // kalo child dari suatu box, jadi document.parent.removeChild(namaElement)

// document.getElementById("box1").removeChild(myH1); // Menghapus element sesuai child nya punya siapa


// Contoh
const buahBaru = document.createElement("li");
buahBaru.textContent = `Anggur`;
buahBaru.id = "anggur";
buahBaru.style.backgroundColor = "yellow";
buahBaru.style.fontWeight = "bold";

document.getElementById("namaBuahBuah").append(buahBaru);
document.getElementById("namaBuahBuah").prepend(buahBaru);