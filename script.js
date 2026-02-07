let gameSeq=[];
let userSeq=[];
let scores=[];
let btns=["red","orange","green","blue"];
let count=0;
let started=false;
let level=0;

let h3=document.querySelector("h3");
let h4=document.querySelector("h4");
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp();
        count++;
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },150);
}

function btnUserFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },150);
}

function backColour(){
    document.body.classList.add("backColor");
    setTimeout(function(){
        document.body.classList.remove("backColor");
    },150);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*btns.length);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    // console.log(randColor);
    // console.log(randIdx);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function checkSame(idx){
    // console.log("current level: ",level);f
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h3.innerText=`Game Over! Your Score was ${level} Press any key to start again`;
        backColour();
        scores.push(level);
        console.log(scores);
        reset();
        highScore();
    }
}

function btnPress(){
    let btn=this;
    btnUserFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkSame(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

//Watch Matching-Sequence Once Again

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function highScore(){
    let max=0;
    for(let i=0;i<scores.length;i++){
       if(scores[i]>max){
        max=scores[i];
       }
    }
    h4.innerText=`Highest Score: ${max}`;
}