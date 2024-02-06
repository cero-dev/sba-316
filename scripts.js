// size given here is one side length that will be multiplied to get area
function generateGrid(size) {
    let maxArea = size * size;

    const generatedSketchSquare = document.createElement('div');
    generatedSketchSquare.style.height = "500px";
    generatedSketchSquare.style.width = "500px";
    generatedSketchSquare.style.display = "flex";
    generatedSketchSquare.style.flexWrap = "wrap";
    generatedSketchSquare.classList.add("border")

    for (let i = 0; i < size; i++) {
        let sketchRow = document.createElement('div');
        sketchRow.style.flexBasis = "100%"
        sketchRow.style.display = "flex"
        sketchRow.setAttribute('draggable', false);
        sketchRow.setAttribute('ondragstart', 'return false;')
        for (let z = 0; z < size; z++) {
            let sketchSquare = document.createElement("div");
            sketchSquare.classList.add("sketchSquare");
            sketchSquare.setAttribute('draggable', false);
            sketchSquare.setAttribute('ondragstart', 'return false;')
            sketchSquare.style.flex = "1 1 0";
            sketchSquare.classList.add("border");
            sketchSquare.style.backgroundColor = "white";
            sketchRow.appendChild(sketchSquare);
        }
        generatedSketchSquare.appendChild(sketchRow);
    }

    return generatedSketchSquare;
}

const body = document.querySelector("body");
const colorPicker = document.getElementById("colorPicker");
const clearButton = document.getElementById("clearButton");
const showBorderButton = document.getElementById("showBorderButton")
const rightSide = document.getElementById("rightSide");

let color = colorPicker.value;

colorPicker.addEventListener('change', function (e) {
    color = colorPicker.value;
})

clearButton.addEventListener('click', function (e) {
    const squares = document.getElementsByClassName("sketchSquare")
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = "white";
    }
})

showBorderButton.addEventListener('click', function (e) {
    const squares = document.getElementsByClassName("sketchSquare")
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.toggle("border")
    }
})

let sketchContainer = generateGrid(4);
rightSide.appendChild(sketchContainer)

const mySlider = document.getElementById("mySlider");
const sliderValue = document.getElementById("sliderValue");
sliderValue.innerText = `GRID SIZE: ${mySlider.value} x ${mySlider.value}`;

mySlider.addEventListener("input", () => {
    sliderValue.innerText = `GRID SIZE: ${mySlider.value} x ${mySlider.value}`;
    rightSide.removeChild(sketchContainer);
    sketchContainer = generateGrid(mySlider.value);
    rightSide.appendChild(sketchContainer)
});

rightSide.addEventListener('mouseover', function (e) {
    if (e.buttons === 1 && e.target.classList.contains('sketchSquare')) {
        e.target.style.backgroundColor = color;
        console.log(e.target);
    }

    rightSide.addEventListener('mousedown', function (e) {
        if (e.target.classList.contains('sketchSquare')) {
            e.target.style.backgroundColor = color;
        }
    })
});