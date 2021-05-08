let topLeftCell = document.querySelector(".top-left-cell");
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let addressInput = document.querySelector("#address-input");
let formulaInput = document.querySelector("#formula-input");
let allCells = document.querySelectorAll(".cell");

cellsContent.addEventListener("scroll", function (e) {
	let top = e.target.scrollTop;
	let left = e.target.scrollLeft;

	topLeftCell.style.top = top + "px";
	topLeftCell.style.left = left + "px";

	topRow.style.top = top + "px";
	leftCol.style.left = left + "px";
});

var rowId;
var colId;
var lastSelectedCell;

function onFocus(e) {
	rowId = Number(e.target.getAttribute("row-id"));
	colId = Number(e.target.getAttribute("col-id"));
	let address = String.fromCharCode(65 + colId) + (rowId + 1) + "";
	addressInput.value = address;
	let cellObject = db[rowId][colId];
	formulaInput.value = cellObject.formula;
	setMenu(cellObject);
	leftCol.querySelector(`[row-number = "${rowId}"]`).style.background =
		"lightgrey";
	topRow.querySelector(`[col-number = "${colId}"]`).style.background =
		"lightgrey";
	e.target.style.border = "2px solid #2ed573";
}

function onBlur(e) {
	leftCol.querySelector(`[row-number = "${rowId}"]`).style.background = "white";
	topRow.querySelector(`[col-number = "${colId}"]`).style.background = "white";
	e.target.style.border = "1px solid lightgrey";
	let currentElement = e.target;
	lastSelectedCell = currentElement;
	let value = currentElement.textContent;
	let cellObject = db[rowId][colId];
	if (value != cellObject.value) {
		cellObject.value = value;
		let dependencys = cellObject.dependency;
		for (let x = 0; x < dependencys.length; x++) {
			updateDependency(dependencys[x]);
		}
		removeDependecyFromFormulaCells(
			cellObject.formula,
			getAddress(rowId, colId)
		);
		cellObject.formula = "";
	}
}

for (let i = 0; i < allCells.length; i++) {
	allCells[i].onblur = onBlur;
	allCells[i].onfocus = onFocus;
	allCells[i].addEventListener("keyup", function (e) {
		let rowId = e.target.getAttribute("row-id");
		let { height } = e.target.getBoundingClientRect();
		leftCol.querySelector(`div[row-number = '${rowId}']`).style.height =
			height + "px";
	});
}

formulaInput.addEventListener("blur", function (e) {
	let formula = formulaInput.value;

	let cellObject = db[rowId][colId];

	if (formula && lastSelectedCell && formula !== cellObject.formula) {
		removeDependecyFromFormulaCells(
			cellObject.formula,
			getAddress(rowId, colId)
		);
		let solvedValue = solveFormula(formula, getAddress(rowId, colId));
		// set UI
		if (solvedValue == "") {
			return;
		}
		lastSelectedCell.textContent = solvedValue;
		// set DB
		cellObject.value = solvedValue;
		cellObject.formula = formula;
		let dependencys = cellObject.dependency;
		for (let x = 0; x < dependencys.length; x++) {
			updateDependency(dependencys[x]);
		}
	}
});

function getAddress(rowId, colId) {
	return String.fromCharCode(65 + colId) + (rowId + 1) + "";
}
