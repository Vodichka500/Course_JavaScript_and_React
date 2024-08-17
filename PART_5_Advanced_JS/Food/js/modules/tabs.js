function tabs(tabsSelector, tabsContentSelector,tabsParentsSelector, activeClass ){
    //  TABS
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentsSelector);

    function hideTabContent(activeClass){
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });
        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0, activeClass){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent(activeClass);
    showTabContent(0,activeClass);

    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i)=>{
                if(target === item) {
                    hideTabContent(activeClass);
                    showTabContent(i, activeClass);
                }
            });
        }
    });
}

export default tabs;