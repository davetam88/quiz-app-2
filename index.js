const STORE = {
  questions: [
    {
      question: 'While campaigning, Donald Trump announced that he could be more presidential than any president ever, except for the possible exception of',
      answers: [
        'That one, you know, who did World War II',
        'Abraham Lincoln when he is wearing the hat',
        'George Washington crossing the Delaware',
        'Jimmy Carter visiting Egypt for the Middle East treaty'
      ],
      correctAnswer:         'Abraham Lincoln when he is wearing the hat'
    },
    {
      question: 'This week, coronavirus cases surged again in many parts of the country, pushing the total since March to over 8.8 million. In response, the president said the United States is',
      answers: [
        'Going to have to take a look at those masks Biden never stops wearing',
        'The vaccine should be ready by the end of the year, so not to worry',
        'Rounding the turn',
        'Not in as bad shape as the people in that Brad Pitt movie about the Zombie virus'
      ],
      correctAnswer:         'Rounding the turn'
    },
    {
      question: 'At a recent rally, Trump bragged about his administratio is work on hypersonic missiles, but he called them "hydrosonic" which is the name of a',
      answers: [
        'Conventional seaplane.',
        'Weapon used in Star Trek.',
        'Toothbrush.',
        'A type of War plane used in Star War'

      ],
      correctAnswer:         'Toothbrush.'
    },
    {
      question: 'At their last debate, Trump claimed Joe Biden¡¯s plan to reduce carbon emissions would mean the end of',
      answers: [
        'Windows',
        'Top-quality golf courses.',
        'Traditional all-American smog.',
        'Gss engines.'

      ],
      correctAnswer:         'Windows'
    },

    {
      question:
        'Asked why Black Americans were "still dying at the hands of law enforcement in this country" Trump said ',
      answers: [
        'Beats me.',
        'So are white people.',
        'Can I make this about suburbs?',
        'Story make up by the democrats'
      ],
      correctAnswer:         'Can I make this about suburbs?'
    }
  ],
  quizStarted: false,
  currentQuestionNum: 0,
  score: 0
};
// var..


/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

/***
 * FUNC:: generateStartPageHtml
 */
function generateStartPageHtml() {
  return `
    <div class="start-screen">
        <p>This quiz will assess your knowledge what Trump had said 
during his campaign trail</p>
        <button class="shopping-item-delete">
        <span id="start-quiz" class="button-label">Start Quiz</span>
        </button>
    </div>
  `;
}

/***
 * FUNC:: generateScoreHtml
 */
function generateScoreHtml() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.currentQuestionNum + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}

/***
 * FUNC:: generateAnswersHtml
 */
function generateAnswersHtml() {
const answersArray = STORE.questions[STORE.currentQuestionNum].answers;
  let answersHtml = '';
  let idx = 0;
  answersArray.forEach(answer => {
    answersHtml += `
      <div tabindex ="${idx + 1}" id="option-container-${idx}">
        <input type="radio" name="options" id="option${idx + 1}" value= "${answer}"  required> 
        <label for="option${idx + 1}"> ${answer}</label>
      </div>
    `;
    idx++;
  });
  return answersHtml;
}

/***
 * FUNC:: generateQuestionHtml
 */
function generateQuestionHtml() {
  currentQuestionNum = STORE.currentQuestionNum;
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
        </div>
        <div class="options">
        <div class="answers">
	  <legend> ${STORE.questions[currentQuestionNum].question} </legend>
        </div>
            ${generateAnswersHtml()}
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
        </fieldset>
        </form >
        `;
}

/***
 * FUNC:: generateFeedbackHTML
 */
function generateFeedbackHTML(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestionNum].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
    `;
  }
  return html;
}

function generateResultsScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store

/***
* FUNC:: renderQuizApp
*/
function renderQuizApp() {
	console.log("in  renderQuizApp");
	
  // rendering the quiz app in the DOM.
  // do startup page.
  currentQuestionNum = STORE.currentQuestionNum;

  if (STORE.quizStarted === false)
  {
    $('main').html(generateStartPageHtml());
  } else if ((currentQuestionNum => 0) && (currentQuestionNum < STORE.questions.length))
  {
    html = generateScoreHtml();
    html += generateQuestionHtml();
    $('main').html(html);
  } else
  {
    $('main').html(generateResultsScreen());
  }

}


/***
 * FUNC:: handleStartClick
 */
function handleStartClick() {
  // hanlde start button click at the starting page
  $('main').on('click', '#start-quiz', function (event) {
    STORE.quizStarted = true;
    renderQuizApp();
  });
}

/***
 * FUNC:: handleNextQuestionClick
 */
function handleNextQuestionClick() {
  $('body').on('click', '#next-question-btn', (event) => {
		  renderQuizApp();
  });
}


/***
 * FUNC:: handleQuestionFormSubmission
 */
function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestionNum = STORE.questions[STORE.currentQuestionNum];

    // get value from checkbox checked by user
    let selectedOption = $('input[name=options]:checked').val();
    /**
     * Creates an id '#option-container' + the index of 
     * the current question in the answers array.
     * 
     * Example: #option-container-0
     */
    let optionContainerId = `#option-container-${currentQuestionNum.answers.findIndex(i => i === selectedOption)}`;
    if (selectedOption === currentQuestionNum.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(generateFeedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHTML('incorrect'));
    }
    STORE.currentQuestionNum++;
    // hide the submit button
    $('#submit-answer-btn').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-btn').show();

  });
}

/***
 * FUNC:: restartQuiz
 */
function restartQuiz() {
  STORE.quizStarted = false;
  STORE.currentQuestionNum = 0;
  STORE.score = 0;
}


/***
 * FUNC:: handleRestartButtonClick
 */
function handleRestartButtonClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    renderQuizApp();
  });
}

/***
 * FUNC:: handleRestartButtonClick
 */
function handleKeyPress() {
// new..
	console.log("in  handleKeyPress");
//         <input type="radio" name="option" id="option1" value="That one" required>
	// handle space keypress input type as above, it would be inside the question page.
	// highlight the button.
	// and move on to check the status.
}

// callback function
/***
 * FUNC:: handleQuizApp
 */
function handleQuizApp() {
  renderQuizApp();
  handleStartClick();
  handleQuestionFormSubmission();
  handleStartClick();
  handleNextQuestionClick();
  handleRestartButtonClick();
  handleKeyPress();
}

// when the page loads, call `handleQuizApp`
$(handleQuizApp);
