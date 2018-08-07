var x;
var y;
var viewportWidth;
var viewportHeight;
var arrowRightPressed = false;
var arrowLeftPressed = false;
var arrowUpPressed = false;
var arrowDownPressed = false;
var speedIncrement = 5;
var currentSection;
var sectionOffset = 0;
//var barWidth = 10;
var barAperture = 250;
var started = false;
var carInterval;
var roadInterval;
var roadMotionTickMs = 10;
var roadCycles = 0;
var roadOffsets = [];
var gameEnded = false;
var barsBeforeDecrement = 50;
var car = document.getElementById("car");
var page = document.getElementById("page");
var barsTravelled = 0;

//setViewport();
//x = 50;
//y = (viewportHeight - 150) / 2;

//firstBitOfRoad();
updateCarPosition();

startGame();

function startGame() {
	if (gameEnded)
		return;
	carInterval = setInterval(carMotion,10);
	roadInterval = setInterval(roadMotion, roadMotionTickMs);
	started = true;
}

function pauseGame() {
	clearInterval(carInterval);
	clearInterval(roadInterval);
	started = false;
}

function gameOver() {

	gameEnded = true;
	pauseGame();

	var score = (barsTravelled * barWidth);
	var highScore = window.localStorage.getItem("hiScore");
	var lowScore = window.localStorage.getItem("loScore");

	if (!highScore || score > parseInt(highScore)) {
		window.localStorage.setItem("hiScore", score);
		highScore = score;
	}

	if (!lowScore || score < parseInt(lowScore)) {
		window.localStorage.setItem("loScore", score);
		lowScore = score;
	}

	var overlayLayer = document.getElementById("overlayLayer");
	var pixelsTravelled = document.getElementById("pixelsTravelled");
	var hiScoreValue = document.getElementById("hiScoreValue");
	var lowScoreValue = document.getElementById("lowScoreValue");

	pixelsTravelled.innerText =  score + "";
	overlayLayer.style.display = "flex";
	hiScoreValue.innerText = highScore;
	lowScoreValue.innerText = lowScore;
}

// function firstBitOfRoad() {
// 	var barsInViewport = Math.ceil(viewportWidth / barWidth);
// 	for (var i = 0; i < barsInViewport; i++)
// 		newRoadSection(0);
// }

function roadMotion() {
	if (!currentSection || currentSection.remaining <= 0)
		loadNextSection();
	sectionOffset = sectionOffset + (currentSection.gradient * barWidth);
	currentSection.remaining = currentSection.remaining - 1;
	newRoadSection(sectionOffset);
	removeOldRoadSection();
	roadCycles++;
	if (roadCycles % barsBeforeDecrement === 0)
		barAperture--;
	if (!checkWheelsStillOnRoad())
		gameOver();
}

function getUpperBarHeight(offset) {
	return ((viewportHeight - barAperture) / 2) - offset;
}

function getLowerBarHeight(offset) {
	return ((viewportHeight - barAperture) / 2) + offset;
}

function checkWheel(x, y){
	var offsetIndexOfRoadBar = Math.round(x / barWidth);
	var offsetForBar = roadOffsets[offsetIndexOfRoadBar];
	var bottomEdgeOfUpperBar = getUpperBarHeight(offsetForBar);
	var topEdgeOfLowerBar = viewportHeight - getLowerBarHeight(offsetForBar);
	return !(y < (bottomEdgeOfUpperBar - 10) || y > (topEdgeOfLowerBar + 10))
}

function checkWheelsStillOnRoad() {
	var points = getWheelOnRoadCoords();
	if (!checkWheel(points.rearWheelOffset[0], points.rearWheelOffset[1]))
		return false;
	return checkWheel(points.frontWheelOffset[0], points.frontWheelOffset[1]);
}

function getWheelOnRoadCoords() {
	return {
		rearWheelOffset:[car.offsetLeft + 40, car.offsetTop + 110],
		frontWheelOffset:[car.offsetLeft + 110, car.offsetTop + 110]
	};
}

function carMotion() {
	if (arrowRightPressed)
		x = x + speedIncrement;
	if (arrowLeftPressed)
		x = x - speedIncrement;
	if (arrowUpPressed)
		y = y - speedIncrement;
	if (arrowDownPressed)
		y = y + speedIncrement;
	updateCarPosition();
	barsTravelled++;
}

function getRandomNumberInRange(min, max) {
	return Math.floor((Math.random() * (max - min)) + min);
}

function loadNextSection(forceGradient) {
	var resolutionFactor = 20 / barWidth;
	var remaining = getRandomNumberInRange(2 * resolutionFactor ,10 * resolutionFactor);
	var gradient = forceGradient ? forceGradient : getRandomNumberInRange(-4,4) / remaining;
	currentSection = {gradient: gradient, remaining: remaining};
}

function newRoadSection(offset) {
	roadOffsets.push(offset);
	drawRoadSection(offset);
}

function removeOldRoadSection() {
	roadOffsets.shift();
	document.getElementsByClassName("fullBar")[0].remove();
}

function drawRoadSection(offset) {
	var fullBar = document.createElement("div");
	var upperBar = document.createElement("div");
	var lowerBar = document.createElement("div");

	var upperBarHeight = getUpperBarHeight(offset);
	var lowerBarHeight = getLowerBarHeight(offset);

	if (upperBarHeight <=  0)
		loadNextSection(-.5);

	if (lowerBarHeight <= 0)
		loadNextSection(.5);

	upperBar.className = "upperBar";
	upperBar.style.width = barWidth + "px";
	upperBar.style.height = upperBarHeight + "px";

	lowerBar.className = "lowerBar";
	lowerBar.style.width = barWidth + "px";
	lowerBar.style.height = lowerBarHeight + "px";
	lowerBar.style.top = barAperture + "px";

	fullBar.className = "fullBar";
	fullBar.style.width = barWidth + "px";
	fullBar.appendChild(upperBar);
	fullBar.appendChild(lowerBar);
	document.getElementById("roadContainer").appendChild(fullBar);
}

function setViewport(){
	viewportWidth = document.documentElement.clientWidth;
	viewportHeight = document.documentElement.clientHeight;
	page.style.width = viewportWidth + "px";
	page.style.height = viewportHeight + "px";
}

function updateCarPosition() {
	// if (x > viewportWidth)  x = -150;
	// if (x < -150)  x = viewportWidth;
	// if (y > viewportHeight)  y = -110;
	// if (y < -110)  y = viewportHeight;
	car.style.left = x + "px";
	car.style.top = y + "px";
}

