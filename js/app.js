// Global Vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
    })
    .catch(function (err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.


// Play when ready
video.addEventListener('canplay', function (e) {
    if (!streaming) {
        // Set video / canvas height
        setWidthAndHeight();

        streaming = true;
    }
}, false);

function setWidthAndHeight(){
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
}

photoButton.addEventListener('click',function(e){

    // Create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
      // set canvas props
      canvas.width = width;
      canvas.height = height;
      // Draw an image of the video on the canvas
      context.drawImage(video, 0, 0, width, height);

      // Create image from the canvas
      const imgUrl = canvas.toDataURL('image/png');

      // Create img element
      const img = document.createElement('img');

      // Set img src
      img.setAttribute('src', imgUrl);

      // Set image filter
      img.style.filter = filter;

      // Add image to photos
      photos.appendChild(img);
    }

    e.preventDefault();
},false);

photoFilter.addEventListener('change',function(e){

    filter = e.target.value;
    video.style.filter = filter;

},false);

clearButton.addEventListener('click',function(e){

    photos.innerHTML = '';

    filter = 'None';
    video.style.filter = filter;
    photoFilter.selectedIndex = 0;

    e.preventDefault();
},false);

window.addEventListener('resize',function(){

    if(window.innerWidth < 500){
    width = window.innerWidth - 60;
    document.querySelector('.top-container').style.width = width;

    setWidthAndHeight();
    }else{
        width = 500;
        document.querySelector('.top-container').style.width = width;
    }

})

window.addEventListener('load',function(){
    if(window.innerWidth < 500){
        width = window.innerWidth - 60;
        document.querySelector('.top-container').style.width = width + 'px';
        // document.querySelector('.btn').style.width = 80 + '%';

        setWidthAndHeight();
    }else{
        width = 500;
        document.querySelector('.top-container').style.width = width +'px';
    }


})