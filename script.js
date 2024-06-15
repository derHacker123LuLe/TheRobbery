let money = 0;
let timeLeft = 0;
let upgradeableTime = 30; // Variable to store upgraded timer value
let timerInterval;
let time = 30; // Set initial time value
let index1 = 0;
let costs = 10;
let level = 0;
let Exp = 0;
let autoHarvestEnabled = false;
let salary = 10;

function updateTimer() {
    const timerSpan = document.getElementById("timer");
    timerSpan.textContent = timeLeft > 0 ? timeLeft : upgradeableTime;
    document.getElementById("Harvest").disabled = timeLeft > 0 || autoHarvestEnabled;
}

function updateMoney() {
    document.getElementById("money").textContent = money;
}

function updateNowTime() {
    document.getElementById("time").textContent = time;
}

function updateUpgradeCosts() {
    document.getElementById("costs").textContent = costs;
}

function updateExp() {
    document.getElementById("Exp").textContent = Exp;
}

function upgradesalary() {
    document.getElementById("salary").textContent = salary;
}

function upgradeLevel() {
    level = Math.min(Math.floor(Exp / 10), 20);
}

function upgradesalary() {
    if (level % 5 === 0) {
        salary += 5;
    }
}

function earnMoney() {
    money += 10; // Earn 10 money
    updateMoney();
    Exp += 10; // Earn 10 experience points
    updateExp();
    upgradeLevel();
    updateLevel(); // Update the level after earning money
}

function upgradeTimer() {
    if (money >= costs) {
        money -= costs;
        time--; // Decrease time by 1 second
        upgradeableTime--; // Decrease upgradeableTime by 1 second
        updateMoney();
        updateNowTime();
        updateUpgradeCosts();
        if (upgradeableTime === 0) { // Check if upgraded timer reaches zero
            clearInterval(timerInterval);
            endGame(); // End the game if upgraded timer reaches 0
        }
    }
}

function startTimer() {
    clearInterval(timerInterval); // Clear the previous timer interval
    timeLeft = parseInt(document.getElementById("time").textContent); // Set timeLeft to the value of time
    updateTimer();
    moveTractor();
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        }
        if (timeLeft === 0) { // Check if the timer reaches zero
            clearInterval(timerInterval);
            earnMoney(); // Award money when the timer reaches zero
            updateExp(); // Update experience points
            document.getElementById("Harvest").disabled = false; // Enable the New Robbery button
        }
    }, 1000);
}

function startAutoHarvest() {
    autoHarvestEnabled = true;
    document.getElementById("autoHarvest").textContent = "Auto Harvest On";
    autoHarvestInterval = setInterval(() => {
        if (!document.getElementById("Harvest").disabled) {
            document.getElementById("Harvest").click();
        }
    }, 1000);
}

function stopAutoHarvest() {
    autoHarvestEnabled = false;
    document.getElementById("autoHarvest").textContent = "Auto Harvest Off";
    clearInterval(autoHarvestInterval);
}

function startGame() {
    timeLeft = 0;
    time = 30;
    money = 0;
    Exp = 0;
    updateTimer();
    updateMoney();
    updateExp();
    upgradeLevel();
}

function endGame() {
    alert("Game Over!");
}

function updateLevel() {
    document.getElementById("level").textContent = level;
}

document.getElementById("Harvest").addEventListener("click", function() {
    this.disabled = true;
    startTimer();
});

document.getElementById("upgradeTimer").addEventListener("click", upgradeTimer);

document.getElementById("autoHarvest").addEventListener("click", function() {
    if (autoHarvestEnabled) {
        stopAutoHarvest();
    } else {
        startAutoHarvest();
    }
});

startGame();
