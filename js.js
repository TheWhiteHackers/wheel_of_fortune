window.onload=start();
function start(){

    createboard();
    createabc();

}

function createboard(){
    let row = 4;
    let colum = 14;
    let board = document.getElementById("board");
    let boxlist = "";
    let counter = 1;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < colum; j++) {
            if(counter == 1 || counter == 14 || counter == 43 || counter == 56){
                boxlist += "<div class='box noborder'></div>"
            } else {
                boxlist += "<div class='box'></div>"
            }
            counter++
        }
    }
    board.innerHTML=boxlist;
}

function createabc(){
    let abc = "ABCDEFGIJKLMNOPQRSTUVWXYZ"
    let str = "<center>"
    for (let i = 0; i < abc.length; i++) {
        str += "<div>"+abc[i]+"</div>"
    }
    document.getElementById("letters").innerHTML=str+"</center>";;
}

// ----------------------
// THE 'WHEEL'
// ----------------------
var wordlist = [
    '$950',
    'ONE MILLION $',
    'NOTHING!',
    '$800',
    '$500',
    '$650',
    'ONE MILLION $',
    '$900',
    'BANKRUPT',
    '$2,500',
    '$500',
    '$900',
    '$700',
    'NOTHING!',
    '$650',
    '$500',
    '$700',
    '$500',
    '$600',
    '$550',
    'ONE MILLION $',
    '$600',
    'BANKRUPT',
    '$650',
  ]
  
  function buildSlotItem (text) {
      return $('<div>').addClass('slottt-machine-recipe__item')
                       .text(text)
  }
  
  function buildSlotContents ($container, wordlist) {
    $items = wordlist.map(buildSlotItem);
    $container.append($items);
  }
  
  function popPushNItems ($container, n) {
      $children = $container.find('.slottt-machine-recipe__item');
      $children.slice(0, n).insertAfter($children.last());
  
      if (n === $children.length) {
        popPushNItems($container, 1);
      }
  }
  
  // After the slide animation is complete, we want to pop some items off
  // the front of the container and push them onto the end. This is
  // so the animation can slide upward infinitely without adding
  // inifinte div elements inside the container.
  function rotateContents ($container, n) {
      setTimeout(function () {
        popPushNItems($container, n);
        $container.css({top: 0});
      }, 300);    
  }
  
  function randomSlotttIndex(max) {
    var randIndex = (Math.random() * max | 0);
    return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
  }
  
    
    
  function animate() {
    var wordIndex = randomSlotttIndex(wordlist.length);
    $wordbox.animate({top: -wordIndex*150}, 500, 'swing', function () {
      rotateContents($wordbox, wordIndex);
    });
  }
  

 function wheel(){
    console.log("hi!");
    $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
    buildSlotContents($wordbox, wordlist);  
    buildSlotContents($wordbox, wordlist);  
    buildSlotContents($wordbox, wordlist);  
    buildSlotContents($wordbox, wordlist);  
    
    //setInterval(animate, 2000);
    animate();
};

