let workouts = {
  "DB Military Press": "militarypress.gif",
  "DB Rows": "rows.gif",
  "DB Curls": "curls.gif",
  "DB Squats": "squats.gif",
  "DB Renegade Push Ups": "pushuprows.gif",
  "DB Bench Press": "benchpress.gif",
  "DB Split Squat": "splitsquat.gif",
  "DB Lunges": "lunges.gif",
  "DB Tricep Extension": "tricepext.gif",
  "DB Kickbacks": "kickbacks.gif",
  "DB Flys": "flys.gif",
  "DB Incline Press": "incline.gif",
  "DB Goblet Squat": "goblet.gif",
  "DB Arnold Press": "arnold.gif",
  "DB Cleans": "cleans.gif",
  "DB Front / Lat Raise": "frontlatraise.gif",
  "DB Pullover": "pullover.gif",
  "DB Shoulder Press": "shoulderpress.gif",
  "DB Thruster Squat": "thruster.gif",
  "DB Bent Over Rows": "standingsrows.gif"
};

let routine = [];
let currentExerciseIndex = 0;
let timerInterval = null;
let setTime = 30; // default station time

// Populate the workout dropdown menu with the exercises
function populateDropdown() {
  const workoutDropdown = document.getElementById("workout-dropdown");
  console.log("Populating dropdown..."); // Debugging log

  workoutDropdown.innerHTML = ""; // Clear existing options

  // Create and append a default "select" option
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select a workout";
  defaultOption.value = "";
  workoutDropdown.appendChild(defaultOption);

  // Add all workout options to the dropdown
  Object.keys(workouts).forEach((exercise) => {
    const option = document.createElement("option");
    option.text = exercise;
    option.value = exercise;
    workoutDropdown.appendChild(option);
  });

  console.log("Dropdown populated:", workoutDropdown); // Debugging log
}

// Handle adding workouts to routine
document.getElementById("add-workout").addEventListener("click", () => {
  const workoutDropdown = document.getElementById("workout-dropdown");
  const selectedWorkout = workoutDropdown.value;

  if (selectedWorkout && !routine.includes(selectedWorkout)) {
    routine.push(selectedWorkout);
    updateWorkoutList();
  } else if (!selectedWorkout) {
    alert("Please select a workout from the dropdown.");
  }
});

// Update workout list displayed on the left
function updateWorkoutList() {
  const routineList = document.getElementById("routine-list");
  routineList.innerHTML = ""; // Clear the list before updating

  routine.forEach((workout, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${workout}`;
    if (index === currentExerciseIndex) {
      li.classList.add("highlight");
    }
    routineList.appendChild(li);
  });
}

// Start the workout routine
document.getElementById("start-workout").addEventListener("click", () => {
  if (routine.length === 0) {
    alert("Please add workouts to the routine first!");
    return;
  }
  currentExerciseIndex = 0; // Reset to the first exercise
  startWorkout();
});

// Start the workout routine
function startWorkout() {
  if (currentExerciseIndex < routine.length) {
    const exercise = routine[currentExerciseIndex];

    // Update the list to highlight the current workout
    updateWorkoutList();

    // Show the GIF for the current exercise
    showCurrentGif();
    startTimer(setTime); // Example: 30 seconds per exercise
  } else {
    playTimerSound();
    alert("Workout complete!");
    currentExerciseIndex = 0;

    // Update the list to remove any highlights when done
    updateWorkoutList();
    stopGif();
  }
}

// Show GIF for current exercise
function showCurrentGif() {
  const currentExercise = routine[currentExerciseIndex];
  if (currentExercise && workouts[currentExercise]) {
    // Ensure the GIF path is correct for the 'media' folder
    const gifPath = `media/${workouts[currentExercise]}`;
    const gifPlayer = document.getElementById("gif-player");
    gifPlayer.src = gifPath;
  }
}

// Stop GIF playback
function stopGif() {
  const gifPlayer = document.getElementById("gif-player");
  gifPlayer.src = ""; // Clear the GIF source
}

// Start the timer
/*function startTimer(duration) {
  let remainingTime = duration;
  const timerDisplay = document.getElementById("timer");

  clearInterval(timerInterval); // Ensure no overlapping timers
  timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval); // Stop the timer
      playTimerSound(); 
      currentExerciseIndex++; // Move to the next exercise
      startWorkout(); // Start the next exercise
    }

    remainingTime--;
  }, 1000);
}*/

function startTimer(duration) {
  let remainingTime = duration;
  const timerDisplay = document.getElementById("timer");

  clearInterval(timerInterval); // Ensure no overlapping timers
  timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval); // Stop the timer immediately
      playTimerSound();  // Play the sound immediately after stopping the timer
      currentExerciseIndex++; // Move to the next exercise
      startWorkout(); // Start the next exercise
    }

    remainingTime--;
  }, 1000);
}


// Function to play the timer sound
function playTimerSound() {
  const sound = document.getElementById("timer-sound");
  
  if (sound) {
    console.log("Playing timer sound...");
    sound.play().catch((error) => {
      alert(error);
    });
  } else {
    alert(error);
  }
}

// Update station time
document.getElementById("update-time").addEventListener("click", () => {
  const timeInput = document.getElementById("station-time").value.trim();
  const stationTime = parseInt(timeInput, 10);
  
  if (isNaN(stationTime) || stationTime <= 0) {
    alert("Please enter a valid time in seconds.");
    return;
  }

  // Update the time globally (assuming you have a variable for this)
  setTime = stationTime;
  alert(`Station time updated to ${stationTime} seconds.`);
});

// Call populateDropdown on page load
window.onload = () => {
  populateDropdown();
};
