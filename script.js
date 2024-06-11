let money = 0;
let timeLeft = 0;
let upgradeableTime = 30; // Variable to store upgraded timer value
let timerInterval;
let time = 30; // Set initial time value
let index1 = 0;
let costs = 10;
let level = 0;
let Exp = 0;
let autoRobberyEnabled = false;
let salary = 10;

function updateTimer() {
    const timerSpan = document.getElementById("timer");
    timerSpan.textContent = timeLeft > 0 ? timeLeft : upgradeableTime;
    // Disable the New Robbery button if the timer is running or auto robbery is enabled
    document.getElementById("newRobbery").disabled = timeLeft > 0 || autoRobberyEnabled;
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

upgradeLevel(); // Call the function with the correct case
console.log("level:", level); // Should print "Lvl: 0"

function upgradeLevel() {
    level = Math.min(Math.floor(Exp / 10) + 0, 1, 20);
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

function restartTimer() {
    clearInterval(timerInterval); // Clear the previous timer interval
    timeLeft = time; // Reset timeLeft to time
    updateTimer();
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        }
        if (timeLeft === 0) { // Check if the timer reaches zero
            clearInterval(timerInterval);
            earnMoney(); // Award money when the timer reaches zero
            updateExp(); // Update experience points
            document.getElementById("newRobbery").disabled = false; // Enable the New Robbery button
        }
    }, 1000);
}

function startTimer() {
    clearInterval(timerInterval); // Clear the previous timer interval
    timeLeft = parseInt(document.getElementById("time").textContent); // Set timeLeft to the value of time
    updateTimer();
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        }
        if (timeLeft === 0) { // Check if the timer reaches zero
            clearInterval(timerInterval);
            earnMoney(); // Award money when the timer reaches zero
            updateExp(); // Update experience points
            document.getElementById("newRobbery").disabled = false; // Enable the New Robbery button
        }
    }, 1000);
}

function startAutoRobbery() {
    autoRobberyEnabled = true;
    document.getElementById("autoRobbery").textContent = "Auto Robbery On";
    autoRobberyInterval = setInterval(() => {
        if (!document.getElementById("newRobbery").disabled) {
            document.getElementById("newRobbery").click();
        }
    }, 1000);
}

function stopAutoRobbery() {
    autoRobberyEnabled = false;
    document.getElementById("autoRobbery").textContent = "Auto Robbery Off";
    clearInterval(autoRobberyInterval);
}

function startGame() {
    timeLeft = 0;
    time = 30; // Set initial time value
    upgradeableTime = 30; // Reset upgradeable
    money = 0; // Set initial money value
    Exp = 0; // Set initial experience value
    updateTimer();
    updateMoney(); // Update the displayed money value
    updateExp(); // Update the displayed experience value
    upgradeLevel(); // Call upgradeLevel to update the level based on Exp
    // Do not start the timer automatically here
}

function endGame() {
    alert("Game Over!"); // Display a message indicating the game is over
}

function updateLevel() {
    document.getElementById("level").textContent = level;
}

document.getElementById("newRobbery").addEventListener("click", function() {
    this.disabled = true; // Disable the New Robbery button when clicked
    startTimer();
});

document.getElementById("upgradeTimer").addEventListener("click", upgradeTimer);

document.getElementById("autoRobbery").addEventListener("click", function() {
    if (autoRobberyEnabled) {
        stopAutoRobbery();
    } else {
        startAutoRobbery();
    }
});

startGame();