function calcularMedia( notas ){
    let soma = 0;
    for (let c = 0; c < notas.length; c++){
        soma += notas[c];
    }

    let media = soma / notas.length;

    return media; 
    /*Não pode adicionar o texto "Média: " no return,
    pois ele será acrescentado na operação da função
    aprovacao.*/
}

let media; // escopo global

function aprovacao(notas){
    let media = calcularMedia(notas); // escopo da função
    let condicao = media >= 6 ? "aprovado" : "recuperação";

    return 'Média: ' + media + ' - Resultado: ' + condicao;
}

/* 
Cria um formulário de envio de dados para o calculo da média.
*/

// Função Recursivas

function ContagemRegressiva(numero){
    console.log(numero);

    let proximoNumero = numero - 1;

    if(proximoNumero > 0){
        ContagemRegressiva(proximoNumero);
    }
}

/* 

contagemRegressiva(50);

Formulário envio de dados para cálculo da média.

*/

const formulario1 = document.getElementById('formulario-01');

if (formulario1) {
    formulario1.addEventListener('submit', function(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (this.getAttribute('class').match(/erro/)) {
            return false;
        }

        let dados = new FormData(this);

        let notas = [];

        for (let key of dados.keys()) {
            let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; //transforma em numero
            
            if (!isNaN(numero)) {
                notas.push(numero);
            }
        }

        console.log(notas);

        let texto = aprovacao(notas);

        document.getElementById('resultado').innerHTML = texto;
    });
}

function validacampo(elemento){

    elemento.addEventListener('focusout', function(event) {
        
        event.preventDefault();

        if(this.value == ""){
            document.querySelector('.mensagem').innerHTML = 'verifique o preenchimento dos campos em vermelho.';
            this.classList.add('erro');
            this.parentNode.classList.remove('erro');
            return false;
        } else{
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.add('erro');
        }
    });
}

function validaCampoNumerico(elemento){

    elemento.addEventListener('focusout', function(event) {
        
        event.preventDefault();

        let numero = this.value.match(/^[\d]5-[\d]3/) ? this.value.replace(/-/, "") : this.value;

        if(numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10){
            document.querySelector('.mensagem').innerHTML= "";
            this.classList.remove('.erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }

    });
}

function validaEmail(elemento){
    elemento.addEventListener('focusout', function(event) {
        
        event.preventDefault();

        const emailvalido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        if (this.value.match(emailvalido)) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');  
            return false;
        }
    });
}

let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
let camposNumericos = document.querySelectorAll('input.numero');
let camposEmail = document.querySelectorAll('input.email')

for(let emFoco of camposObrigatorios) {
    validacampo(emFoco);
}

for(let emFoco of camposNumericos) {
    validaCampoNumerico(emFoco);
}

for(let emFoco of camposEmail){
    validaEmail(emFoco);
}