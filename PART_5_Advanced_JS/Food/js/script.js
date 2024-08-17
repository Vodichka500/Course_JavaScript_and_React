import tabs        from './modules/tabs';
import modal, {openModal} from './modules/modal';
import calculator  from './modules/calculator';
import cards       from './modules/cards';
import form        from './modules/forms';
import slider      from './modules/slider';
import timer       from './modules/timer';


window.addEventListener('DOMContentLoaded', ()=>{

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);

    tabs('.tabheader__item', '.tabcontent',".tabheader__items",'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    calculator();
    cards();
    form('form',modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider__inner'
    });
    timer('.timer' ,'2024-08-25');
});