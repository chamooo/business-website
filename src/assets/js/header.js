window.addEventListener('DOMContentLoaded', function () {

    // header ------------------------------------------------
    let menuTriggers = document.querySelectorAll('.open-menu-btn');
    const header = document.querySelector('header');

    let currentMenuIndex = 0;
    const submenuLayers = document.querySelectorAll('[data-menu]');

    menuTriggers.forEach(menuTrigger => {
        menuTrigger.addEventListener('click', () => {
            if(menuTrigger.classList.contains('hamburger-js')) {
                header.classList.toggle('active-header');
                document.body.classList.toggle('lock');
                currentMenuIndex = 0;
                submenuLayers.forEach(item => item.classList.remove('active-header'))
            }
        });
    });



    function themeHeaderOnScroll(my_header, offset = 0) {
        const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

        function changeTheme() {
            if (scrollPosition() > 400) {
                my_header.classList.add('scrolled');
            } else if (scrollPosition() < 730) {
                my_header.classList.remove('scrolled');
            }
        }

        function scrollListener(e) {
            changeTheme(e);
        }

        window.addEventListener("scroll", scrollListener);
    }

    themeHeaderOnScroll(header, 600);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
        link.addEventListener('click', () => {
            if(window.innerWidth < 992) {
                header.classList.remove('active-header');
                document.body.classList.remove('lock');
            }
        })
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    }

});


