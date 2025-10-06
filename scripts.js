const logo=document.querySelector('.logo');
let isSpinning=false;

if(window.matchMedia('(hover: none)').matches){
  logo.addEventListener('touchstart',e=>{
    e.preventDefault();//prevent scroll
    if(isSpinning)return;
    isSpinning=true;
    logo.style.filter='none';
    logo.style.transform='none';
    void logo.offsetWidth;//reflow
    logo.classList.add('spin');
  },{passive:false});

  logo.addEventListener('animationend',()=>{
    isSpinning=false;
    logo.classList.remove('spin');
    logo.style.filter='none';
    logo.style.transform='none';
  });
}


//this was so hard and frustrating im never doing this again