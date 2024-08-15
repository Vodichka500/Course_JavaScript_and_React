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


    modal.addEventListener(('click'), (e) => {
        if(e.target === modal || e.target === modalClose ){
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
            //old creating menu
    /*
    const menusSelection = document.querySelector('.menu__field').firstElementChild;
    console.log(menusSelection);
    const desc1 = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!'
    const desc2 = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';
    const desc3 = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.\n';

    const menu1 = new Menu('img/tabs/vegy.jpg', 'Фитнес', desc1, 229);
    const menu2 = new Menu('img/tabs/elite.jpg', 'Премиум', desc2, 550);
    const menu3 = new Menu('img/tabs/post.jpg', 'Постное', desc3, 430);
    menusSelection.innerHTML += menu1.createMenuCard();
    menusSelection.innerHTML += menu2.createMenuCard();
    menusSelection.innerHTML += menu3.createMenuCard();

     new Menu('img/tabs/vegy.jpg', 'Фитнес', desc1, 1, '.menu .container', 'menu__item'  , 'big').createMenuCard();
      new Menu('img/tabs/elite.jpg', 'Премиум', desc2, 100, '.menu .container', 'menu__item').createMenuCard();

    new  Menu(
        'img/tabs/post.jpg',
        'Постное',
        desc3,
        10,
        '.menu .container',

    ).createMenuCard();
    */

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Menu(img, title, descr, price, ".menu .container").createMenuCard();
            });
        });
    // FORMS

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };
    async function getResource(url) {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    function bindPostData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', json)
            .then(data => data.text())
            .then((data)=>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            })
        })
    }

    function showThanksModal(message) {
        const  prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div  data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }

    // SLIDER

    //  My variation of slider
    /*
    const leftButton = document.querySelector('.offer__slider-prev'),
        rightButton = document.querySelector('.offer__slider-next'),
        current = document.getElementById('current'),
        total = document.getElementById('total'),
        imagePlace = document.querySelector('.offer__slide');

    let images = [
        {src: "img/slider/pepper.jpg", alt: "pepper"},
        {src: "img/slider/olive-oil.jpg", alt: "oil"},
        {src: "img/slider/food-12.jpg", alt: "food"},
        {src: "img/slider/paprika.jpg", alt: "paprika"}
    ];

    let counterSlide = 1;
    current.innerText = counterSlide<=9 ? '0'+counterSlide : counterSlide;

    let nextSlideInterval = setInterval(nextImage,5000);

    leftButton.addEventListener('click', (e) => {
        e.preventDefault();
        prevImage();
    })
    rightButton.addEventListener('click', (e) => {
        e.preventDefault();
        nextImage();
    })

    total.innerText = images.length<=9 ? '0'+images.length : images.length;

    function nextImage(){
        counterSlide ++;
        if(counterSlide > images.length){
            counterSlide = 1;
        }
        current.innerText = counterSlide<=9 ? '0'+counterSlide : counterSlide;
        const newImage = document.createElement('img');
        newImage.src = images[counterSlide-1].src;
        newImage.alt = images[counterSlide-1].alt;

        newImage.classList.add('fade');
        imagePlace.lastElementChild.remove();
        imagePlace.append(newImage);
    }
    function prevImage(){
        counterSlide --;
        if(counterSlide < 1){
            counterSlide = images.length;
        }
        current.innerText = counterSlide<=9 ? '0'+counterSlide : counterSlide;
        const newImage = document.createElement('img');
        newImage.src = images[counterSlide-1].src;
        newImage.alt = images[counterSlide-1].alt;
        imagePlace.lastElementChild.remove();
        imagePlace.append(newImage);
    }

     */

    //  SLIDER vol.1
    /*
    const  slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        curr = document.querySelector('#current');
    let slideIndex = 1;
    showSlides(slideIndex);

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = `${slides.length}`;
    }

    function showSlides(n){
        if(n>slides.length){
            slideIndex = 1;
        }
        if(slideIndex<1){
            slideIndex = slides.length;
        }
        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex-1].style.display = 'block';

        if(slideIndex < 10){
            curr.textContent = `0${slideIndex}`;
        } else {
            curr.textContent = `${slideIndex}`;
        }
    }

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });

     */

    //  SLIDER vol.2
    const  slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        curr = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider__inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector('.offer__slider');
    let slideIndex = 1;
    let offset = 0;

    slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = `${slides.length}`;
    slideIndex<10 ? curr.textContent = `0${slideIndex}` : curr.textContent = slideIndex;

    slidesField.style.width = 100*slides.length+ '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => item.width = width);
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];

    indicators.classList.add('caurousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    for(let i = 0; i< slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        indicators.append(dot);
        dots.push(dot);
    }
    changeDotColor(dots, 0);
    function changeDotColor(dots, i){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[i].style.opacity = '1';
    }

    next.addEventListener('click', () => {
        if(offset === +width.slice(0,width.length-2) * (slides.length - 1)){ //
            offset = 0;
        } else {
            offset += +width.slice(0,width.length-2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if(slideIndex >= slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideIndex<10 ? curr.textContent = `0${slideIndex}` : curr.textContent = slideIndex;
        changeDotColor(dots, slideIndex-1);
    });

    prev.addEventListener('click', () => {
        if(offset === 0){ //
            offset = +width.slice(0,width.length-2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0,width.length-2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if(slideIndex <= 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideIndex<10 ? curr.textContent = `0${slideIndex}` : curr.textContent = slideIndex;
        changeDotColor(dots, slideIndex-1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slideIndex < 10 ? curr.textContent = `0${slideIndex}` : curr.textContent = slideIndex;
            changeDotColor(dots, slideIndex - 1);
        })
    })

    // Calculator
    let sex, heigth, weight, age,
        active = 1.375,
        val;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if(localStorage.getItem('active')){
        active = localStorage.getItem('active');
    } else {
        active = 1.375;
        localStorage.setItem('active', active);
    }

    function changeStartSettings (selector){
        const elements = document.querySelectorAll(`${selector} div`);
        elements.forEach(element => {
            element.classList.remove('calculating__choose-item_active');

            if(element.getAttribute('id') === localStorage.getItem('sex')){
                element.classList.add('calculating__choose-item_active');
            }
            if(element.getAttribute('data-active') === localStorage.getItem('active')){
                element.classList.add('calculating__choose-item_active');
            }

            calcAndDisplay();
        })
    }

    changeStartSettings('#gender');
    changeStartSettings('.calculating__choose_big');
    calcAndDisplay();


    function calcAndDisplay(){
        if(!sex || !heigth || !weight || !age || !active ){
            document.querySelector(`.calculating__result span`).textContent = '____';
        } else {
            if(sex === 'female'){
                val = (447.6 + (9.2 * weight) + (3.1 * heigth) - (4.3 * age))*active;
                document.querySelector(`.calculating__result span`).textContent = Math.floor(val);

            } else {
                val = (88.8 + (13.4 * weight) + (4.8 * heigth) - (5.7 * age))*active;
                document.querySelector(`.calculating__result span`).textContent = Math.floor(val);
            }
        }
    }
    function getStaticInfo(parentElement){
        const elements = document.querySelectorAll(`${parentElement} div`);
        elements.forEach(element => {
            element.addEventListener('click',(e) => {
                if(e.target.getAttribute('data-active')){
                    active = e.target.getAttribute('data-active');
                    localStorage.setItem('active', e.target.getAttribute('data-active'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active');
                });

                e.target.classList.add('calculating__choose-item_active');

                calcAndDisplay();
            })
        })
    }

    function getActiveInfo(selector){
        const  input = document.querySelector(`#${selector}`);
        input.addEventListener('input',() => {

            if(/\D/g.test(input.value)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')){
                case 'height':
                    heigth = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age =  +input.value;
                    break;
            }
            calcAndDisplay();
        })
    }

    getStaticInfo('#gender');
    getStaticInfo('.calculating__choose_big')
    getActiveInfo('height');
    getActiveInfo('weight');
    getActiveInfo('age');
});