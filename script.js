const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 30;

// Unsplash API
const COUNT = 30;
const APIKEY = "SotMS0FkhNS8gdQxiA2DPupl8DuEepfZFvx__w0o808";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${COUNT}`;

// Check if all iamges were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to set attribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links and photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //Put <img> instide <a> and put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

// CHeck to see if Scroll is bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
