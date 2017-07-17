$(document).ready(function(){
	const MIN_GOAL = 19;
	const MAX_GOAL = 120;
	const MIN_CRYSTAL_VAL = 1;
	const MAX_CRYSTAL_VAL = 12;
	var currTotalScore = 0;
	var loseCount = 0;
	var winCount = 0;
	var goalScore = 0;
	var crystalPointsArr = [];
	initGame();
	function setValueGoalScoreText(goalScoreNum) {
		$("span.random-number-goal").text(goalScoreNum);
	}
	function setGoalScore(goal) {
		goalScore = goal;
		setValueGoalScoreText(goal);
	}
	function generateRandomNumberInRange(min, max) {
		return Math.floor(Math.random() * (max + 1 - min)) + min;
	}
	function generateGoalScore() {
		var potentialGoalNum = generateRandomNumberInRange(MIN_GOAL, MAX_GOAL);
		setGoalScore(potentialGoalNum);
	}
	function generateCrystalPointVals(goalScore) {
		var crystalPoints = [];
		$(".crystals-wrapper").children().each(function(key, value) {
			crystalPoints[key] = generateRandomNumberInRange(MIN_CRYSTAL_VAL, MAX_CRYSTAL_VAL);
		});
		return crystalPoints;
	}
	function increaseCurrTotalScore(increaseByNum) {
		updateCurrTotalScore(currTotalScore + increaseByNum);
	}
	function setCurrTotalScoreText(currTotalScore) {
		$(".current-score.point-value").text(currTotalScore);
	}
	function setCurrTotalScore(score) {
		currTotalScore = score;
		setCurrTotalScoreText(score);
	}
	function updateCurrTotalScore(score) {
		setCurrTotalScore(score);
		if(score > 0 && currTotalScore >= goalScore) {
			if(currTotalScore === goalScore) {
				endGame(true);
			} else {
				endGame(false);
			}
		}
	}
	function getCurrTotalScoreText(currTotalScore) {
		return $(".current-score.point-value").text();
	}
	$(".crystal-container").on("click", function(e) {
		var indexClicked = $(".crystal-container").index(this);
		increaseCurrTotalScore(crystalPointsArr[indexClicked]);
	});
	function initGame() {
		setCurrTotalScore(0);
		generateGoalScore();
		crystalPointsArr = generateCrystalPointVals(goalScore);
	}
	function endGame(didWin) {
		if(didWin === true || didWin === false) {
			if(didWin === false) {
				loseCount++;
				$("#lose-count").text(loseCount);
			} else if(didWin === true) {
				winCount++;
				$("#win-count").text(winCount);
			}
			initGame();
		}
	}
});