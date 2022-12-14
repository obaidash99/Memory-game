var controlsBtn = document.querySelector('.controls-btns');
var startSpan = document.querySelector('.controls-btns .start');
var seconds = 00;
var tens = 00;
var outputSeconds = document.querySelector('#seconds');
var outputTens = document.querySelector('#tens');
var interval;
var matchedBlocks = [];

startSpan.onclick = function () {
	let yourName = prompt("What's Your Name?");

	if (yourName == null || yourName == '') {
		document.querySelector('.name span').innerHTML = 'Unknown';
	} else {
		document.querySelector('.name span').innerHTML = yourName;
	}

	controlsBtn.remove();

	clearInterval(interval);
	interval = setInterval(startTime, 10); // 10 milliseconds to count the parts of each second
};

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);
// console.log(blocks.length);

// Create Range of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
	// add order property to Game Blocks
	block.style.order = orderRange[index];

	// add click event
	block.addEventListener('click', function () {
		flipBlock(block);
	});
});

// Flip Block Function
function flipBlock(selectedBlock) {
	selectedBlock.classList.add('is-flipped');

	// collect all Flipped Cards
	let allFlippedBlocks = blocks.filter((flippedBlock) =>
		flippedBlock.classList.contains('is-flipped')
	);

	// if there is TWO selected blocks
	if (allFlippedBlocks.length === 2) {
		// Stop clicking function
		stopClicking();
		// Check matched block sfunction
		checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
	}
}

// stop Clicking Function
function stopClicking() {
	// add class no-clicking on main container
	blocksContainer.classList.add('no-clicking');

	setTimeout(() => {
		// Remove no-clocking class after duration time
		blocksContainer.classList.remove('no-clicking');
	}, duration);
}

// Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
	let triesElement = document.querySelector('.tries span');

	if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
		firstBlock.classList.remove('is-flipped');
		secondBlock.classList.remove('is-flipped');

		firstBlock.classList.add('has-match');
		secondBlock.classList.add('has-match');

		document.getElementById('success').play();
		// Restart Game When All Blocks Matched
		matchedBlocks.push(firstBlock);
		matchedBlocks.push(secondBlock);

		if (matchedBlocks.length === blocks.length) {
			blocks.forEach((block) => {
				block.classList.remove('is-flipped');
				block.classList.remove('has-match');
			});
			document.body.appendChild(controlsBtn);
			clearInterval(interval);
			outputSeconds.innerHTML = '00';
			outputTens.innerHTML = '00';
			startSpan.innerHTML = 'Restart Game';
		}
	} else {
		triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

		setTimeout(() => {
			firstBlock.classList.remove('is-flipped');
			secondBlock.classList.remove('is-flipped');
		}, duration);

		document.getElementById('fail').play();
	}
}

function shuffle(array) {
	// Setting Vars
	let current = array.length,
		temp,
		random;

	while (current > 0) {
		//  Get Random number smaller than or equal to current
		random = Math.floor(Math.random() * current);

		// Decrease length by one
		current--;

		// [1] Save current element in Stash
		temp = array[current];

		// [2] current element = random element
		array[current] = array[random];

		// [3] random element = get element from stash
		array[random] = temp;
	}
	return array;
}

// Current Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] ==> as reference
// New Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
/*
	[1] Save current element in Stash
	[2] Current Element = Random Element
	[3] Randm Element = Get Element from Stash
*/

function startTime() {
	tens++;
	if (tens <= 9) {
		outputTens.innerHTML = '0' + tens;
	}
	if (tens > 9) {
		outputTens.innerHTML = tens;
	}
	if (tens > 99) {
		seconds++;
		outputSeconds.innerHTML = '0' + seconds;
		tens = 0;
		outputTens.innerHTML = '0' + tens;
	}
	if (seconds > 9) {
		outputSeconds.innerHTML = seconds;
	}
	// if (seconds >= 15) {
	// 	clearInterval(interval);
	// 	outputSeconds.innerHTML = '00';
	// 	outputTens.innerHTML = '00';
	// 	restartGame();
	// }
}
