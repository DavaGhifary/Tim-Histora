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
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const icons = {
  icon1: L.icon({
    iconUrl: "../assets/icon/time.png",
    iconSize: [30, 34], 
  }),
};

let markers = [];

function clearMarkers() {
  markers.forEach((marker) => {
    map.removeLayer(marker); 
  });
  markers = []; 
}

function addPointsToMap(points, icon) {
  clearMarkers(); 
  points.forEach((point) => {
    if (point.koordinat && point.koordinat.length === 2) {
      const [lat, lng] = point.koordinat;
      const marker = L.marker([lat, lng], { icon: icon }).addTo(map);

      marker.on("click", () => {
        showPopup(point); 
      });

      markers.push(marker); 
    } else {
      console.error("Invalid point data:", point);
    }
  });
}

function loadJsonData(url, icon = icons.icon1) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      addPointsToMap(data, icon);
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}

function handleButtonClick(event) {
  const jsonUrl = event.target.getAttribute("data-json"); 
  const iconType = event.target.getAttribute("data-icon");
  const icon = icons[iconType]; 

  if (jsonUrl && icon) {
    loadJsonData(jsonUrl, icon); 
  }
}

document.querySelectorAll(".loadPointsBtn").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

document.addEventListener("DOMContentLoaded", () => {
  loadJsonData("../assets/json/1780-1815.json", icons.icon1); 
});

function showPopup(data) {
  console.log("Popup data:", data);
  document.querySelector(".text_tahun").textContent = data.tahun;
  document.querySelector(".popup_text h2").textContent = data.judul;
  document.querySelector(".popup_desc").textContent = data.deskripsi;
  document.querySelector(".popup_img img").src = data.image; 

  document.querySelector(".popup").style.display = "block";
}
document.querySelector(".popup_close").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("popup").style.display = "none";
});
