let addSheet = document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheet-list");
let sheetId = 0;

addSheet.addEventListener("click", function (e) {
	sheetId++;
	document.querySelector(".active-sheet").classList.remove("active-sheet");
	let sheet = document.createElement("div");
	sheet.classList.add("sheet");
	sheet.classList.add("active-sheet");
	sheet.setAttribute("sid", sheetId);
	sheet.textContent = `Sheet ${sheetId + 1}`;

	sheetList.appendChild(sheet);
	initDB();
	initUI();
	initMenu();
});

sheetList.addEventListener("click", handleSheetSwitch);

function handleSheetSwitch(e) {
	let selectedSheet = e.target;
	if (
		selectedSheet.classList.contains("active-sheet") ||
		selectedSheet.classList.contains("sheet-list")
	) {
		return;
	}
	document.querySelector(".active-sheet").classList.remove("active-sheet");
	selectedSheet.classList.add("active-sheet");

	// db set
	let selectedSheetId = selectedSheet.getAttribute("sid");
	db = sheetDb[selectedSheetId];

	// ui set
	setUI();
	initMenu();
}
function initUI() {
	for (let x = 0; x < allCells.length; x++) {
		allCells[x].textContent = "";
		allCells[x].style = "";
	}
}

function setUI() {
	for (let i = 0; i < allCells.length; i++) {
		let rowId = allCells[i].getAttribute("row-id");
		let colId = allCells[i].getAttribute("col-id");
		let cellObject = db[rowId][colId];
		allCells[i].textContent = cellObject.value;
		allCells[i].style.fontWeight = cellObject.fontStyle.bold
			? "bold"
			: "normal";
		allCells[i].style.fontStyle = cellObject.fontStyle.italic
			? "italic"
			: "normal";
		allCells[i].style.textDecoration = cellObject.fontStyle.textDecoration
			? "underline"
			: "none";
		allCells[i].style.textAlign = cellObject.fontStyle.textAlign;
		allCells[i].style.fontSize = cellObject.fontStyle.fontSize + "px";
		allCells[i].style.fontFamily = cellObject.fontStyle.fontFamily;
		allCells[i].style.color = cellObject.textColor;
		allCells[i].style.background = cellObject.cellColor;
	}
}
