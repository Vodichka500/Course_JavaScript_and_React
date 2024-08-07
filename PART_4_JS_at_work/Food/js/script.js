window.addEventListener('DOMContentLoaded', ()=>{

    //  TABS


    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent(){
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //TIMER


    const  deadline = '2024-08-25';

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t > 0){
            days = Math.floor(t / (1000*60*60*24));
            hours = Math.floor((t/1000*60*60) % 24);
            minutes = Math.floor((t / 1000 / 60)%60);
            seconds = Math.floor((t/1000)%60);
        } else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        return {
            'total': days,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    function getZero(num){
        if(num >= 0 && num <10){
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock () {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // MODAL WINDOW
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(modalTimerId);
    }
    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');


    modalTrigger.forEach((btn) => {
        btn.addEventListener(('click'), ()=>{
            openModal();
        });
    })


    modalClose.addEventListener(('click'), ()=>{
        closeModal();
    })
    modal.addEventListener(('click'), (e) => {
        if(e.target === modal){
            closeModal();
        }
    })
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);
    clearInterval(modalTimerId);
    function showModalByScroll(){
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // MENU CLASS
    class Menu{
        constructor(imgSrc, name, description, price, parentSelector, ...classes ) {
            this.imgSrc = imgSrc;
            this.name = name;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();

            this.classes = classes //REST operator | Array
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        createMenuCard(){
            const  element = document.createElement('div');
            if(this.classes.length !== 0){
                this.classes.forEach((className) => element.classList.add(className));
            } else {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            element.innerHTML = `

                    <img src="${this.imgSrc}" alt="vegy">
                    <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>              
            `;
            this.parent.append(element);
        }
    }

    const menusSelection = document.querySelector('.menu__field').firstElementChild;
    console.log(menusSelection);
    const desc1 = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!'
    const desc2 = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';
    const desc3 = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.\n';

    //const menu1 = new Menu('img/tabs/vegy.jpg', 'Фитнес', desc1, 229);
    //const menu2 = new Menu('img/tabs/elite.jpg', 'Премиум', desc2, 550);
    //const menu3 = new Menu('img/tabs/post.jpg', 'Постное', desc3, 430);
    //menusSelection.innerHTML += menu1.createMenuCard();
    //menusSelection.innerHTML += menu2.createMenuCard();
    //menusSelection.innerHTML += menu3.createMenuCard();

    new Menu('img/tabs/vegy.jpg', 'Фитнес', desc1, 1, '.menu .container', 'menu__item'  , 'big').createMenuCard();
    new Menu('img/tabs/elite.jpg', 'Премиум', desc2, 100, '.menu .container', 'menu__item').createMenuCard();
    new  Menu(
        'img/tabs/post.jpg',
        'Постное',
        desc3,
        10,
        '.menu .container',

    ).createMenuCard();




});