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
