/* ==========================
      JAM REALTIME
========================== */
function updateJam() {
    const now = new Date();
    document.getElementById("jam").textContent =
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}
setInterval(updateJam, 1000);
updateJam();


/* ==========================
   LOKASI OTOMATIS
=========================== */

function tampilkanLokasi(lat, lon) {
    document.getElementById("lokasi").textContent = `Lokasi: ${lat}, ${lon}`;
}

function getCuaca(lat, lon) {
    // Simulasi cuaca (ganti dengan API cuaca nyata jika perlu, seperti OpenWeatherMap)
    document.getElementById("cuaca").textContent = "Cerah Berawan";
    document.getElementById("temperature").textContent = "27°C";
}

// Set nilai default awal (untuk menghindari tampilan kosong atau placeholder)
document.getElementById("lokasi").textContent = "[lokasi...]";
document.getElementById("cuaca").textContent = "Cuaca Cerah |";
document.getElementById("temperature").textContent = "32°C";
