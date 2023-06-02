window.onload=start();
function start(){

    createboard();

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

