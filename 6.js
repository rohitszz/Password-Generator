const slider=document.querySelector("[data-lengthSlider]");
const numbercount=document.querySelector("[data-lengthnumber]");
const generatetext=document.querySelector("[generatedtext]");
const copiedbutton=document.querySelector("[copybutton]");
const copymess=document.querySelector("[copymessage]");
const uppercase=document.querySelector("[uppercasebox]");
const lowercase=document.querySelector("[lowercasebox]");
const number=document.querySelector("[numberbox]");
const symbol=document.querySelector("[symbolbox]");
const colorcircle=document.querySelector("[coloredcircle]");
const generatebutton=document.querySelector("[generator]");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");


const csymbols="~`!@#$%^&*(){}[];:'>?.,/<\|";
let password="";
let length=10;
let checkcount=1;
slidebar();

function slidebar() {
    slider.value = length;
    numbercount.innerText = length;
    const min = +slider.min;
    const max = +slider.max;
    slider.style.backgroundSize = ((length - min) * 100 / (max - min)) + "% 100%";
}

function indicator(color){
    colorcircle.style.backgroundColor=color;
}
function getrandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function generaterandomNum(){
    return getrandom(0,9);
}
function generaterandomLower(){
    return String.fromCharCode(getrandom(97,123));
}
function generaterandomUpper(){
    return String.fromCharCode(getrandom(65,91));
}
function generateSymbol(){
    const symbolnum=getrandom(0,csymbols.length);
    return csymbols.charAt(symbolnum);
}
function circlecolor(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercase.checked){
        hasUpper=true;

    }
    if(lowercase.checked){
        hasLower=true;
    }
    if(number.checked){
        hasNum=true;
    }
    if(symbol.checked){
        hasSym=true;
    }
    if(hasUpper && hasLower && (hasNum || hasSym) && length>=10){
        indicator("#f00");
    }
    else{
        if((hasLower || hasUpper) && ( hasNum || hasSym) && length>=6){
            indicator("#ff0");
        }
        else{
            indicator("#0f0");
        }
    }

}
function shufflepassword(password) {
    const arr = password.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

async function copyIcon(){
    try{
        await navigator.clipboard.writeText(generatetext.value);
        copymess.innerText="Copied";
    }
    catch(e){
        copymess.innerText="failed";
    }
    copymess.classList.add("active");
    setTimeout(()=>{
        copymess.classList.remove("active");
    },2000)
}

function checkboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked) checkcount++;
    }
    );
    if(length<checkcount)
    {length=checkcount; slidebar(); }

}


slider.addEventListener('input',(e) =>{
    length=e.target.value;
    slidebar();
})

copiedbutton.addEventListener('click', () =>
{
    if(generatetext.value){copyIcon();}
} )

generatebutton.addEventListener('click',()=>
{
    if(checkcount<=0)return ;

    if(length<checkcount){
        length=checkcount;
        slidebar();
    }
    password="";
    let funcArr=[];

    if(uppercase.checked){
        funcArr.push(generaterandomUpper);
    }
    if(lowercase.checked){
        funcArr.push(generaterandomLower);
    }
    if(number.checked){
        funcArr.push(generaterandomNum);
    }
    if(symbol.checked){
        funcArr.push(generateSymbol);
    }
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    for(let i=0;i<length-funcArr.length;i++){
        let randIndex=getrandom(0,funcArr.length);
        password+=funcArr[randIndex]();
    }
    password = shufflepassword(password);
    generatetext.value = password; 
    circlecolor();
}
)

allcheckbox.forEach( (checkbox) =>{
    checkbox.addEventListener('change',checkboxchange);
})

