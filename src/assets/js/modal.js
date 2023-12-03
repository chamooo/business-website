const openModalBtns = document.querySelectorAll('.open-modal');
const modalWindows = document.querySelectorAll('.modal');

function openModal(modal) {
    if (!modal) return;
    closeModalAnimation();
    modal.style.display = 'flex';
    document.body.classList.add('lock');

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(event) {
    const modal = document.querySelector('.modal.active');
    // if (!modal) return;
    if (
        event.target.classList.contains('close-btn') ||
        (event.target.classList.contains('modal') && modal.classList.contains('active'))
    ) {
        closeModalAnimation();
    }
}

function closeModalAnimation() {
    const modal = document.querySelector('.modal.active');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.classList.remove('lock');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 350);
}

openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetModal = btn.getAttribute('data-target');
        const modalWindow = document.querySelector(`[data-modal="${targetModal}"]`);
        openModal(modalWindow, btn);
        if(btn.getAttribute('data-src')) {
            const videoSrc = btn.getAttribute('data-src');
            console.log(videoSrc)
            const modalVideoPlayerSrc = document.querySelector('.modal[data-modal="video"] video source');
            const modalVideoPlayer = document.querySelector('.modal[data-modal="video"] video');
            if(videoSrc) {
                modalVideoPlayerSrc.src = videoSrc;
                modalVideoPlayer.style.display = 'block';
            } else {
                document.querySelector('.not-found').classList.add('active');
                modalVideoPlayer.style.display = 'none';
            }
        }
    });
});

modalWindows.forEach((modal) => {
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal(e);
    });
});

document.addEventListener('click', (e) => {
    closeModal(e);
});

document.addEventListener('click', e => {
    if(e.target.classList.contains('blurred-overlay') || e.target.classList.contains('search-modal__container')) {
        document.querySelectorAll('.blurred-overlay').forEach(item => item.classList.remove('active'))
    }
});

document.querySelector('.search-modal input')?.addEventListener('keypress', e => {
    if(e.key === "Enter") {
        document.querySelectorAll('.blurred-overlay').forEach(item => item.classList.remove('active'))
    }
});