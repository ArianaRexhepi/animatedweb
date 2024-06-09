
    window.addEventListener('scroll', function() {
        let moon = document.getElementById('moon');
        let text = document.getElementById('text');
        let soundPlayed = false;

        // Get the scroll position
        let scrollPosition = window.scrollY;

        // Start rotation and move text after scrolling down a certain amount
        if (scrollPosition > 100) {
            moon.style.animationPlayState = 'running';
            text.style.animationPlayState = 'running';

            if (!soundPlayed) {
                let audio = new Audio('path/to/sound.mp3');
                audio.play();
                soundPlayed = true;
            }
        } else {
            moon.style.animationPlayState = 'paused';
            text.style.animationPlayState = 'paused';
        }
    });
