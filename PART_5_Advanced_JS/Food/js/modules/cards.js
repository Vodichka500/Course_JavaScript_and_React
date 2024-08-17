import {getResource} from "../services/services";

function cards(){
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
}

export default cards;