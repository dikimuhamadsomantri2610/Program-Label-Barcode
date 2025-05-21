let value = document.getElementById("barcode_preprinted").innerText.trim();

        // Generate barcode dari teks tersebut
        JsBarcode("#barcode", value, {
            format: "CODE128", // Format barcode
            lineColor: "#000", // Warna barcode (hitam)
            width: 2,          // Lebar tiap garis
            height: 80,        // Tinggi barcode
            displayValue: false // Menghilangkan teks angka di bawah barcode
        });