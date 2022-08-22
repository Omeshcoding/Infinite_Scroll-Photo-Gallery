const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader-animation');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// UnSplash Api
const count = 10;
const apiKey = 'EpXJizdpcjZFPzm_c8JzYapwEeN-KaW0L95hYkE5K3A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log('ready=l',imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
   
    console.log('ready=',ready);
  }
}


// Helper Functio to Set Attributes on Dom Elements
function setAttributes(element, attributes) {
 for (const key in attributes) {
  element.setAttribute(key, attributes[key]);
 }
}



// Create element for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log('totl' , totalImages)

 // Run funtion for each object in photosArray
 photosArray.forEach((photo) => {
   // Create <a> to link to Unsplash
  const item = document.createElement('a');
//  console.log(photo.description)
  setAttributes(item, {
   href: photo.links.html,
   target:'_blank'
  })
// Check if the text value is null 
   let photoText = photo.description
   console.log(photoText)
   if (!photoText) {
     photoText =  " "
     console.log(photoText)
   } else {
      photoText 
   }
   // Create <img> for photo
  const img = document.createElement('img');
  setAttributes(img, {
   src: photo.urls.regular,
   title: `${photoText}`,
   alt: photo.description,
  })

  // item.setAttribute('href', photo.links.html);
  // item.setAttribute('target', '_blank');
  // img.setAttribute('src', photo.urls.regular);
  // img.setAttribute('alt', photo.description);
  // img.setAttribute('title', photo.description);
  
  //  Event Listener, check when each image is finished loading
   img.addEventListener('load', imageLoaded);
   
  // Put <img> inside <a> , then put both inside imageContainer Element
  item.appendChild(img);
  imageContainer.appendChild(item);
 })
}


// Get photos from Unsplash API
async function getPhotos() {
 try {
  const response = await fetch(apiUrl);
  photosArray = await response.json();
  // console.log(photosArray)
  displayPhotos();
 } catch (error) {
  // Catch Error Here
 }
}

// Check to see if scrolling neat bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
  //  console.log('window.innerHeight',window.innerHeight)
  //  console.log('window.scrollY',window.scrollY)
  //  console.log('window.innerHeight + window.scrollY',window.innerHeight + window.scrollY)
  //  console.log('document.body.offsetHeight - 1000',document.body.offsetHeight - 1000)
 
//  console.log('scrolled')
})

// OnLoad
getPhotos()