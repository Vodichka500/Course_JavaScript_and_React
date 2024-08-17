function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
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
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        curr = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

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
}

export default slider;