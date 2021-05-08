let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");

let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");

let textColorInput = document.querySelector("#text-color");
let textColorIcon = document.querySelector(".text-color-icon");

let cellColorInput = document.querySelector("#cell-color");
let cellColorIcon = document.querySelector(".cell-color-icon");

let fontFamily = document.querySelector("#font-family");

bold.addEventListener("click", function (e) {
	if (!lastSelectedCell) return;
	let cellObject = db[rowId][colId];
	if (cellObject.fontStyle.bold) {
		lastSelectedCell.style.fontWeight = "normal";
		bold.classList.remove("active-menu");
	} else {
		lastSelectedCell.style.fontWeight = "bold";
		bold.classList.add("active-menu");
	}
	cellObject.fontStyle.bold = !cellObject.fontStyle.bold;
});

underline.addEventListener("click", function (e) {
	if (!lastSelectedCell) return;
	let cellObject = db[rowId][colId];
	if (cellObject.fontStyle.underline) {
		lastSelectedCell.style.textDecoration = "none";
		underline.classList.remove("active-menu");
	} else {
		lastSelectedCell.style.textDecoration = "underline";
		underline.classList.add("active-menu");
	}
	cellObject.fontStyle.underline = !cellObject.fontStyle.underline;
});

italic.addEventListener("click", function (e) {
	if (!lastSelectedCell) return;
	let cellObject = db[rowId][colId];
	if (cellObject.fontStyle.italic) {
		lastSelectedCell.style.fontStyle = "normal";
		italic.classList.remove("active-menu");
	} else {
		lastSelectedCell.style.fontStyle = "italic";
		italic.classList.add("active-menu");
	}
	cellObject.fontStyle.italic = !cellObject.fontStyle.italic;
});

left.addEventListener("click", () => setTextAlignment("left"));
center.addEventListener("click", () => setTextAlignment("center"));
right.addEventListener("click", () => setTextAlignment("right"));

fontSize.addEventListener("change", function (e) {
	if (!lastSelectedCell) return;
	lastSelectedCell.style.fontSize = fontSize.value + "px";
	db[rowId][colId].fontStyle.fontSize = fontSize.value;
});

fontFamily.addEventListener("change", function (e) {
	if (!lastSelectedCell) return;
	fontFamily.style.fontFamily = fontFamily.value;
	db[rowId][colId].fontStyle.fontFamily = fontFamily.value;
	lastSelectedCell.style.fontFamily = fontFamily.value;
});

textColorIcon.addEventListener("click", () => textColorInput.click());
cellColorIcon.addEventListener("click", () => cellColorInput.click());

textColorInput.addEventListener("change", function () {
	if (!lastSelectedCell) return;
	let rowId = lastSelectedCell.getAttribute("row-id");
	let colId = lastSelectedCell.getAttribute("col-id");
	let newColor = textColorInput.value;
	textColorIcon.style.color = newColor;
	lastSelectedCell.style.color = newColor;
	db[rowId][colId].textColor = newColor;
});

cellColorInput.addEventListener("change", function () {
	if (!lastSelectedCell) return;
	let rowId = lastSelectedCell.getAttribute("row-id");
	let colId = lastSelectedCell.getAttribute("col-id");
	let newColor = cellColorInput.value;
	cellColorIcon.style.color = newColor;
	lastSelectedCell.style.background = newColor;
	db[rowId][colId].cellColor = newColor;
});

function setTextAlignment(alignment) {
	if (lastSelectedCell) {
		let cellObject = db[rowId][colId];
		if (cellObject.fontStyle.textAlign == alignment) {
			return;
		}
		// cell => text align
		lastSelectedCell.style.textAlign = alignment;
		cellObject.fontStyle.textAlign = alignment;
		setMenu(cellObject);
	}
}

function setMenu(cellObject) {
	// bold underline italic
	cellObject.fontStyle.bold
		? bold.classList.add("active-menu")
		: bold.classList.remove("active-menu");
	cellObject.fontStyle.italic
		? italic.classList.add("active-menu")
		: italic.classList.remove("active-menu");
	cellObject.fontStyle.underline
		? underline.classList.add("active-menu")
		: underline.classList.remove("active-menu");

	// alignment
	let alignment = cellObject.fontStyle.textAlign; //left center right
	if (document.querySelector(".font-alignment .active-menu")) {
		document
			.querySelector(".font-alignment .active-menu")
			.classList.remove("active-menu");
	}

	if (alignment == "left") {
		left.classList.add("active-menu");
	} else if (alignment == "center") {
		center.classList.add("active-menu");
	} else {
		right.classList.add("active-menu");
	}

	fontSize.value = cellObject.fontStyle.fontSize;
	fontFamily.value = cellObject.fontStyle.fontFamily;
	fontFamily.style.fontFamily = cellObject.fontStyle.fontFamily;
	textColorIcon.style.color = cellObject.textColor;
	cellColorIcon.style.color = cellObject.cellColor;
}

function initMenu() {
	bold.classList.remove("active-menu");
	underline.classList.remove("active-menu");
	italic.classList.remove("active-menu");
	left.classList.remove("active-menu");
	center.classList.remove("active-menu");
	right.classList.remove("active-menu");
	fontSize.value = 12;
	fontFamily.value = "Lato";
	fontFamily.style.value = "Lato";
	textColorIcon.style.color = "#000000";
	cellColorIcon.style.color = "#000000";
}
