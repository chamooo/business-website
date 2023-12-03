function removeClass(elements, className) {
    elements.forEach(element => {
        element.classList.remove(className);
    })
}


function playVideo(e) {
    const IDLE_TIME = 2000;
    const BUTTON_SHOW_DELAY = 2000;

    const button = e.currentTarget;
    const buttonName = button.getAttribute('data-video');
    const video = document.querySelector(`video[data-name="${buttonName}"]`);

    const isPlaying = video.classList.contains('playing');
    let timeout;

    function hideElementOnIdle(element, idleTime) {
        function hideElement() {
            element.classList.add('playing');
        }

        function resetTimeout() {
            clearTimeout(timeout);
            element.classList.remove('playing');
            timeout = setTimeout(hideElement, idleTime);
        }

        document.addEventListener('mousemove', resetTimeout);
        document.addEventListener('keydown', resetTimeout);

        resetTimeout();
    }

    hideElementOnIdle(button, IDLE_TIME);

    function setPause() {
        clearTimeout(timeout); // Clear the timeout that hides the element

        if (video && button) {
            video.pause();
            video.removeAttribute('controls');
            video.classList.remove('playing');
            button.classList.remove('playing');
        }
    }

    if (!isPlaying) {
        video.play();
        video.setAttribute('controls', 'true');
        video.classList.add('playing');
        setTimeout(() => button.classList.add('playing'), BUTTON_SHOW_DELAY);
    } else {
        setPause();
    }

    video.addEventListener("click", () => setPause());
    video.addEventListener("ended", () => setPause());
}


const playButtons = document.querySelectorAll('button.play-btn');
playButtons.forEach(btn => btn.addEventListener('click', e => playVideo(e)))