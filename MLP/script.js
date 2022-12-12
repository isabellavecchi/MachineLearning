class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for(let i=0; i<this.rows; i++) {
            this.data[i] = [];
            for(let j=0; j<this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    multiply(n) {
        if (n instanceof Matrix) {
            if(this.cols == n.rows) {
                let m = new Matrix(this.rows, n.cols)
                for(let i=0; i<this.rows; i++) {
                    for(let j=0; j<n.cols; j++) {
                        for(let k=0; k<this.cols; k++) {
                            m.data[i][j] += this.data[i][k] * n.data[k][j]; 
                        }
                    }
                }
                return m;
            } else {
                console.log('Num de Colunas de A deve ser igual ao num de Linhas de B.')
                return undefined;
            }
        }
        
        else {
            let result = new Matrix(this.rows,this.cols);
            for(let i=0; i<this.rows; i++) {
                for(let j=0; j<this.cols; j++) {
                    result.data[i][j] = n*this.data[i][j];
                }
            }
            return result;
        }
    }

    multiplyElements(n) {
        if (n instanceof Matrix) {
            if(this.cols == n.cols && this.rows == n.rows) {
                let m = new Matrix(this.rows, this.cols)
                for(let i=0; i<this.rows; i++) {
                    for(let j=0; j<this.cols; j++) {
                        m.data[i][j] = this.data[i][j] * n.data[i][j]; 
                    }
                }
                return m;
                
            } else if(n.cols == 1 && n.rows == 1) {
                this.multiplyElements(n[0][0]);
            } else {
                console.log('Num de Colunas de A deve ser igual ao num de Linhas de B.')
                return undefined;
            }
        }
        
        else {
            let result = new Matrix(this.rows,this.cols);
            for(let i=0; i<this.rows; i++) {
                for(let j=0; j<this.cols; j++) {
                    result.data[i][j] = n*this.data[i][j];
                }
            }
            return result;
        }
    }

    add(n) {
        let result = new Matrix(this.rows,this.cols);
        if (n instanceof Matrix) {
            if (n.cols == 1) {
                for(let i=0; i<this.rows; i++) {
                    for(let j=0; j<this.cols; j++) {
                        result.data[i][j] = this.data[i][j] + n.data[i][0];
                    }
                }
            } else {
                for(let i=0; i<this.rows; i++) {
                    for(let j=0; j<this.cols; j++) {
                        result.data[i][j] = this.data[i][j] + n.data[i][j];
                    }
                }
            }
        } else {
            for(let i=0; i<this.rows; i++) {
                for(let j=0; j<this.cols; j++) {
                    result.data[i][j] = this.data[i][j] + n;
                }
            }
        }
        return result;
    }

    sumElements() {
        let result = 0;
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.cols; j++) {
                result += this.data[i][j];
            }
        }
        return result;
    }

    subtract(n) {
        let result = new Matrix(this.rows,this.cols);
        if (n instanceof Matrix) {
            if (n.cols == 1) {
                for(let i=0; i<this.rows; i++) {
                    for(let j=0; j<this.cols; j++) {
                        result.data[i][j] = this.data[i][j] - n.data[i][0];
                    }
                }
            } else {
                for(let i=0; i<this.rows; i++) {
                    for(let j=0; j<this.cols; j++) {
                        result.data[i][j] = this.data[i][j] - n.data[i][j];
                    }
                }
            }
        } else {
            for(let i=0; i<this.rows; i++) {
                for(let j=0; j<this.cols; j++) {
                    result.data[i][j] = this.data[i][j] - n;
                }
            }
        }
        return result;
    }

    map(func) {
        let mappedResult = new Matrix(this.rows, this.cols);
        //apply a function to every element of matrix
        for(let i=0; i<this.rows; i++) {
            for(let j=0; j<this.cols; j++) {
                mappedResult.data[i][j] = func(this.data[i][j]);
            }
        }
        return mappedResult;
    }

    randomize(menor, maior) {
        let aux = 0;
        for(let i=0; i<this.rows; i++) {
            for(let j=0; j<this.cols; j++) {
                aux = Math.floor(((maior-menor)*(Math.random()) + menor)*100);
                this.data[i][j] = aux/100;
            }
        }
    }

    transpose() {
        let result = new Matrix(this.cols, this.rows);
        for(let i=0; i<this.rows; i++) {
            for(let j=0; j<this.cols; j++) {
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }

    print() {
        console.table(this.data);
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length,1);
        for(let i=0; i<arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    static fromStrings(strArr) {
        let len = strArr.length();
        let matrix = new Matrix(len,1);
        for(let i=0; i<len; i++) {
            matrix.data[i] = parseFloat(strArr[i]);
        }
        return matrix;
    }
}



function sigmoid(x) {
    return (2 / (1 + Math.exp(-x))) -1;
}

function derSigmoid(x) {
    let f1 = sigmoid(x);
    return 1/2*(1+f1)*(1-f1);
}

class Layer {

    constructor(qtdEntrada, qtdPerceptron) {
        this.qtdEntrada = qtdEntrada;
        this.qtdPerceptron =qtdPerceptron;

        this.weights = new Matrix(qtdPerceptron, qtdEntrada);
        this.weights.randomize(-0.5, 0.5);

        this.bias = new Matrix(qtdPerceptron,1);
        this.bias.randomize(-0.5, 0.5);
        
        this.yLiquido = new Matrix(qtdPerceptron, 1);
        this.y = new Matrix(qtdPerceptron, 1);
    }

    generateOutput (input) {
        this.yLiquido = this.weights.multiply(input);
        this.yLiquido = this.yLiquido.add(this.bias);
        //funcao de ativacao
        this.y = this.yLiquido.map(sigmoid);
    }
}



function quadratic(x) {
    return x**2;
}

class NeuralNetwork {

    constructor(input_array, qtdHidLayers, qtdPerceptronPorLayer, target_array, screenOutput) {
        this.input = Matrix.fromArray(input_array);
        let qtdInput = input_array.length;
        this.qtdHidLayers = qtdHidLayers;
        this.qtdPerceptronPorLayer  = qtdPerceptronPorLayer;
        this.target = Matrix.fromArray(target_array);
        let qtdOutput = target_array.length;
        this.layers = [];

        this.alfa = 0.1;
        this.maxError = 0.0001;
        this.maxCicles = 500000;

        this.screenOutput = screenOutput;

        if(this.qtdHidLayers != 0) {
            this.layers[0] = new Layer(qtdInput, qtdPerceptronPorLayer);
        
            for (let i=1; i<qtdHidLayers; i++) {
                this.layers[i] = new Layer(qtdPerceptronPorLayer, qtdPerceptronPorLayer);
            }
            this.layers[qtdHidLayers] = new Layer(qtdPerceptronPorLayer, qtdOutput);

        } else {
            this.layers[0] = new Layer(qtdInput, qtdOutput);
        }
    }

    feedForward() {
        //Gerando os neuronios escondidos
        this.layers[0].generateOutput(this.input);
        let output = this.layers[0].y;
        for (let i=1; i<=this.qtdHidLayers; i++) {
            this.layers[i].generateOutput(output);
            output = this.layers[i].y;
        }
        return output; 
    }

    backPropagation() {
        let deltaW = [];
        let deltaB = [];
        let error = this.target.subtract(this.layers[this.qtdHidLayers].y);
        let deltinha;

        //Calculo do delta para a ultima camada
        let layerAnterior = this.layers[this.qtdHidLayers-1]
        let layerAtual = this.layers[this.qtdHidLayers]
        let layerPosterior
        deltinha = error.multiplyElements(layerAtual.y.map(derSigmoid));
        deltaB[this.qtdHidLayers] = deltinha.multiply(this.alfa);
        deltaW[this.qtdHidLayers] = layerAnterior.yLiquido.multiply(deltaB[this.qtdHidLayers].transpose());
        deltaW[this.qtdHidLayers] = deltaW[this.qtdHidLayers].transpose();

        //let j = 1
        //calculo do delta para as camadas escondidas
        for (let i=this.qtdHidLayers-1; i>0; i--) {
            layerPosterior = layerAtual;
            layerAtual = this.layers[i]

            deltinha = (layerPosterior.weights.transpose()).multiply(deltinha);
            deltinha = deltinha.multiplyElements(layerAtual.yLiquido.map(derSigmoid));
            deltaB[i] = deltinha.multiply(this.alfa);
            deltaW[i] = layerAtual.y.multiply(deltaB[i].transpose());
            deltaW[i] = deltaW[i].transpose();
        }

        //calculo do delta para a primeira camada
        deltinha = (layerAtual.weights.transpose()).multiply(deltinha);
        deltinha = deltinha.multiplyElements(this.layers[0].yLiquido.map(derSigmoid));
        deltaB[0] = deltinha.multiply(this.alfa);
        deltaW[0] = this.input.multiply(deltaB[0].transpose());
        deltaW[0] = deltaW[0].transpose();
    
        //Atualizando os Weights and bias
        for (let i=1; i<=this.qtdHidLayers; i++) {
            this.layers[i].weights = this.layers[i].weights.add(deltaW[i]);
            this.layers[i].bias = this.layers[i].bias.add(deltaB[i]);
        }
    }

    getFinalError(output) {
        let error = output.subtract(this.target);
        error = error.map(quadratic);
        return (1/2)*error.sumElements();
    }

    trainMLP() {
        let cicles = 0;
        let errors = [];
        while(true) {
            console.log('Ciclo = ' + cicles);
            let output = this.feedForward();
            let finalError = this.getFinalError(output);
            errors[cicles] = [cicles, finalError];
            if( (finalError <= this.maxError) || (cicles >  this.maxCicles)) {
                this.screenOutput.plotTable(this.target,output,cicles,finalError)
                this.screenOutput.plotChart(errors);
                return output, errors;
            }
            cicles++;
            this.backPropagation();
        }
    }

    trainP() {
        let output = this.feedForward();
        //normal train
    }
}

function toArray(str) {
    let flt = [];
    for (i in str) {
        var aux = parseFloat(str[i]);
        flt.push(aux);
    }
    return flt;
}

class ScreenInput {
    constructor(input, target, qtHLayer, qtPerceptron) {
        this.input = input;
        this.target = target;
        this.qtHLayer = qtHLayer;
        this.qtPerceptron = qtPerceptron;
    }

    getInputs() {
        let input = this.input.value;
        input = input.replace(" ","");
        input = input.split(",");
        return toArray(input);
    }

    getTargets() {
        let target = this.target.value;
        target = target.replace(" ","");
        target = target.split(",");
        return toArray(target);
    }

    getQtHLayers() {
        return parseInt(this.qtHLayer.value);
    }

    getQtPerceptrons() {
        return parseInt(this.qtPerceptron.value);
    }
}

class ScreenOutput {
    constructor(tBodyOut, tdErroTotal, tdCiclos) {
        this.tBodyOut = tBodyOut;
        this.tdErroTotal = tdErroTotal;
        this.tdCiclos = tdCiclos;
    }

    plotTable(target, output, cicle, finalError) {
        this.tBodyOut.innerText = '';
        for (let i=0; i<output.rows; i++) {
            let tr = this.tBodyOut.insertRow();

            let td_target = tr.insertCell();
            let td_output = tr.insertCell();

            td_target.innerText = target.data[i][0];
            td_output.innerText = output.data[i][0];
        }
        this.tdErroTotal.innerText = finalError;
        this.tdCiclos.innerText = cicle;
    }

    plotChart(errors) {
        google.charts.load('44', {
            callback: drawBackgroundColor,
            packages: ['corechart']
        });
    
        function drawBackgroundColor() {
            var c = errors;
          
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Ciclos');
            data.addColumn('number', 'Erro');
          
            data.addRows(c);
          
            var options = {
              hAxis: {
                title: 'Ciclo'
              },
              vAxis: {
                title: 'Erro'
              },
              backgroundColor: '#f1f8e9'
            };
          
            var chart = new google.visualization.LineChart(document.getElementById('grafico'));
            chart.draw(data, options);
          }
    }
}

function setup() {
    // let input = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    // let target = [-0.9602, -0.5770, -0.0729, 0.3771, 0.6405, 0.6600, 0.4609, 0.1336, -0.2013, -0.4344, -0.5000];

    const fInputs = document.getElementById("fInputs");
    const fTargets = document.querySelector('form[name=Data] div[name=Target] input[name=fTargets]');
    const qtLayer = document.querySelector('form[name=Dimension] div[name=QtLayer] input[name=qtLayers]');
    const qtPerceptron = document.querySelector('form[name=Dimension] div[name=QtPerceptron] input[name=qtPerceptron]');
   
    const tBodyOut = document.getElementById("tBodyOut");
    const tdErroTotal = document.getElementById("tdErroTotal");
    const tdCiclos = document.getElementById("tdCiclos");
   
    let screenInput = new ScreenInput(fInputs,fTargets,qtLayer,qtPerceptron);
    let screenOutput = new ScreenOutput(tBodyOut,tdErroTotal,tdCiclos);

    let input = screenInput.getInputs();
    let target = screenInput.getTargets();

    let qtLayers = screenInput.getQtHLayers();
    let qtPerceptrons = screenInput.getQtPerceptrons();

    let nn = new NeuralNetwork(input,qtLayers,qtPerceptrons,target, screenOutput);    

    nn.trainMLP();
}