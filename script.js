dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));
dragElement(document.getElementById('plant11'));
dragElement(document.getElementById('plant12'));
dragElement(document.getElementById('plant13'));
dragElement(document.getElementById('plant14'));

function dragElement(terrariumElement) {
	//set 4 positions for positioning on the screen
	let mousePositionWhenDragX = 0,
		mousePositionWhenDragY = 0,
		translateOnX = 0,
		translateOnY = 0,
		defaultPositionX = 0,
		defaultPositionY = 0;
	terrariumElement.addEventListener('pointerdown', pointerDrag)


    function pointerDrag(e) {
        if (e.which == 1) {
            e.preventDefault();
            console.log(e);
            defaultPositionX= e.pageX;
            defaultPositionY = e.pageY;
            const translateValues = getTranslateXY(e.target)
            translateOnX = translateValues.translateX
            translateOnY = translateValues.translateY
            console.log(translateOnY)
            document.onpointermove = elementDrag;
            document.onpointerup = stopElementDrag;
        }
    }

    function elementDrag(e) {
        let terrarium = document.getElementById("terrarium").getBoundingClientRect();
        let plantPosition = terrariumElement.getBoundingClientRect();
        console.log(terrarium.top,terrarium.bottom,terrarium.left,terrarium.right)
        console.log(plantPosition.top, plantPosition.bottom, plantPosition.right, plantPosition.left)
        mousePositionWhenDragX = e.pageX;
        mousePositionWhenDragY = e.pageY;
        if (plantPosition.right<=terrarium.right&&plantPosition.left>=terrarium.left&&plantPosition.bottom<=terrarium.bottom&&plantPosition.top>=terrarium.top) {
            terrariumElement.style.filter = "grayscale(100%)"
        } else {
            terrariumElement.style.filter = ""
        }
        let movementRelativeToTop = mousePositionWhenDragY-defaultPositionY
        let movementRelativeToLeft = mousePositionWhenDragX-defaultPositionX
        terrariumElement.style.transform = `translate(${movementRelativeToLeft+translateOnX}px, ${movementRelativeToTop+translateOnY}px)`;
    }
    function stopElementDrag() {
        document.onpointermove = null;
        document.onpointerup = null;
    }
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}
