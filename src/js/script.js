const swiper = new Swiper('.swiper', {
    loop: true,
    //autoHeight: true,
    speed: 1200,
    //preventInteractionOnTransition: true,
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
});

function tabs(tabClass, tabContentClass) {
    const tabs = document.querySelectorAll("." + tabClass),
          tabsContent = document.querySelectorAll('.' + tabContentClass);
    
    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            tabs.forEach(item => item.classList.remove(tabClass + "_active"));
            e.currentTarget.classList.add(tabClass + "_active");

            tabsContent.forEach(tabContent => {
                tabContent.classList.remove(tabContentClass + "_active");
                if (tabContent.getAttribute("data-tab") == e.currentTarget.getAttribute("data-tab-to")) {
                    tabContent.classList.add(tabContentClass + "_active");
                }
            });
        });
    });
}

function tabItems(catalogItemLinkClass) {
    const tabLinks = document.querySelectorAll('.' + catalogItemLinkClass);
    
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabContent = e.target.parentElement;
            const tabList = tabContent.nextElementSibling || tabContent.previousElementSibling;

            tabContent.classList.toggle(tabContent.classList[0] + "_active");
            tabList.classList.toggle(tabList.classList[0] + "_active");
        });
    });
}

//-----------------modal start
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    const overlay = document.querySelector('.overlay');
    overlay.style.display = "block";
    modal.style.display = "block";
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    const overlay = document.querySelector('.overlay');
    overlay.style.display = "none";
    modal.style.display = "none";
}


function modal(modalSelector, buttonSelector) {
    const modal = document.querySelector(modalSelector);
    const overlay = document.querySelector('.overlay');
    const buttons = document.querySelectorAll(buttonSelector);
    
    if (buttons) {
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                openModal(modalSelector);
                
                if (modal.getAttribute('id') == "order") {
                    const text = button.parentElement.parentElement.querySelector('.catalog-item__subtitle').textContent;
                    //const text = document.querySelectorAll(".catalog-item__subtitle")[index].textContent;
                    modal.querySelector('.modal__descr').textContent = text;
                }
            });
        });
    }
    
    overlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('overlay') || target.classList.contains('modal__close')) {
            closeModal(modalSelector);
        }
    });
}
//----------modal end

// ajax start

function sendFormData(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = new FormData(form);
            // let result = "";
            // const object = Object.fromEntries(data.entries());
            // for (atr in object) {
            //     result += `${atr}=${object[atr]}&`;
            // }
            // result = result.substring(0, result.length - 1);
            // console.log(result)
            //const dataSerlized = JSON.stringify(Object.fromEntries(data.entries())) // const json = JSON.stringify(Object.fromEntries(formData.entries()));

            fetch('server/server.php', {
                method: "POST",
                body: data
            }).then(() => {
                console.log("Данные отправлены");
                form.reset();
                closeModal('#consultation');
                openModal('#thanks');

            }).catch(err => {
                console.log(err);
            })
        })
    });
}

// ajax end


tabItems("catalog-item__link");
tabs("catalog__tab", "catalog__content");
modal('#consultation', '[data-modal="consultation"]');
modal('#order', '.button_catalog');
modal('#thanks');

sendFormData('.feed-form');