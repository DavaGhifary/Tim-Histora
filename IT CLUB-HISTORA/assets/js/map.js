// Initialize the map
var map = L.map("map").setView([3, 100], 4);
var bounds = [
  [-11, 94],
  [6, 141],
];
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var iconGempa = L.divIcon({
  html: '<img src="../assets/icon/Vector-lokasi.png" style="width:25px;"/>',
  className: "wave-div-icon",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

var markers = [];

function loadMapData(jsonFile) {
  console.log("Fetching data from:", "../assets/json/" + jsonFile);
  fetch("../assets/json/" + jsonFile)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Data loaded:", data);
      // Remove existing markers
      markers.forEach((marker) => map.removeLayer(marker));
      markers = [];

      // Add new markers
      data.forEach((event) => {
        if (event.koordinat && event.koordinat.length > 0) {
          var marker = L.marker(event.koordinat, { icon: iconGempa })
            .addTo(map)
            .on("click", function () {
              document.getElementById("popup").style.display = "block";
              document.querySelector(".popup_header .text_tahun").innerText =
                event.tahun;
              document.querySelector(".popup_body .popup_text h2").innerText =
                event.judul;
              document.querySelector(".popup_body .popup_desc").innerText =
                event.deskripsi;
              document.querySelector(".popup_body .popup_img img").src =
                event.image;
            });
          markers.push(marker);
        }
      });
    })
    .catch((error) => console.error("Ada masalah saat mengambil data:", error));
}

// Update the button click handlers
const buttons = document.querySelectorAll(".group-button button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.querySelector(".tahun").classList.remove("tahun-active");
      btn.querySelector(".line").classList.remove("line-active");
    });

    button.querySelector(".tahun").classList.add("tahun-active");
    button.querySelector(".line").classList.add("line-active");

    const jsonFile = button.getAttribute("data-key");
    if (jsonFile) {
      console.log("Loading data from:", jsonFile);
      loadMapData(jsonFile);
    } else {
      console.error("No data-key found on the button");
    }
  });
});

// Load initial map data
loadMapData("1740-1850.json");

document.querySelector(".popup_close").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  document.getElementById("popup").style.display = "none";
});
