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