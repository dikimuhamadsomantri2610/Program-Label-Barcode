document.querySelector("button").addEventListener("click", function () {
    let nama = document.getElementById("nama").value.trim(); // Ambil nama checker
    let tanggal = document.getElementById("tanggal").value; // Ambil tanggal
    let mulai = parseInt(document.getElementById("banyak_awal").value) || 1; // Nilai awal
    let akhirInput = document.querySelector("#banyak_akhir"); // Ambil input akhir jika ada
    let akhir = akhirInput ? parseInt(akhirInput.value) || mulai : mulai; // Nilai akhir (default = mulai)

    // Validasi input
    if (!tanggal) {
        alert("Harap pilih tanggal!");
        return;
    }
    if (akhir < mulai) {
        alert("Angka akhir harus lebih besar atau sama dengan angka mulai!");
        return;
    }
    if (akhir - mulai + 1 > 1000) {
        alert("Maksimal 1000 barcode!");
        return;
    }

    let hurufDepan = nama ? nama.charAt(0).toUpperCase() : "U"; // Ambil huruf depan nama (default 'U')
    let formattedDate = new Date(tanggal).toISOString().slice(0, 10).replace(/-/g, ""); // Format YYYYMMDD

    let barcodeContainer = document.getElementById("barcodeContainer");
    barcodeContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan tabel baru

    // Loop untuk membuat tabel barcode sesuai jumlah yang diminta
    for (let i = mulai; i <= akhir; i++) {
        let nomorUrut = String(i).padStart(4, "0"); // Format nomor urut menjadi 4 digit (0001, 0002, ...)
        let barcodeValue = `${hurufDepan}-${formattedDate}${nomorUrut}`;

        // Buat elemen tabel baru
        let table = document.createElement("table");
        table.classList.add("barcode-table"); // Tambahkan class agar bisa diatur stylingnya

        // ID unik untuk barcode di setiap tabel
        let barcodeSVGId = `barcode_svg_${i}`;

        // Isi tabel dengan barcode
        table.innerHTML = `
            <tr>
                <td colspan="2" style=
                "padding: 5px;
                width: 300px;
                height: 25px;
                font-weight: bold;
                font-size: 16px;
                border-right: none;
                border-bottom: none;
                border-top-left-radius: 10px;">Distribution Center YOMART GEDEBAGE</td>
                <td style="width: 104px;
                border-bottom: none;
                border-left: none;
                border-top-right-radius: 10px;">Print date :
                <br>${tanggal}</td>
            </tr>
            <tr>
                <td colspan="3" style="height: 100px;
                    padding: 0;
                    text-align: center;
                    border-top: none;
                    border-bottom: none;">
                    <svg id="${barcodeSVGId}"></svg>
                    <span class="preprinted" 
                    style="font-weight: bold;
                    font-size: 15px;">${barcodeValue}</span>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="    height: 25px;
                    font-size: 10px;
                    padding: 5px;
                    border-top: none;
                    border-bottom-right-radius: 10px;
                    border-bottom-left-radius: 10px;">Checker Receiving Name: <span>${nama || "Ucok"}</span></td>
            </tr>
        `;

        // Tambahkan tabel ke dalam kontainer
        barcodeContainer.appendChild(table);

        // Generate barcode setelah elemen ditambahkan ke DOM
        JsBarcode(`#${barcodeSVGId}`, barcodeValue, {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 85,
            displayValue: false
        });
    }
});
