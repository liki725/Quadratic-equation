const coefA = document.getElementById('a');
const coefB = document.getElementById('b');
const coefC = document.getElementById('c');

let checkerDisplayBad = false;
let checkerMenuDisplay = false;
let checkerInfoOption = false;
let currentMethod = 'Silver';

let title = document.querySelector('h1');

let bottomDivIn = document.querySelector('div.choice div.bottom div.input');

const section = document.querySelector('section');

const btnRes = document.querySelector('button.ready');

const example = document.querySelector('h4.example');

const solutions = document.querySelectorAll('svg.star');

const infoDivforOption = document.querySelector('div.input');

function expresExample(display, Xstyle, root, numerator, hasLine, denominator) {

  let expression = document.createElement('div');
  expression.classList.add('expressionExample');
  expression.style.display = display;
  document.body.appendChild(expression);

  let X = document.createElement('span');
  X.classList.add('equal');
  X.innerHTML = root;
  X.style.margin = Xstyle;
  expression.appendChild(X);

  let findXFraction = document.createElement('div');
  findXFraction.classList.add('fraction');
  expression.appendChild(findXFraction);

  let spanNumerator = document.createElement('span'),
  spanLine = document.createElement('span'),
  spanDenominator = document.createElement('span');
  //spanEqual = document.createElement('span');

  //spanEqual.classList.add('equal');
  //spanEqual.innerHTML = equal;
  //expression.appendChild(spanEqual);

  spanNumerator.classList.add('numerator');
  spanLine.classList.add('line');
  spanDenominator.classList.add('denominator');

  spanNumerator.innerHTML = numerator;
  spanLine.style.display = hasLine;
  spanDenominator.innerHTML = denominator;

  findXFraction.append(spanNumerator, spanLine, spanDenominator);
}

function expres(numerator, denominator, equal) {
  let expression = document.createElement('div');
  expression.classList.add('expression');
  document.body.appendChild(expression);

  let findXFraction = document.createElement('div');
  findXFraction.classList.add('fraction');
  expression.appendChild(findXFraction);

  let spanNumerator = document.createElement('span'),
  spanLine = document.createElement('span'),
  spanDenominator = document.createElement('span'),
  spanEqual = document.createElement('span');

  spanEqual.classList.add('equal');
  spanEqual.innerHTML = equal;
  expression.appendChild(spanEqual);

  spanNumerator.classList.add('numerator');
  spanLine.classList.add('line');
  spanDenominator.classList.add('denominator');

  spanNumerator.innerHTML = numerator;
  spanDenominator.innerHTML = denominator;

  findXFraction.append(spanNumerator, spanLine, spanDenominator);
}

function animInfoDiv(activeStar) {
  for ( let star of solutions) {
    star.style.pointerEvents = 'none';
    if (star !== activeStar) {
      if (!infoDivforOption.classList.contains('show')) {
        infoDivforOption.classList.add('show');
      }

      setTimeout(function () {
        infoDivforOption.classList.remove('show');
        star.style.pointerEvents = 'all';
      }, 4000)
    }
  }
};
animInfoDiv()



solutions.forEach(function (solut) {
  solut.addEventListener('mouseenter', function () {
    solut.classList.add('hover');
  });
  solut.addEventListener('mouseleave', function () {
    solut.classList.remove('hover');
    solut.style.transform = 'scale(1)';
  });


  let optionSpan = document.createElement('span');
  optionSpan.innerHTML = 'Выбрано <em>СТАНДАРТНОЕ</em> решение';
  if (!checkerInfoOption) {
    bottomDivIn.appendChild(optionSpan);
    optionSpan.classList.add('infoOption');
    checkerInfoOption = !checkerInfoOption;
  }



  solut.addEventListener('click', function () {

    animInfoDiv(solut)

    document.querySelector('div.input').classList.add('show');
    if (solut.classList.contains('gold')) {
      if (document.querySelector('span.infoOption').innerHTML.includes('СТАНДАРТНОЕ')) {
        document.querySelector('span.infoOption').innerHTML = document.querySelector('span.infoOption').innerHTML.replace('СТАНДАРТНОЕ', 'ПОЛНОЕ');
      }
      currentMethod = 'Gold';
    } else {
      document.querySelector('span.infoOption').innerHTML = document.querySelector('span.infoOption').innerHTML.replace('ПОЛНОЕ', 'СТАНДАРТНОЕ');
      currentMethod = 'Silver';
    }
    for (elem of solutions) {
      elem.classList.remove('active');
    }
    solut.classList.add('active');
  });
});

let strRes = ``;


coefA.addEventListener('input', function () {
  if (Number(coefA.value) == 0) {
    title.innerHTML = title.innerHTML.replace('квадратного', 'линейного');
  } else {
    title.innerHTML = title.innerHTML.replace('линейного', 'квадратного');
  }
})

btnRes.addEventListener('click', function () {

  const D = (coefB.value ** 2) - (4 * coefA.value * coefC.value);

  const x1 = (coefB.value * -1 + Math.sqrt(D)) / (2 * coefA.value);
  const x2 = (coefB.value * -1 - Math.sqrt(D)) / (2 * coefA.value);

  const x0 = (coefB.value * -1) / (2 * coefA.value);

  let paragraph = document.createElement('p');
  paragraph.classList.add('res');
  let span = document.createElement('span');
  span.classList.add('numRes');

  
  switch (true) {
    case (D > 0):
      if (checkerDisplayBad) {
        document.querySelector('p.bad').style.display = 'none';
      }
      document.body.appendChild(paragraph);
      section.style.display = 'none';
      btnRes.style.display = 'none';
      example.style.display = 'none';

      if (currentMethod === 'Silver') {
      paragraph.classList.add('good');
      paragraph.innerHTML = `Ответ: `;
      paragraph.appendChild(span);    // из-за JS пришлось
      strRes = `${x1} | ${x2}`;
      span.innerHTML = strRes;
    } else {
      let divExer = document.createElement('div');
      document.body.appendChild(divExer);
      let pExer = document.createElement('p');
      divExer.appendChild(pExer);
      pExer.classList.add('decisionProcess', 'whitespaceCoef');
      let contentExer = ` a=${coefA.value}   b=${coefB.value}   c=${coefC.value} `;
      pExer.innerHTML = contentExer;
      let pD = document.createElement('p');
      pD.classList.add('decisionProcess')
      divExer.appendChild(pD);
      console.log(coefB);
      pD.innerHTML = ` D = b<sup>2</sup> - 4ac = ${coefB.value}<sup>2</sup> - 4 * ${ coefA.value} * ${coefC.value} = ${coefB.value ** 2} - ${4 * coefA.value * coefC.value} = ${D}`;
      let pRes = document.createElement('p');
      pRes.classList.add('decisionProcess');
      divExer.appendChild(pRes);
      pRes.innerHTML = `D > 0, два корня`;

      expresExample( `flex`, `0 15px 0 0`, `X = `, `-b ± √D`, `block`, `2a`);

      expresExample( `inline-flex`, `0 15px 0 0`, `X<sub>1</sub> = `, `${coefB.value * -1} + √${D}`, `block`, `2*${coefA.value}`);
      expresExample( `inline-flex`, `0 15px`, "=", `${coefB.value * -1} + ${Math.sqrt(D)}`, `block`, `${2 * coefA.value}`);
      expresExample( `inline-flex`, `0 15px`, "=", `${coefB.value * -1 + Math.sqrt(D)}`, `block`, `${2 * coefA.value}`);
      expresExample( `inline-flex`, `0 15px`, "=", `${(coefB.value * -1 + Math.sqrt(D)) / (2 * coefA.value)}`, `none`, ``);

      let Or = document.createElement('p');
      Or.innerHTML = `ИЛИ`;
      Or.classList.add('OR');
      document.body.appendChild(Or);

      expresExample( `inline-flex`, `0 15px 0 0`, `X<sub>2</sub> = `, `${coefB.value * -1} - √${D}`, `block`, `2*${coefA.value}`);
      expresExample( `inline-flex`, `0 15px`, "=", `${coefB.value * -1} - ${Math.sqrt(D)}`, `block`, `${2 * coefA.value}`);
      expresExample( `inline-flex`, `0 15px`, "=", `${coefB.value * -1 - Math.sqrt(D)}`, `block`, `${2 * coefA.value}`);
      expresExample( `inline-flex`, `0 15px`, "=", `${(coefB.value * -1 - Math.sqrt(D)) / (2 * coefA.value)}`, `none`, ``);
    }
      break;
    case (D === 0):
      if (checkerDisplayBad) {
        document.querySelector('p.bad').style.display = 'none';
      }
      document.body.appendChild(paragraph);
      section.style.display = 'none';
      btnRes.style.display = 'none';
      example.style.display = 'none';
      paragraph.classList.add('good');
      paragraph.innerHTML = `Ответ: `;
      paragraph.appendChild(span);    // из-за JS пришлось
      strRes = x0;
      span.innerHTML = strRes;
      break;
    case (D < 0):
      anime({
        targets: 'button.ready',
        backgroundColor: '#B22222',
        direction: 'alternate',
        duration: 200,
        easing: 'linear'
      });
      anime({
        targets: 'button.ready',
        keyframes: [
          { boxShadow: '5px 5px 10px transparent' },
          { boxShadow: '0 0 200px #B22222' }
        ],
        direction: 'alternate',
        duration: 200,
        easing: 'linear'
      });


      if (!checkerDisplayBad) {
        document.body.appendChild(paragraph);
        span.innerHTML = D;
        paragraph.classList.add('bad');
        paragraph.innerHTML = `При решении квадратного уравнения оказалось, что D < 0, D = `;
        paragraph.appendChild(span);
        checkerDisplayBad = !checkerDisplayBad;
      }

      let currentSpan = document.querySelector('span.numRes');
      currentSpan.innerHTML = D;

      paragraph.addEventListener('mouseenter', function () {
        anime({
          targets: paragraph,
          '-webkit-text-stroke': '1.5px #B22222',
          color: 'rgba(0, 0, 0, 0)',
          easing: 'linear',
          duration: 0
        });
      });
      paragraph.addEventListener('mouseleave', function () {
        anime({
          targets: paragraph,
          '-webkit-text-stroke': '1.5px transparent',
          color: '#B22222',
          easing: 'linear',
          duration: 0
        });
      });
      paragraph.addEventListener('click', function () {
        if (!checkerMenuDisplay) {
          let div = document.createElement('div');
          document.body.appendChild(div);
          div.classList.add('clue');
          let clueText = document.createElement('p');
          div.appendChild(clueText);
          clueText.classList.add('paragraphClue');
          clueText.innerHTML = `Если, то уравнение не имеет действительных корней!`;
          let em = '<em> D < 0</em>';
          clueText.innerHTML = clueText.innerHTML.slice(0, 4) + em + clueText.innerHTML.slice(4);
          checkerMenuDisplay = !checkerMenuDisplay;

          anime({
            targets: div,
            right: 'calc(25% - 300px)',
            easing: 'linear',
            duration: 1500
          });
        }
      })
      break;
  }
})  