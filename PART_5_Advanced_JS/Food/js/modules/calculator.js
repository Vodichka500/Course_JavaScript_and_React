function calculator(){

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
}

export default calculator;