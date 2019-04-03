(function init() {
	initalizeGrid();
	initalizePlayers();
})();

function initalizeGrid() {
	var color = '#E0E0E0';

	for (let i = 8; i >= 1; i--) {
		let letter = 65;
		let row = document.createElement('div');

		row.setAttribute('class', 'row');

		for (let j = 1; j <= 8; j++) {
			let id = String.fromCharCode(letter) + i;
			let square = document.createElement('div');

			square.setAttribute('id', id);
			square.setAttribute('class', 'square');

			square.addEventListener('drop', handleDrop);
			square.addEventListener('dragover', allowDrop);

			square.style.backgroundColor = color;

			row.appendChild(square);

			letter++;
			color = color === '#E0E0E0' ? '#A0A0A0' : '#E0E0E0';
		}
		color = color === '#E0E0E0' ? '#A0A0A0' : '#E0E0E0';
		document.getElementById('grid').appendChild(row);
	}
}

function initalizePlayers() {
	var enumeration = 1;

	document.querySelectorAll('.square').forEach((element) => {
		let piece = document.createElement('img');
		let id = element.id;
		let color, type;

		if (id[1] == 2 || id[1] == 7) {
			type = 'pawn';

			if (id[1] == 2) color = 'white';
			if (id[1] == 7) color = 'black';
		}

		if (color && type) {
			piece.setAttribute('id', `${type}-${enumeration}`);
			piece.setAttribute('class', color);
			piece.setAttribute('src', `./assets/${color}-${type}.png`);

			piece.addEventListener('dragstart', handleDrag);

			document.getElementById(id).appendChild(piece);
		}

		enumeration++;
	});
}

function handleDrag(event) {
	event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event) {
	event.preventDefault();
}

function handleDrop(event) {
	event.preventDefault();

	var data = event.dataTransfer.getData('text');
	event.target.appendChild(document.getElementById(data));
}
