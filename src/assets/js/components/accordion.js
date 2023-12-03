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
