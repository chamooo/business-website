document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    window.addEventListener('scroll', highlightNavItem);

    function highlightNavItem() {
        const scrollY = window.scrollY;

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                if (
                    targetSection.offsetTop - document.querySelector('header').offsetHeight <= scrollY + 50 &&
                    targetSection.offsetTop - document.querySelector('header').offsetHeight + targetSection.offsetHeight > scrollY
                ) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    }

});
