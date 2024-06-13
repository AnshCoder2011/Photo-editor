let rotation = 0;
let exposure = 0;
let filters = {
  grayscale: false,
  sepia: false,
  invert: false,
  contrast: false,
  blur: false,
};
let originalImageSrc = document.getElementById("image").src;

function rotateImage() {
  rotation = (rotation + 90) % 360;
  document.getElementById("image").style.transform = `rotate(${rotation}deg)`;
}

function cropImage() {
  const image = document.getElementById("image");
  const cropWidth = image.naturalWidth / 2;
  const cropHeight = image.naturalHeight / 2;
  const canvas = document.createElement("canvas");
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    cropWidth / 2,
    cropHeight / 2,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );
  image.src = canvas.toDataURL();
}

function adjustExposure() {
  exposure = document.getElementById("exposure").value;
  applyFilters();
}

function applyFilter(filter) {
  filters[filter] = !filters[filter];
  applyFilters();
}

function applyFilters() {
  const image = document.getElementById("image");
  let filterString = `brightness(${100 + parseInt(exposure)}%) `;
  for (let [key, value] of Object.entries(filters)) {
    if (value) {
      filterString += `${filterMap(key)} `;
    }
  }
  image.style.filter = filterString.trim();
}

function filterMap(filter) {
  switch (filter) {
    case "grayscale":
      return "grayscale(100%)";
    case "sepia":
      return "sepia(100%)";
    case "invert":
      return "invert(100%)";
    case "contrast":
      return "contrast(200%)";
    case "blur":
      return "blur(5px)";
    default:
      return "none";
  }
}

function resetImage() {
  rotation = 0;
  exposure = 0;
  filters = {
    grayscale: false,
    sepia: false,
    invert: false,
    contrast: false,
    blur: false,
  };
  const image = document.getElementById("image");
  image.src = originalImageSrc;
  image.style.transform = "";
  image.style.filter = "";
  document.getElementById("exposure").value = 0;
}

function loadImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const image = document.getElementById("image");
    image.src = reader.result;
    originalImageSrc = reader.result;
    resetImage();
  };
  reader.readAsDataURL(event.target.files[0]);
}

function downloadImage() {
  const image = document.getElementById("image");
  const link = document.createElement("a");
  link.href = image.src;
  link.download = "eyo.png";
  link.click();
}
