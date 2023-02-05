(function(win, doc){
    'use strict';

    var butaoNumero = doc.querySelectorAll(".numero");
    var visor = doc.querySelector(".visor");
    var butaoOperacao = doc.querySelectorAll(".operacao");
    var butaoIgual = doc.querySelector(".igual")
    var butaoCe = doc.querySelector(".ce")
    var operacao = ["+", "-", "*", "/"] 

    function inicio() {
    Array.prototype.forEach.call(butaoNumero, function(button){
        button.addEventListener("click", concatenaCaracteresNoVisor) 
    })
    Array.prototype.forEach.call(butaoOperacao, function(button){
        button.addEventListener("click", concatenaCaracteresNoVisor)
    })
    butaoCe.addEventListener("click", zeraVisor)
    butaoIgual.addEventListener("click", resultado)
    }

    function concatenaCaracteresNoVisor(){
        visor.value = `${visor.value}${this.value}`
        operacaoSobrepoemOperacaoAnterior(visor.value, operacao)
        retornaResultadoSePossuirMaisDeUmaOperacao() 
    }

    function zeraVisor() {
        visor.value = "0"
    }

    function retornaSeUltimoCaractereEOperacao (string, operacao) {
        var operacaoAtual = string.split('')[string.length - 1]
        if (operacao.indexOf(operacaoAtual) > -1)
        return operacaoAtual
        return "não é operação"
    }

    function retornaSePenultimoCaractereEOperacao (string, operacao) {
        var operacaoAtual = string.split('')[string.length - 2]
        if (operacao.indexOf(operacaoAtual) > -1)
        return operacaoAtual
        return "não é operação"
    }

    function operacaoSobrepoemOperacaoAnterior(string, operacao) {
        var ultimaOperacao = retornaSeUltimoCaractereEOperacao(string, operacao)
        var penutimaOperacao = retornaSePenultimoCaractereEOperacao(string, operacao)

        if (ultimaOperacao.length === 1 && penutimaOperacao.length === 1)
        visor.value = `${visor.value.slice(0, (visor.value.length - 2))}${retornaSeUltimoCaractereEOperacao(string, operacao)}` 
    };
        
    function resultado (string, operacao) {
        var operacao = ["+", "-", "*", "/"]
        var valoresASeremCalculadoNaArray = visor.value.match(/\d+\+?\-?\*?\/?/g)
        valoresASeremCalculadoNaArray.reduce(function (acumulador, valorAtual) {      
        
            var acumuladorAtual = retornaSomenteNumero(acumulador, operacao);

            if (retornaSeUltimoCaractereEOperacao(valorAtual, operacao) === "não é operação") {
            var valor = valorAtual
            } else {
                var valor = retornaSomenteNumero(valorAtual, operacao)
                }

            var operacaoAtual = retornaSeUltimoCaractereEOperacao(acumulador, operacao);
            var acumuladorAtualNumero = +acumuladorAtual
            var valorNumero = +valor
            var resultado

            switch (operacaoAtual) {
                case "+" :
                    resultado = acumuladorAtualNumero + valorNumero;
                    return visor.value = resultado.toString();
                case "-" :
                    resultado =acumuladorAtualNumero - valorNumero;
                    return visor.value = resultado.toString();
                case "*" :
                    resultado = acumuladorAtualNumero * valorNumero;
                    return visor.value = resultado.toString();
                case "/" :
                    resultado = acumuladorAtualNumero / valorNumero;
                    return visor.value = resultado.toString();
            }      
        })
    }

    function atributosBotõesOperacao () {
        retornaResultadoSePossuirMaisDeUmaOperacao()
        concatenaCaracteresNoVisor()
    }

    function retornaResultadoSePossuirMaisDeUmaOperacao () {
        if (verificaSeTemDuasOperacao()) {
            resultado(visor.value, operacao)
        }
    }

    function verificaSeTemDuasOperacao() {
        var operacao = ["+", "-", "*", "/"]
        var visor1 = visor.value.split('')
        var map = visor1.filter(function (item, index, array){
            if(operacao.indexOf(item) > -1)
            return item
        })
    
        if(map.length > 1)
            return true    
    }

    function retornaSomenteNumero (string, operacao) {
        var valorMaisOperacao = string.split('')
        var somenteNumeroArray =  valorMaisOperacao.slice(0, valorMaisOperacao.length-1);
        var verificaOperacao = valorMaisOperacao[string.length - 1]
        if(operacao.indexOf(verificaOperacao) > -1) 
        return  somenteNumeroArray.join('')
    }


    inicio()

})(window, document);