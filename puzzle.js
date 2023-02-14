//Declaration of columns and row
let columns = 3;
let row = 3;

let currTile; // Reference  the tile that u click to switch with.
let otherTile; // Blank Tile

let turns = 0;

//Using it to shuffle the array images every time when it load page.
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = this[i];
        this[i] = this[j];
        this[j] = x;
    }
    return this
}

//Equality of array to see if it winnable
Array.prototype.equality = function(){
    let win = [1,2,3,4,5,6,7,8,9]
    for(let i in this){
        if (this[i] != win[i]) return false
    }

    return true
}

let imgOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

window.onload = function () {
    let win = []
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < columns; c++) {
            //<img src="[1-9].jpg" id="0-1|0-2|..">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift().toString() + ".jpg";
            tile.draggable = true

            //Drag Functionality For Computer Version
            tile.addEventListener("dragstart", dragStart); //Click an image to Drag
            tile.addEventListener("dragover", dragOver); //Moving image while clicked
            tile.addEventListener("dragenter", dragEnter); //Dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //Return image or leave the process
            tile.addEventListener("drop", dragDrop); //Drag an image over another image and drop it
            tile.addEventListener("dragend", dragEnd); //AFter drop swap the two tile

            //Drag Functionality For Mobile Version
            tile.addEventListener("touchstart", dragStart, false);
            tile.addEventListener("touchend", touchend, false);
            tile.addEventListener("touchcancel", dragLeave, false);
            tile.addEventListener("touchleave", dragLeave, false);
            tile.addEventListener("touchmove", dragOver, false);


            //Add 9 <img> to a div#puzzle

            document.getElementById("puzzle").append(tile)

        }
    }

}

function dragStart() {
    currTile = this; //this refers to image tile being dragged
    console.log(currTile)
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave(e) {
    e.preventDefault()
}

function dragDrop() {
    otherTile = this; // this refers to the image tile being dropped on
    
}

function dragEnd() {
    console.log(otherTile)
    if (!otherTile.src.includes("9.jpg")) return;

    let currCoords = currTile.id.split("-"); //["0","2"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-"); //["0","2"]
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    //Check only replace with tile that close
    let moveRight = r == r2 && c2 == c + 1;
    let moveLeft = r == r2 && c2 == c - 1;
    let moveUp = r - 1 == r2 && c2 == c;
    let moveDown = r + 1 == r2 && c2 == c;

    let isAdjacent = moveRight || moveLeft || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        //swap them
        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1
        document.getElementById("turns").innerText = turns;
    };

    //Check if user won
    let score = []
    for (let i = 1; i < 10; i++) {
        score.push(document.getElementsByTagName("img")[i].src.split("/")[3].replace(".jpg", ""))
    }
    if(score.equality()) alert("🎉🎉 You won 🎉🎉")
    
}

function touchend() {

    let otherTile;

    for (let i = 1; i < 10; i++) {
        if (document.getElementsByTagName("img")[i].src.split("/")[3].replace(".jpg", "") == 9) {
            otherTile = document.getElementsByTagName("img")[i]
        }
    }


    console.log(otherTile)


    let currCoords = currTile.id.split("-"); //["0","2"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    

    let otherCoords = otherTile.id.split("-"); //["0","2"]
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    //Check only replace with tile that close
    let moveRight = r == r2 && c2 == c + 1;
    let moveLeft = r == r2 && c2 == c - 1;
    let moveUp = r - 1 == r2 && c2 == c;
    let moveDown = r + 1 == r2 && c2 == c;

    let isAdjacent = moveRight || moveLeft || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        //swap them
        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1
        document.getElementById("turns").innerText = turns;
    };
    
    //Check if user won
    let score = []
    for (let i = 1; i < 10; i++) {
        score.push(document.getElementsByTagName("img")[i].src.split("/")[3].replace(".jpg", ""))
    }
    if(score.equality()) alert("🎉🎉 You won 🎉🎉")

    console.log(score)

    


}

