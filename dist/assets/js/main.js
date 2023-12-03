// Form validation ---------------------------------

let countryData;

let index = 0;

const phoneInput = document.querySelectorAll('.phone');

phoneInput.forEach((input, i) => {
    index = i;
    const phoneInput = window.intlTelInput(input, {
        preferredCountries: ['ua', 'pl'],
        initialCountry: 'ua',
        utilsScript:
            'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.21/js/utils.js',
    });

    countryData = phoneInput.getSelectedCountryData();
    input.value = `+${countryData.dialCode}`;
    input.addEventListener('countrychange', function () {
        countryData = phoneInput.getSelectedCountryData();
        input.value = `+${countryData.dialCode}`;
    });
});

[].forEach.call(document.querySelectorAll('.phone'), function (input) {
    var keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        var matrix = `+${countryData.dialCode}-___-___-___`,
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, ''),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = new_value.indexOf('_');
        var num = countryData.dialCode.length + 1;
        if (i != -1) {
            i < num && (i = 1);
            new_value = new_value.slice(0, i);
        }
        var reg = matrix
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
                return '\\d{1,' + a.length + '}';
            })
            .replace(/[+]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (!reg.test(this.value) || this.value.length < num || (keyCode > 47 && keyCode < 58))
            this.value = new_value;
        if (event.type == 'blur' && this.value.length < num) this.value = '';
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);

    input.addEventListener('keydown', (e) => {
        input.setSelectionRange(input.value.length, input.value.length);
    });
});

function validateForm() {
    function validateTextField(input) {
        // const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄ']{1,}( [a-zA-Zа-яА-ЯіІїЇєЄ']{1,}){0,2}$/;
        if (input.value.length > 1) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }

    function validateEmail(input) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(input.value.trim())) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }

    function validatePhone(input) {
        let regex = new RegExp(`^\\+?${countryData.dialCode}-\\d{3}-\\d{3}-\\d{3}$`);
        if (countryData.dialCode === '44') {
            regex = new RegExp(`^\\+?${countryData.dialCode}\\d{1}-\\d{3}-\\d{3}-\\d{3}$`);
        }

        if (regex.test(input.value)) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }

    function validateIfEmpty(input) {
        if (input.value.length) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }


    const forms = document.querySelectorAll('form');
    console.log('awd')
    forms.forEach((form) => {
        const inputs = form.querySelectorAll('.text-field, .email, .phone');
        const selects = form.querySelectorAll('select[required]');
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        const someCheckboxes = form.querySelectorAll('input[type="checkbox"].some');
        const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
        const submitBtn = form.querySelector('[type="submit"]');

        function validateTextInput(input) {
            if (input.classList.contains('text-field')) {
                return validateTextField(input);
            } else if (input.classList.contains('email')) {
                return validateEmail(input);
            } else if (input.classList.contains('phone')) {
                return validatePhone(input);
            } else {
                return validateIfEmpty(input)
            }
        }

        function validateCheckboxes() {
            if (someCheckboxes.length && ![...someCheckboxes].some(checkbox => checkbox.checked)) {
                return false;
            }
            if (requiredCheckboxes.length && ![...requiredCheckboxes].every(checkbox => checkbox.checked)) {
                return false;
            }
            return true;
        }

        // const disableButton = () => {
        //    const validateSelects = [...selects].every(select => select.value.length);
        //
        //    if ([...inputs].some(input => input.value.length > 3)) {
        //       const allInputsValid = ([...inputs].every(validateTextInput) && validateCheckboxes() && validateSelects);
        //       submitBtn.disabled = !allInputsValid;
        //    }
        // };


        submitBtn.addEventListener('click', e => {
            const validateSelects = [...selects].every(select => select.value.length);
            if ([...inputs].some(input => input.value.length > 3)) {
                const allInputsValid = ([...inputs].every(validateTextInput) && validateCheckboxes() && validateSelects);
                inputs.forEach(input => {
                    validateTextInput(input);
                })
                if(!allInputsValid) {
                    e.preventDefault();
                } else {
                    e.target.textContent = 'Please, wait...';
                    e.target.disabled = true;

                    e.preventDefault();
                    setTimeout(() => {
                        e.target.textContent = 'Leave request';
                        e.target.disabled = false;

                        document.querySelector('.alert').innerHTML = 'Your message has been <b>successfully</b> sent';
                        form.reset();
                        setTimeout(() => {
                            document.querySelector('.alert').innerHTML = '';
                        }, 7000)
                    }, 1000)
                }
            }
        }, true);


        // selects.forEach(select => {
        //    select.addEventListener('change', e => {
        //       // disableButton();
        //    });
        // })
        //
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
            });
        });


        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                validateTextInput(input);
            })
        });
    });
}

validateForm();

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



window.addEventListener("DOMContentLoaded", function () {
  const mainSliders = document.querySelectorAll(".main-slider");
  if (mainSliders.length) {
    mainSliders.forEach((slider) => {
      const prev = slider.querySelector(".slider-prev");
      const next = slider.querySelector(".slider-next");
      const slidesPerView = slider.getAttribute("data-slides");
      const spaceBetween = slider.getAttribute("data-space");

      new Swiper(slider, {
        spaceBetween,
        speed: 600,
        grabCursor: true,

        keyboard: {
          enabled: true,
        },

        navigation: {
          prevEl: prev,
          nextEl: next,
        },

        breakpoints: {
          992: {
            slidesPerView,
          },
          768: {
            slidesPerView: 2.8,
          },
          479: {
            slidesPerView: 2.25,
          },
          0: {
            slidesPerView: 1.25,
          },
        },
      });
    });
  }

  const singleSliders = document.querySelectorAll('.js-single-slider');
  singleSliders.forEach(slider => {
    const prev = slider.querySelector(".slider-prev");
    const next = slider.querySelector(".slider-next");
    const pagination = slider.querySelector('.swiper-pagination');
    new Swiper(slider, {
      spaceBetween: 0,
      speed: 600,
      grabCursor: true,
      slidesPerView: 1,
      effect: "fade",
      loop: true,
      initialSlide: 0,
      autoplay: {
        delay: 5000,
      },
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: pagination,
      },
      navigation: {
        prevEl: prev,
        nextEl: next,
      },
    });
  })

  const mobileSliders = document.querySelectorAll(".mobile-slider");
  if (mobileSliders.length) {
    mobileSliders.forEach((slider) => {
      const prev = slider.querySelector(".slider-prev");
      const next = slider.querySelector(".slider-next");

      new Swiper(slider, {
        spaceBetween: 32,
        speed: 600,
        grabCursor: true,
        keyboard: {
          enabled: true,
        },

        // Navigation arrows
        navigation: {
          prevEl: prev,
          nextEl: next,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          479: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    });
  }

  const sliders = document.querySelectorAll(".product-info__slider");
  sliders.forEach(sliderElement => {
    const productSlider = new Swiper(sliderElement, {
      spaceBetween: 50,
      slidesPerView: 1,
      navigation: {
        prevEl: sliderElement.querySelector('.slider-prev'),
        nextEl: sliderElement.querySelector('.slider-next'),
      },
      breakpoints: {
        992: {
          loop: false,
        },
        1: {
          loop: true,
        }
      }
    });

    const productThumbs = new Swiper(sliderElement.nextElementSibling, {
      spaceBetween: 16,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      direction: "vertical",

      breakpoints: {
        992: {
          slidesPerView: 6,
        },
        768: {
          slidesPerView: 4,
        },
        0: {
          spaceBetween: 8,
          slidesPerView: 4,
        },
      },
    });

    productSlider.controller.control = productThumbs;
    productThumbs.controller.control = productSlider;

    productThumbs.on("click", function () {
      const clickedSlideIndex = productThumbs.clickedIndex;
      productSlider.slideTo(clickedSlideIndex);

      productThumbs.slides.forEach(function (slideEl) {
        slideEl.classList.remove("swiper-slide-active");
      });

      productThumbs.slides[clickedSlideIndex].classList.add(
          "swiper-slide-active",
      );
    });
  });


  const variantsSlider = document.querySelectorAll(".product-variants__slider");
  if (variantsSlider.length) {
    variantsSlider.forEach((slider) => {
      const slidesPerView = slider.getAttribute("data-slides");

      new Swiper(slider, {
        spaceBetween: 16,
        speed: 500,
        grabCursor: true,

        keyboard: {
          enabled: true,
        },

        breakpoints: {
          992: {
            slidesPerView,
          },
          768: {
            slidesPerView: "auto",
          },
        },
      });
    });
  }

  // const sliderText = document.querySelectorAll('.row-s-facts__tslider');
  // const sliderPhotos = document.querySelectorAll('.row-s-facts__islider');
  //
  // // hero slider
  // if (sliderText.length && sliderPhotos.length) {
  //     let photosSwiper;
  //     let textSwiper;
  //
  //     sliderPhotos.forEach(photoSlider => {
  //         photosSwiper = new Swiper(photoSlider, {
  //             slidesPerView: 1,
  //             spaceBetween: 24,
  //             speed: 1000,
  //
  //             breakpoints: {
  //                 768: {
  //                     slidesPerView: 1,
  //                     spaceBetween: 26,
  //                 },
  //                 479: {
  //                     slidesPerView: 1,
  //                     spaceBetween: 26,
  //                 },
  //                 100: {
  //                     slidesPerView: 1,
  //                     spaceBetween: 26,
  //                 }
  //             },
  //             on: {
  //                 slideChange: (swiper) => {
  //                     let index = swiper.activeIndex;
  //                     textSwiper.slideTo(index);
  //                 }
  //             }
  //         });
  //     });
  //
  //     sliderText.forEach(textSlider => {
  //         const prev = document.querySelector('.row-s-facts .slider-prev');
  //         const next = document.querySelector('.row-s-facts .slider-next');
  //         textSwiper = new Swiper(textSlider, {
  //             slidesPerView: 1,
  //             speed: 1000,
  //             spaceBetween: 24,
  //             navigation: {
  //                 prevEl: prev,
  //                 nextEl: next,
  //             },
  //             on: {
  //                 slideChange: (swiper) => {
  //                     let index = swiper.activeIndex;
  //                     photosSwiper.slideTo(index);
  //                 }
  //             }
  //         });
  //     });
  // }
});

// faq -----------------------------------------------
function expandContent(trigger, content, btn, collapsedHeight) {
    let isExpanded = false;

    trigger.addEventListener('click', e => {
        if(!isExpanded) {
            content.style.maxHeight = content.scrollHeight + "px";
            btn.classList.add('expanded-btn');
            isExpanded = true;
            trigger.classList.add('active')
        } else {
            content.style.maxHeight = collapsedHeight + 'px';
            btn.classList.remove('expanded-btn');
            isExpanded = false;
            trigger.classList.remove('active')
        }
    });
}


const accordionButton = document.querySelectorAll('.list-content-accordion__trigger')
const accordionItemContent = document.querySelectorAll('.body-accordion');
const accordionExpandBtn = document.querySelectorAll('.expand-btn');
if(accordionButton.length) {
    accordionButton.forEach((btn, index) => {
        expandContent(btn, accordionItemContent[index], accordionExpandBtn[index], 0);
    });
}

window.addEventListener("DOMContentLoaded", function () {


    // On scroll animation ----------------------------------------------------
    //
    // const animItems = documment.querySelectorAll('.anim_item');
    //
    // if(animItems.length > 0) {
    //     document.addEventListener('scroll', animOnScroll);
    //     document.querySelectorAll('.first_screen_anim').forEach(item => {
    //         setTimeout(() => item.classList.add('_active_anim'), 100);
    //     })
    // }
    //
    // function animOnScroll() {
    //     animItems.forEach(animItem => {
    //         const animItemHeight = animItem.offsetHeight;
    //         const animItemOffset = offset(animItem).top;
    //         const animStart = 1;
    //
    //         let animItemPoint = window.innerHeight - animItemHeight / animStart;
    //         if(animItemHeight > window.innerHeight) {
    //             animItemPoint = window.innerHeight - window.innerHeight / animStart;
    //         }
    //
    //         if((pageYOffset > animItemOffset - animItemPoint) &&
    //             pageYOffset < (animItemOffset + animItemHeight)) {
    //             let time = setTimeout(() => {
    //                 animItem.classList.add('_active_anim');
    //             }, 100);
    //         }
    //     });
    // }
    //
    // function offset(el) {
    //     const rect = el.getBoundingClientRect(),
    //         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    //         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //     return {
    //         top: rect.top + scrollTop,
    //         left: rect.left + scrollLeft
    //     };
    // }
})
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

