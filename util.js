function solveFormula(formula, currentCellAddress) {
	// ( A1 + A2 ) => ( 10 + 20 );
	let formulaComps = formula.split(" ");
	// ["(" , "A1" , "+" , "A2" , ")"];

	for (let i = 0; i < formulaComps.length; i++) {
		let fComp = formulaComps[i];
		if (fComp == currentCellAddress) {
			alert("Circular Loop is not supported");
			return "";
		}
		if (fComp[0] >= "A" && fComp[0] <= "Z") {
			// inside valid fComponent
			let { rowId, colId } = getRowIdColIdFromAddress(fComp);
			let cellObject = db[rowId][colId];
			let value = cellObject.value;
			if (value) {
				if (!cellObject.dependency.includes(currentCellAddress))
					// if cell address is not present in dependency then add it.
					cellObject.dependency.push(currentCellAddress);

				formula = formula.replace(fComp, value);
			}
		}
	}

	// stack infix evaluation => ( 10 + 20 );
	let value = eval(formula);
	return value;
}

function updateDependency(dependencyAddress) {
	let { rowId, colId } = getRowIdColIdFromAddress(dependencyAddress);
	let currentObject = db[rowId][colId];
	let formula = currentObject.formula;

	let val = solveFormula(formula, dependencyAddress); // solve formula with new value
	if (val == "") {
		return;
	}
	// update value in Db
	currentObject.value = val;

	// update value in UI
	document.querySelector(
		`[row-id='${rowId}'][ col-id='${colId}']`
	).textContent = val;

	let dependencys = currentObject.dependency;

	// update the dependecy of dependency
	for (let x = 0; x < dependencys.length; x++) {
		updateDependency(dependencys[x]);
	}
}

function removeDependecyFromFormulaCells(formula, currentCellAddress) {
	let formulaComps = formula.split(" ");

	for (let i = 0; i < formulaComps.length; i++) {
		let fComp = formulaComps[i];
		if (fComp[0] >= "A" && fComp[0] <= "Z") {
			// inside valid fComponent
			let { rowId, colId } = getRowIdColIdFromAddress(fComp);
			let cellObject = db[rowId][colId];

			if (cellObject.dependency.includes(currentCellAddress))
				// if cell address is not present in dependency then add it.
				cellObject.dependency = cellObject.dependency.filter(
					(e) => e != currentCellAddress
				);
		}
	}
}

function getRowIdColIdFromAddress(address) {
	// C1 =>
	// C => colId => 2
	// 1 => rowId => 0

	let colId = address.charCodeAt(0) - 65;
	let rowId = Number(address.substring(1)) - 1;
	return { rowId, colId };
}
