

let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let text = document.getElementById('text');
var btn = document.querySelector('.btn');
let header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let value = window.scrollY;
    text.style.marginTop = value * 1.5 + 'px';
    btn.style.marginTop = value * 1 + 'px';

    let hideThreshold = 520; 
    if (value > hideThreshold) {
        moon.style.display = 'none';
    } else {
        moon.style.display = 'block'; 
    }
});


let amplitude = 180; 
function updateMoonPosition() {
    let textRect = text.getBoundingClientRect();
    let centerX = textRect.left + textRect.width / 2;
    let centerY = textRect.top + textRect.height / 2;

    let time = performance.now() * 0.001; 
    let xOffset = Math.sin(time) * amplitude;
    let yOffset = Math.sin(time * 2) * amplitude;

    let x = centerX + xOffset;
    let y = centerY + yOffset;

    moon.style.left = x + 'px';
    moon.style.top = y + 'px';
}

setInterval(updateMoonPosition, 10); 

function rotateBox(box) {
    box.style.transform = "rotate(360deg)";
}


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function handleScrollAnimations() {
    const boxes = document.querySelectorAll('.header-card');
    boxes.forEach(box => {
        if (isInViewport(box)) {
            box.classList.add('visible');
        }
    });
}


function rotateBox(box) {
    box.style.transform += " rotate(360deg)";
}


window.addEventListener('scroll', handleScrollAnimations);


handleScrollAnimations();

// Get the audio element and audio controls
var audio = document.getElementById("bgMusic");
var audioIcon = document.getElementById("audio-icon");

// Function to toggle audio play/pause
function toggleAudio() {
    if (audio.paused) {
        audio.play();
        audioIcon.className = "fas fa-pause";
    } else {
        audio.pause();
        audioIcon.className = "fas fa-play";
    }
}

// Function to set the volume
function setVolume(volume) {
    audio.volume = volume;
}

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
