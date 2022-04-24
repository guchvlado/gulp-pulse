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
tabItems("catalog-item__link");
tabs("catalog__tab", "catalog__content");