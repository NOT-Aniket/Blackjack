//BLACKJACK GAME



//important variables needed for the change of scores and table manipulation

let blackjackdatabase = {
    'you': {'scorespan':'#your-result' , 'div':'#your-box', 'score': 0},
    'dealer': {'scorespan':'#dealer-result' , 'div':'#dealer-box', 'score': 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardvalues' : {'2': 2,'3': 3 ,'4': 4 ,'5': 5 ,'6': 6 ,'7': 7 ,'8': 8 ,'9': 9 ,'10': 10 ,'J': 10 ,'Q': 10 ,'K': 10 ,'A': 11 },
    'wins' : 0,
    'losses': 0,
    'draws': 0,
    'isstand':false,
    'turnsover':false,
};

const YOU = blackjackdatabase['you'];
const DEALER = blackjackdatabase['dealer'];
const CARDS = blackjackdatabase['cards'];
const hitsound = new Audio('sounds/swish.m4a');


//Event listener for stand

document.querySelector('#stand').addEventListener('click',stand);

//Event listener for hit

document.querySelector('#hit').addEventListener('click',hit);

//Event listener for deal

document.querySelector('#deal').addEventListener('click',deal);

//function to hit

function hit(){
    if(blackjackdatabase['isstand']===false){
        let card = randomcard();
        console.log(card);
        showcard(card,YOU);
        updatescore(card,YOU);
        showscore(YOU);
    }
}

//Function for Stand

function stand(){
    let k=1;
    blackjackdatabase['isstand']=true;
    blackjackdatabase['turnsover']=true;
    while(k===1){

        let card = randomcard();
        console.log(card);
        showcard(card,DEALER);
        updatescore(card,DEALER);
        showscore(DEALER);

        if(DEALER['score']>15){
            showresult(decidewinner());
            k=0;
        }
    }
}

//Function for deal

function deal(){
    while(blackjackdatabase['isstand']===true){
        blackjackdatabase['isstand']=false;
        let images = document.querySelector('#your-box').querySelectorAll('img');
        let dimages = document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0;i<images.length;i++)
        {
            images[i].remove();
        }
    
        for(let i=0;i<dimages.length;i++)
        {
            dimages[i].remove();
        }

        YOU['score']= 0;
        DEALER['score']= 0;

        document.querySelector(YOU['scorespan']).textContent = YOU['score'];
        document.querySelector(YOU['scorespan']).style.color = 'cornsilk';
        document.querySelector(DEALER['scorespan']).textContent = DEALER['score'];
        document.querySelector(DEALER['scorespan']).style.color = 'cornsilk';
        document.querySelector('#results').textContent='Start the Game';
    }
}

//Function to pick random card

function randomcard(){
    let rno = Math.floor(Math.random() * 13);
    return blackjackdatabase['cards'][rno];
}

//function to show the card

function showcard(card,activeplayer){
    if(activeplayer['score']<=21){
        let cardimage = document.createElement('img');
        cardimage.src = `images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
    }
}

//Funtion for updating score

function updatescore(card,activeplayer){
    if(activeplayer['score']<=21){
        activeplayer['score'] += blackjackdatabase['cardvalues'][card];
    }
    else{
        document.querySelector(activeplayer['scorespan']).textContent = 'BUSTED OUT';
    }
}

//Function to show score 

function showscore(activeplayer){
    if(activeplayer['score']<21){
        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
    }
    else{
        document.querySelector(activeplayer['scorespan']).textContent = 'BUSTED OUT';
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
    }
}

//Function to determine winner and calculate wins and losses

function decidewinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score']===DEALER['score']){
            console.log('YOu Drew');
            blackjackdatabase['draws']++;
        }
        else if(YOU['score']<DEALER['score'] && DEALER['score']<21){
            console.log('YOu lost');
            blackjackdatabase['losses']++;
            winner=DEALER;
        }
        else if(DEALER['score']>21){
        console.log('You win');
        blackjackdatabase['wins']++;
        winner = YOU;
        }
        else{
            console.log('You win');
            blackjackdatabase['wins']++;
            winner = YOU;
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        console.log('you lost');
        blackjackdatabase['losses']++;
        winner = DEALER;
        console.log(winner);
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log('YOu Drew');
        blackjackdatabase['draws']++;
    
    }
    document.querySelector('#wins').textContent = blackjackdatabase['wins'];
    document.querySelector('#losses').textContent = blackjackdatabase['losses'];
    document.querySelector('#draws').textContent = blackjackdatabase['draws'];
    return winner;
}

//Funtion to show result

function showresult(winner){
    let message;
    if(winner===YOU){
        message='You won!';
    }
    else if(winner===DEALER){
        message='You Lost';
    }
    else{
        message='You Drew';
    }
    document.querySelector('#results').textContent=message;
}
