// Inisialisasi peta
var map = L.map("map").setView([3, 100], 4);
var bounds = [
  [-11, 94],
  [6, 141],
];
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});
// Atur tiles dari OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Custom icons untuk marker
const icons = {
  icon1: L.icon({
    iconUrl: "../assets/icon/time.png", // URL icon pertama
    iconSize: [30, 34], // Ukuran icon (lebar, tinggi)
  }),
};

// Array untuk menyimpan semua marker yang ditambahkan ke peta
let markers = [];

// Fungsi untuk menghapus semua marker dari peta
function clearMarkers() {
  markers.forEach((marker) => {
    map.removeLayer(marker); // Hapus marker dari peta
  });
  markers = []; // Kosongkan array markers
}

// Fungsi untuk menambahkan titik koordinat ke peta dengan custom icon
function addPointsToMap(points, icon) {
  clearMarkers(); // Hapus marker sebelumnya sebelum menambahkan yang baru
  points.forEach((point) => {
    if (point.koordinat && point.koordinat.length === 2) {
      // Validasi apakah koordinat ada dan valid
      const [lat, lng] = point.koordinat; // Pecah koordinat jadi lat dan lng
      const marker = L.marker([lat, lng], { icon: icon }).addTo(map);

      // Event listener untuk marker
      marker.on("click", () => {
        showPopup(point); // Tampilkan popup dengan data saat marker diklik
      });

      markers.push(marker); // Tambahkan marker ke array markers
    } else {
      console.error("Invalid point data:", point); // Log kesalahan jika data tidak valid
    }
  });
}

// Fungsi untuk mengambil data JSON dan menambahkan marker ke peta
function loadJsonData(url, icon = icons.icon1) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      addPointsToMap(data, icon);
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}

// Fungsi utama untuk menangani semua tombol
function handleButtonClick(event) {
  const jsonUrl = event.target.getAttribute("data-json"); // Ambil URL JSON dari atribut data-json
  const iconType = event.target.getAttribute("data-icon"); // Ambil jenis icon dari atribut data-icon
  const icon = icons[iconType]; // Pilih ikon berdasarkan jenis

  if (jsonUrl && icon) {
    loadJsonData(jsonUrl, icon); // Panggil fungsi untuk memuat data JSON dan menambahkan marker ke peta
  }
}

// Event listener untuk semua tombol dengan class loadPointsBtn
document.querySelectorAll(".loadPointsBtn").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Memuat data JSON default ketika halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadJsonData("../assets/json/1780-1815.json", icons.icon1); // Panggil fungsi untuk memuat data default
});

// Fungsi untuk menampilkan popup dengan data dari JSON
function showPopup(data) {
  console.log("Popup data:", data);
  // Isi elemen-elemen popup dengan data dari JSON
  document.querySelector(".text_tahun").textContent = data.tahun;
  document.querySelector(".popup_text h2").textContent = data.judul;
  document.querySelector(".popup_desc").textContent = data.deskripsi;
  document.querySelector(".popup_img img").src = data.image; // Path image dari JSON

  // Tampilkan popup
  document.querySelector(".popup").style.display = "block";
}
document.querySelector(".popup_close").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("popup").style.display = "none";
});
