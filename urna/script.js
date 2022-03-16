let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votobranco = false;
let votos = [];

function comecarEtapa() {
     let etapa = etapas[etapaAtual];

     let numeroHtml = '';
     numero = '';
     votobranco = false;

     for(let i=0; i< etapa.numeros;i++) {
         if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
         } else {
            numeroHtml += '<div class="numero"></div>';
        }
     }

     seuVotoPara.style.display = 'none';
     cargo.innerHTML = etapa.titulos;
     descricao.innerHTML = '';
     aviso.style.display = 'none';
     lateral.innerHTML = '',
     numeros.innerHTML = numeroHtml;

}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    })
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" width="90" height="90" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" width="90" height="90" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

    
}

function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca'); // procura um numero que 'pisca'
    if(elnumero !== null) {
        elnumero.innerHTML = n; // ele preenche o numero
        numero = `${numero}${n}`;

        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !== null) {
            elnumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
// no geral o de cima um numero que 'pisca' enquanto o baixo o preenhe com um numero
}
function branco() {
        numero = '';
        votobranco = true;

        votobranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false

    if(votobranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulos,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulos,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
             comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();