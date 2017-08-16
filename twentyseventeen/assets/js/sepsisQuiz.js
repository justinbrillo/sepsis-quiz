var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SepsisQuiz = function () {
  function SepsisQuiz(questions) {
    _classCallCheck(this, SepsisQuiz);

    this.questions = SepsisQuiz.buildQuestions(questions);
    this.renderedQuestions = SepsisQuiz.renderQuestions(this.questions);
    this.score = 0;
  }

  _createClass(SepsisQuiz, [{
    key: 'processQuestion',


    /**
     * Processes the current question and then moves onto the next question
     * @param userInput
     */
    value: function processQuestion(userInput) {
      if (!userInput) {
        return;
      }
      this.score += userInput === this.currentQuestion.answer;
      this.currentQuestion.userSelected = userInput;

      var hasUnansweredQuestions = this.currentQuestionIndex < this.questions.length - 1;
      this.currentQuestionIndex += hasUnansweredQuestions;

      this.status = hasUnansweredQuestions ? 'pending' : 'finished';
    }

    /**
     *
     * @param evt
     */

  }, {
    key: 'handleOnSelect',
    value: function handleOnSelect(evt) {
      var val = evt.target.value;
      this.processQuestion(val);
    }
  }], [{
    key: 'renderChoices',
    value: function renderChoices() {
      var choices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return choices.reduce(function (html, choice) {
        return html + ' <div class="choice">' + choice + '</div>';
      }, '<div id="choices" class="choices">') + '</div>';
    }
  }, {
    key: 'renderQuestions',
    value: function renderQuestions() {
      var questions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return questions.reduce(function (html, question, idx) {
        return '\n        ' + html + '\n          <div class="question-container">\n          <div class="question-number">Question #' + (idx + 1) + '</div>\n          <div class="under-card-top"></div>\n          <div class="card-container">\n            <div class="question">' + question.questionText + '</div>\n            <div class="choices">\n              ' + question.renderedChoices + '\n            </div>\n          </div>\n          <div class="under-card-bottom-container">\n            <div class="under-card-bottom">\n              <div>' + question.learnMore.text + '</div>\n              <div class="learn-more"><a href="' + question.learnMore.link + '" target="_blank">Learn More <i class="fa fa-angle-right" aria-hidden="true"></i></a></div>\n            </div>\n          </div>\n        </div>\n      ';
      }, '');
    }

    /**
     *
     * @param answer
     * @param wrongAnswers
     * @param q
     * @returns {Array}
     * @private
     */

  }, {
    key: 'buildChoices',
    value: function buildChoices(answer, wrongAnswers) {

      var choices = [];

      /*all of the  above*/
      if (typeof answer === 'boolean' && wrongAnswers instanceof Array) {
        answer = 'All of the above.';
        choices = wrongAnswers.concat(answer);
      }

      /* multiple choice*/
      else if (wrongAnswers instanceof Array) {
          choices = SepsisQuiz.shuffleArray(wrongAnswers.concat(answer)); // shuffle the array
        }

        /* true or false */
        else if (typeof answer === 'boolean') {
            choices = ['True.', 'False.'];
          }

      return choices;
    }

    /**
     * Static function to build the questions with a questions list
     * @param questions
     */

  }, {
    key: 'buildQuestions',
    value: function buildQuestions(questions) {
      if (!questions || !(questions instanceof Array)) {
        return [];
      }
      return questions.map(function (q) {
        q.choices = SepsisQuiz.buildChoices(q.answer, q.wrongAnswers) || [];
        q.renderedChoices = SepsisQuiz.renderChoices(q.choices);

        return q;
      });
    }

    /**
     *  Static fucntion to shuffle an array
     * @param arr
     * @returns {Array.<T>}
     */

  }, {
    key: 'shuffleArray',
    value: function shuffleArray(arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    }
  }]);

  return SepsisQuiz;
}();

jQuery(document).ready(function ($) {

  var questions = [{
    questionText: "About how many people in the U.S. die each year because of sepsis?",
    wrongAnswers: ["45,000", "1,200,000", "10,000"],
    answer: "258,000",
    learnMore: {
      text: "Every two minutes, a life is lost to sepsis in the U.S., totaling over a quarter million people every year. That number jumps to an estimated 8 million across the globe.",
      link: "http://www.sepsis.org/resources/diagnosed-with-sepsis/"
    }
  }, {
    questionText: "What is sepsis?",
    wrongAnswers: ["A local infection, such as cellulitis or appendicitis.", "An infection in the blood.", "A contagious disease."],
    answer: "Your body's toxic response to an infection.",
    learnMore: {
      text: "More than 40% of Americans have never heard the word sepsis. It’s your body’s extreme and toxic response to an infection. It's life threatening and, without the right treatment, can cause organ failure, amputation, and death.",
      link: "http://www.sepsis.org/sepsis/definition/"
    }
  }];

  var sepsisQuiz = new SepsisQuiz(questions);

  function render(sepsisQuiz) {
    /* ------ status ------ */
    $('#score').html(sepsisQuiz.score);

    /* ------ questions ------ */
    $('#questions_container').html(sepsisQuiz.renderedQuestions);
  }
  render(sepsisQuiz);

  /* ------ event handlers ------ */
  // :O

  console.log('quiz:', sepsisQuiz);
});