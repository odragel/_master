export class CardView{
    constructor(){}

    createCard(cardValue, cardBack){
        let card = document.createElement('div');
        card.classList.add('card');

        let front = document.createElement('div');
        front.classList.add('front');

        let back = document.createElement('div');
        back.classList.add('back');


        let img = document.createElement('img');
        img.classList.add('img-card');
        img.setAttribute('src', cardValue);

        front.appendChild(img);

        let imgBack = document.createElement('img');
        imgBack.classList.add('img-card');
        imgBack.setAttribute('src', cardBack);

        back.appendChild(imgBack);

        card.appendChild(front);
        card.appendChild(back);

        card.classList.add('closed-card');
      return card;
    }

    addClickedData(card){
        card.data = "clicked";
    }

    removeClickedData(card){
        card.data = '';
    }

    openCard(card){
        card.classList.remove('closed-card');
        card.classList.add('opened-card');
    }

    closeCard(card){
        card.classList.remove('opened-card');
        card.classList.add('closed-card');
    }

    hideCard(card){
        card.classList.remove('opened-card');
        card.classList.add('hidden');
    }


}