 // Model
 const model = {
    secretNumber: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 10
    attempts: 0,
    maxAttempts: 10,
    isGameOver: false,
    lastGuess: null
  };

  // View
  const view = {
    displayResult: function (message, isGameOver, isSuccess) {
      document.getElementById('result').innerText = message;

      if (isGameOver) {
        document.body.classList.remove('success');
        document.body.classList.add('game-over');
      } else if (isSuccess) {
        document.body.classList.remove('game-over');
        document.body.classList.add('success');
      } else {
        document.body.classList.remove('game-over', 'success');
      }
    }
  };

  // Controller
  const controller = {
    makeGuess: function () {
      if (model.isGameOver) {
        view.displayResult("Game over. Please start a new game.", true, false);
        return;
      }

      const guessInput = document.getElementById('guessInput');
      const userGuess = parseInt(guessInput.value);

      if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        view.displayResult("Please enter a valid number between 1 and 100.", false, false);
        return;
      }

      model.attempts++;
      let hintMessage = "";
      
      const currentDistance = Math.abs(model.secretNumber - userGuess);
      const lastDistance = model.lastGuess !== null ? Math.abs(model.secretNumber - model.lastGuess) : null;

      if (lastDistance !== null) {
        if (currentDistance < lastDistance) {
          hintMessage = "Getting warmer. ";
        } else if (currentDistance > lastDistance) {
          hintMessage = "Getting colder. ";
        } else {
          hintMessage = "Same distance. ";
        }
      }
      
      if (userGuess === model.secretNumber) {
        model.isGameOver = true;
        view.displayResult(`Congratulations! You guessed the number in ${model.attempts} attempts.`, false, true);
      } else {
        if (model.attempts >= model.maxAttempts) {
          model.isGameOver = true;
          view.displayResult(`Sorry, you've reached the maximum attempts. The correct number was ${model.secretNumber}.`, true, false);
        } else {
          const remainingAttempts = model.maxAttempts - model.attempts;
          view.displayResult(`${hintMessage}Wrong guess. ${remainingAttempts} attempts left.`, false, false);
        }
      }
      model.lastGuess = userGuess;
    }
  };