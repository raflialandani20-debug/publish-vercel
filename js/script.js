// =========================
// LOAD BERITA
// =========================
const newsList = document.getElementById("news-list");
const judulSection = document.getElementById("judul-section");

// Fungsi helper untuk mendapatkan kategori berdasarkan ID
function getKategori(id) {
    if (id >= 1 && id <= 10) return "Hari Ini";
    if (id >= 11 && id <= 20) return "Populer";
    if (id >= 21 && id <= 30) return "Rekomendasi";
    return "Lainnya";
}
// Fungsi menampilkan berita per kategori
function tampilkanBerita(kategori) {
    console.log("Kategori dipilih:", kategori); // Debug
    
    newsList.innerHTML = "";
    
    if (kategori === "semua") {
        judulSection.textContent = "SEMUA BERITA";
        
        // Pastikan beritaData ada dan memiliki struktur yang benar
        console.log("Data berita:", beritaData); // Debug
        
        // Gabungkan semua berita dari semua kategori
        const semuaBerita = [
            ...(beritaData["hari-ini"] || []),
            ...(beritaData["populer"] || []),
            ...(beritaData["rekomendasi"] || [])
        ];
        
        console.log("Jumlah semua berita:", semuaBerita.length); // Debug
        
        if (semuaBerita.length === 0) {
            newsList.innerHTML = "<p>Tidak ada berita tersedia.</p>";
            return;
        }
        
        // Tampilkan semua berita
        semuaBerita.forEach((item, index) => {
            console.log(`Berita ${index + 1}:`, item); // Debug
            
            const card = document.createElement("div");
            card.classList.add("news-card");
            card.innerHTML = `
                <img src="${item.img}" alt="${item.judul}">
                <div class="text">
                    <h3>${item.judul}</h3>
                    <p class="deskripsi">${item.deskripsi}</p>
                    <span class="kategori-badge">${getKategori(item.id)}</span>
                    <a href="berita.html?id=${item.id}" class="btn-news">Baca Selengkapnya →</a>
                </div>
            `;
            newsList.appendChild(card);
        });
    } else {
        // Kode asli untuk kategori lainnya
        const data = beritaData[kategori];
        
        if (!data || data.length === 0) {
            judulSection.textContent = "TIDAK ADA BERITA";
            newsList.innerHTML = "<p>Tidak ada berita untuk kategori ini.</p>";
            return;
        }
        
        judulSection.textContent = kategori.replace("-", " ").toUpperCase();
        
        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("news-card");
            card.innerHTML = `
                <img src="${item.img}" alt="${item.judul}">
                <div class="text">
                    <h3>${item.judul}</h3>
                    <p class="deskripsi">${item.deskripsi}</p>
                    <a href="berita.html?id=${item.id}" class="btn-news">Baca Selengkapnya →</a>
                </div>
            `;
            newsList.appendChild(card);
        });
    }
}
// =========================
// BREAKING NEWS SLIDER
// =========================
const breakingSection = document.getElementById("breaking-section");
function showSlider(show) {
    if (!breakingSection) return;
    breakingSection.style.display = show ? "block" : "none";
}

const breakingData = [
    { img: "img/news1.jpg", judul: "Anita Pemilik Tumbler Tuku yang Hilang di KRL Kini Dipecat", url: "berita.html?id=1" },
    { img: "img/news2.jpg", judul: "Harga BBM Terbaru Jumat 28 November 2025, Cek Daftar Lengkap dan Kondisi Terbarunya", url: "berita.html?id=2" },
    { img: "img/news3.jpg", judul: "Banjir Sumatera: Update Terbaru Longsor dan Banjir Bandang di Wilayah Sumut, Sumbar, dan Aceh", url: "berita.html?id=3" },
    { img: "img/news11.jpg", judul: "iPhone 17 Resmi Dirilis, Ini Fitur Canggihnya", url: "berita.html?id=11" },
    { img: "img/news12.jpg", judul: "Atlet Indonesia Hamsa Lestaluhu Jadi Pemain Terbaik Liga Minifootball Asia", url: "berita.html?id=12" },
    { img: "img/news21.jpg", judul: "5 Tempat Wisata Yang Paling Hits Di Indonesia", url: "berita.html?id=21" },
    { img: "img/news22.jpg", judul: "Sepanjang 2025, Aceh Diguncang 1.556 Gempa Bumi, 75 Kejadian yang Dapat Dirasakan", url: "berita.html?id=22" }
];

const wrapper = document.getElementById("breakingWrapper");

// tambahkan slider item
breakingData.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("breaking-item");
    div.innerHTML = `
        <img src="${item.img}" alt="">
        <h4>${item.judul}</h4>
    `;
    // Tambahkan styling inline untuk efek klik (bisa dipindah ke CSS)
    div.style.cursor = "pointer";
    div.style.transition = "opacity 0.3s";
    div.addEventListener("mouseenter", () => div.style.opacity = "0.7");
    div.addEventListener("mouseleave", () => div.style.opacity = "1");
    // Event listener untuk membuka berita
    div.addEventListener("click", () => {
        window.open(item.url, "_blank"); // Buka di tab baru
    });
    wrapper.appendChild(div);
});

// =========================
// SLIDER LOGIC
// =========================
let posisi = 0;
const itemWidth = 310;  // width + margin
const totalItems = breakingData.length;
const itemsPerFrame = 1; // jumlah item terlihat dalam frame
const maxLeft = -(itemWidth * (totalItems - itemsPerFrame));

function geserSliderNext() {
    posisi -= itemWidth;
    if (posisi < maxLeft) posisi = 0; // looping kembali ke awal
    wrapperElement.style.transform = `translateX(${posisi}px)`;
}

const wrapperElement = document.getElementById("breakingWrapper");

function geserSliderNext() {
    posisi -= itemWidth;
    if (posisi < maxLeft) posisi = 0; // kembali ke awal kalau sudah akhir
    wrapperElement.style.transform = `translateX(${posisi}px)`;
}

// tombol manual
document.getElementById("nextSlide").addEventListener("click", () => {
    geserSliderNext();
});

document.getElementById("prevSlide").addEventListener("click", () => {
    posisi += itemWidth;
    if (posisi > 0) posisi = maxLeft; // kalau sudah di awal, lompat ke akhir
    wrapperElement.style.transform = `translateX(${posisi}px)`;
});

// =========================
// AUTO SLIDER
// =========================
let autoSlider = setInterval(geserSliderNext, 3000); // geser tiap 3 detik

// opsional: pause saat hover slider
wrapperElement.addEventListener("mouseenter", () => clearInterval(autoSlider));
wrapperElement.addEventListener("mouseleave", () => autoSlider = setInterval(geserSliderNext, 3000));


// =========================
// EVENT MENU KATEGORI
// =========================
document.querySelectorAll(".navbar a").forEach(menu => {
    menu.addEventListener("click", () => {
        const kategori = menu.getAttribute("data-kategori");
        showSlider(false); // sembunyikan slider saat klik kategori
        tampilkanBerita(kategori);
    });
});

// =========================
// DEFAULT LOAD
// =========================
showSlider(true); // tampilkan slider di awal
tampilkanBerita("hari-ini");

// =========================
// FITUR PENCARIAN
// =========================
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", function () {
    const keyword = searchInput.value.toLowerCase();
    
    if (keyword === "") {
        // Kembali ke tampilan sebelumnya
        const menuAktif = document.querySelector(".navbar a.active");
        if (menuAktif && menuAktif.getAttribute("data-kategori")) {
            const kategoriAktif = menuAktif.getAttribute("data-kategori");
            tampilkanBerita(kategoriAktif);
            showSlider(kategoriAktif === "hari-ini"); // tampilkan slider hanya untuk "hari-ini"
        } else {
            // Default ke "hari-ini" jika tidak ada menu aktif
            tampilkanBerita("hari-ini");
            showSlider(true);
        }
        return;
    }

    // Cari di semua berita
    const semuaData = [
        ...beritaData["hari-ini"],
        ...beritaData["populer"],
        ...beritaData["rekomendasi"]
    ];
    
    const hasil = semuaData.filter(item =>
        item.judul.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword)
    );

    showSlider(false); // sembunyikan slider saat search
    newsList.innerHTML = "";
    judulSection.textContent = `HASIL PENCARIAN: "${keyword}"`;

    hasil.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
            <img src="${item.img}" alt="">
            <div class="text">
                <h3>${item.judul}</h3>
                <p>${item.deskripsi}</p>
                <span class="kategori-badge">${getKategori(item.id)}</span>
                <a href="berita.html?id=${item.id}" class="btn-news">Baca Selengkapnya →</a>
            </div>
        `;
        newsList.appendChild(card);
    });
});

// =========================
// MODE (DARK / LIGHT)
// =========================
const modeBtn = document.getElementById("mode-btn");
const logoText = document.querySelector(".logo .red"); // bagian "Nusantara"
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        modeBtn.textContent = "☀️";
        if (logoText) logoText.style.color = "white";
    } else {
        modeBtn.textContent = "🌙";
        if (logoText) logoText.style.color = "black";
    }
});

// =========================
// DETAIL BERITA (opsional)
// =========================
if (typeof data !== "undefined") {
    const detailJudul = document.getElementById("detail-judul");
    const detailImg = document.getElementById("detail-img");
    const detailIsi = document.getElementById("detail-isi");

    if (detailJudul) detailJudul.textContent = data.judul;
    if (detailImg) detailImg.src = data.img;
    if (detailIsi) {
        // menjadi paragraf per baris
        detailIsi.innerHTML = data.isi.split("\n").map(p => `<p>${p}</p>`).join("");
        // atau per kalimat
        const paragraf = data.isi.split(". ").map(p => `<p>${p.trim()}.</p>`).join("");
        detailIsi.innerHTML = paragraf;
    }
}
