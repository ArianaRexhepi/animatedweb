

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
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btnn');
    const items = document.querySelectorAll('.item');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
  
        buttons.forEach(btnn => btnn.classList.remove('active'));
        this.classList.add('active');
  
        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || filter === category) {
            fadeIn(item);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    function fadeIn(element) {
      let opacity = 0;
      element.style.display = 'block';
  
      const timer = setInterval(function() {
        if (opacity >= 1) {
          clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
      }, 50); // Adjust the delay between each image fade-in
    }
  });
  
  
  