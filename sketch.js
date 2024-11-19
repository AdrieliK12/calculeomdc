let inputA, inputB, button, resultContainer;
const rectWidth = 0.6; // Usar proporção da tela
const rectHeight = 0.5; // Usar proporção da tela

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawBackground();

  // Definir largura dos inputs e botão com base na largura da tela
  const elementWidth = windowWidth * 0.2;  // 40% da largura da tela

  // Criar o primeiro input centralizado
  inputA = createInput();
  inputA.size(elementWidth);
  inputA.position(width / 2 - elementWidth / 2, height / 2 - 50);

  // Criar o segundo input centralizado
  inputB = createInput();
  inputB.size(elementWidth);
  inputB.position(width / 2 - elementWidth / 2, height / 2);

  // Criar o botão e aumentar o tamanho, alinhando com os inputs
  button = createButton('Calcular MDC');
  button.size(elementWidth, 40); // Definir a largura e altura do botão
  button.position(width / 2 - elementWidth / 2, height / 2 + 60);
  button.mousePressed(calcular);
  button.style('font-size', '18px');
  button.style('background-color', '#007BFF');
  button.style('color', '#FFF');
  button.style('border', 'none');
  button.style('border-radius', '5px');
  button.style('cursor', 'pointer');

  // Criar o contêiner de resultado
  resultContainer = createDiv();
  resultContainer.position(width / 2 - elementWidth / 2, height / 2 + 120);
  resultContainer.style('font-size', '24px');  // Aumentar o tamanho da fonte
  resultContainer.style('font-weight', 'bold');  // Tornar o texto em negrito
  resultContainer.style('color', '#333');
  resultContainer.style('text-align', 'center');  // Centralizar o texto
  resultContainer.style('width', elementWidth); // Usar largura proporcional
}

function drawBackground() {
  // Definir as cores do gradiente
  let corInicio = color(25, 25, 112); // Azul no topo
  let corFim = color(173, 216, 230); // Branco no fundo

  // Criar o gradiente de cor do topo para o fundo da tela
  for (let i = 0; i <= height; i++) {
    let interCor = lerpColor(corInicio, corFim, map(i, 0, height, 0, 1));
    stroke(interCor);
    line(0, i, width, i); // Desenhar uma linha de cor interpolada
  }

  // Desenhar o retângulo central com dimensões proporcionais
  fill(176, 224, 230);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(width / 2, height / 2, width * rectWidth, height * rectHeight);

  // Título
  textSize(24);
  textAlign(CENTER);
  fill(0);
  text("Digite os números para encontrar o MDC", width / 2, height / 2 - 80);
}

function calcular() {
  // Limpar resultado anterior
  resultContainer.html("");

  // Obter valores dos inputs
  let num1 = int(inputA.value());
  let num2 = int(inputB.value());

  // Verificar se os valores são válidos
  if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 <= 0) {
    resultContainer.html("Por favor, insira números válidos e maiores que zero.");
    return;
  }

  // Função para calcular o MDC usando o algoritmo de Euclides
  function calcularMDC(a, b) {
    while (b !== 0) {
      let temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  }

  // Calcular e mostrar o resultado
  let resultado = calcularMDC(num1, num2);
  resultContainer.html('O MDC é: ' + resultado);
}
