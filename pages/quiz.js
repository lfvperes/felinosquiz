import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

const answerStates = {
  unanswered: '',
  wrong: db.theme.colors.wrong,
  success: db.theme.colors.success,
};

function QuestionWidget({ 
  question, 
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  const [answer, setAnswerState] = React.useState(answerStates.unanswered);
  return (
    <Widget
      style={{
        backgroundColor: `${answer}`
      }}
    >
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          Pergunta 
          {` ${questionIndex + 1} `} 
          de 
          {` ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img 
        alt='Descrição'
        style={{
          width: '100%',
          height: '150px',
          objectFit:'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form 
          onSubmit={(eventInfo) => {
            eventInfo.preventDefault();
            console.log(eventInfo.target);
            setAnswerState(answerStates.wrong);
            onSubmit();
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                //style={{ backgroundColor: `${db.theme.colors.success}` }}
              >
                <input 
                  //style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  //onSelect=
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const selectedAlternative = '';

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1* 1000);  
  }, []);
  
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === 'QUIZ' && (
          <QuestionWidget 
            question={question} 
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}
        
        {screenState === 'LOADING' && <LoadingWidget />}
        {screenState === 'RESULT' && (
          <div>
            Você acertou X questões, parabéns!
          </div>
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
