let cellsContent = document.querySelector(".cells-content");
let fontSize = document.querySelector("#font-size");

(() => {
	//top-left
	let cellsContentHtml = `<div class = "top-left-cell"></div>`;

	//top-row
	cellsContentHtml += `<div class = "top-row">`;
	for (let x = 0; x < 26; x++) {
		cellsContentHtml += `<div class = "top-row-cell" col-number = "${x}">${String.fromCharCode(
			x + 65
		)}</div>`;
	}
	cellsContentHtml += `</div>`;

	//left-col
	cellsContentHtml += `<div class = "left-col" >`;
	for (let x = 0; x < 100; x++) {
		cellsContentHtml += `<div class = "left-col-cell" row-number = ${x}>${
			x + 1
		}</div>`;
	}
	cellsContentHtml += `</div>`;

	//cells
	cellsContentHtml += `<div class = "cells">`;
	for (let i = 0; i < 100; i++) {
		cellsContentHtml += `<div class="row">`;
		for (let j = 0; j < 26; j++) {
			cellsContentHtml += `<div class="cell" row-id=${i} col-id = ${j} contentEditable="true"></div>`;
		}
		cellsContentHtml += `</div>`;
	}
	cellsContentHtml += `</div>`;

	cellsContent.innerHTML = cellsContentHtml;

	let fontSizeOptions = "";
	for (let i = 8; i <= 80; i += 2)
		fontSizeOptions += `<option value="${i}">${i}</option>`;
	fontSize.innerHTML = fontSizeOptions;
	fontSize.value = 12;
})();

let db;
let sheetDb = [];

function initDB() {
	newDB = [];
	for (let i = 0; i < 100; i++) {
		let row = [];
		for (let j = 0; j < 26; j++) {
			let address = String.fromCharCode(65 + j) + (i + 1) + "";
			let cellObject = {
				name: address,
				value: "",
				formula: "",
				dependency: [],
				textColor: "#000000",
				cellColor: "#FFFFFF",
				fontStyle: {
					bold: false,
					italic: false,
					underline: false,
					textAlign: "left",
					fontSize: "12",
					fontFamily: "Lato",
				},
			};
			row.push(cellObject);
		}
		newDB.push(row);
	}
	db = newDB;
	sheetDb.push(newDB);
}
initDB();
