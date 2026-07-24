document.getElementById("mySubmit").onclick = function () {
    const nama = document.getElementById("inputNama").value;
    let gajiPokok = document.getElementById("inputGajiPokok").value;
    const bonus = document.getElementById("inputBonus").value;
    const pajak = document.getElementById("inputPajak").value;

    gajiPokok = Number(gajiPokok);
    const bonusPersen = Number(bonus) / 100;
    const pajakPersen = Number(pajak) / 100;

    let bonusNominal = bonusPersen * gajiPokok;
    let pajakNominal = pajakPersen * gajiPokok;
    
    let gajiBersih = gajiPokok + bonusNominal - pajakNominal;

    document.getElementById("slipGaji").textContent = `
    ===== SLIP GAJI =====

    Nama : ${nama}

    Gaji Pokok : ${gajiPokok.toLocaleString("id-ID", {style: 'currency', currency: 'IDR'})}

    Bonus : ${bonusNominal.toLocaleString("id-ID", {style: 'currency', currency: 'IDR'})}

    Pajak : ${pajakNominal.toLocaleString("id-ID", {style: 'currency', currency: 'IDR'})}

    Gaji Bersih : ${gajiBersih.toLocaleString("id-ID", {style: 'currency', currency: 'IDR'})}
    `
}

// counter number
const increase = document.getElementById("increaseBtn");
const decrease = document.getElementById("decreaseBtn");
const reset = document.getElementById("resetBtn");
const countLabel = document.getElementById("initialNumber");

let count = 0

increase.onclick = function () {
    count++
    countLabel.textContent = count
}

decrease.onclick = function () {
    count--
    countLabel.textContent = count
}

reset.onclick = function () {
    count = 0
    countLabel.textContent = count
}