document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-blur");
    } else {
      navbar.classList.remove("navbar-blur");
    }
  });
});

// JS Timeline
const buttonsTImeLine = document.querySelectorAll(".group-button button");

buttonsTImeLine.forEach((button) => {
  button.addEventListener("click", () => {
    buttonsTImeLine.forEach((btn) => {
      btn.querySelector(".tahun").classList.remove("tahun-active");
      btn.querySelector(".line").classList.remove("line-active");
    });

    button.querySelector(".tahun").classList.add("tahun-active");
    button.querySelector(".line").classList.add("line-active");
  });
});

// barang sejarah
const tabs = document.querySelectorAll(".tab_btn");
const all_content = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    var line = document.querySelector(".line_barang");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";
    all_content.forEach((content) => {
      content.classList.remove("active");
    });
    all_content[index].classList.add("active");
  });
});

function setActiveTab(tab) {
  const tabs = document.querySelectorAll(".tabs-profile .nav-link");
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("exampleModal");
  var modalImage = modal.querySelector("#modalImage");
  var modalTitle = modal.querySelector("#exampleModalLabel");
  var modalDescription = modal.querySelector("#modalDescription p");

  modal.addEventListener("show.bs.modal", function (event) {
    var image = event.relatedTarget;

    modalImage.src = image.getAttribute("data-image");
    modalTitle.textContent = image.getAttribute("data-title");
    modalDescription.textContent = image.getAttribute("data-description");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modalImageLandscape");
  var modalImage = modal.querySelector("#modalImage_landscape");
  var modalTitle = modal.querySelector("#modalImageLandscape");
  var modalDescription = modal.querySelector("#modalDescriptionLandscape p");

  modal.addEventListener("show.bs.modal", function (event) {
    var image = event.relatedTarget;

    modalImage.src = image.getAttribute("data-image");
    modalTitle.textContent = image.getAttribute("data-title");
    modalDescription.textContent = image.getAttribute("data-description");
  });
});

window.addEventListener("scroll", function () {
  const elements = [
    document.querySelector(".nusantara"),
    document.querySelector(".dulu"),
    document.querySelector(".sekarang"),
    document.querySelector(".text_proklamasi"),
    document.querySelector(".gambar_highlight_1"),
    document.querySelector(".gambar_highlight_2"),
    document.querySelector(".teks_gambar_highlight"),
    document.querySelector(".judul_timeline"),
    document.querySelector(".deskripsi"),
    document.querySelector(".group-button"),
    document.querySelector(".text_barang_sejarah"),
    document.querySelector(".tab_box"),
    document.querySelector(".nav_galeri"),
  ];

  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
});
