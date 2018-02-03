const stulp = 10;
const eil = 18;

const kalades = [
    [0, 1, 2, 3],    /*ilgas*/
    [0, 10, 20, 30],
    [0, 1, 2, 3],
    [0, 10, 20, 30],
    [0, 1, 10, 11],   /*kvadratas*/
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 2, 12],    /* L */
    [0, 1, 10, 20],
    [0, 10, 11, 12],
    [1, 11, 20, 21],
    [0, 1, 2, 10],    /* j */
    [0, 10, 20, 21],
    [2, 10, 11, 12],
    [0, 1, 11, 21],
    [0, 1, 2, 11],    /* T */
    [0, 10, 11, 20],
    [1, 10, 11, 12],
    [1, 10, 11, 21],
    [0, 10, 11, 21],  /* s */
    [1, 2, 10, 11],
    [0, 10, 11, 21],
    [1, 2, 10, 11],
    [1, 10, 11, 20],   /* z */
    [0, 1, 11, 12],
    [1, 10, 11, 20],
    [0, 1, 11, 12],
];


let matrica = [];
for (let i = 0; i < eil; i++) {
    matrica[i] = [];
    for (let j = 0; j < stulp; j++) {
        matrica[i][j] = 0;
    }
}

function lentele() {
    let lentele = $("<table>")
    let eilute, langelis
    let indeksas = 0;
    for (let j = 0; j < eil; j++) {
        eilute = $("<tr>");
        for (let i = 0; i < stulp; i++) {
            langelis = $("<td>");
            langelis.attr("id", indeksas);
            if (matrica[j][i]) {
                langelis.attr("class", "guli");
            };
            eilute.append(langelis);
            indeksas++;
        }
        lentele.append(eilute);
    };
    lentele.appendTo(".laikiklis");
}

function gautiKalade() {

    let kalNr = Math.floor(Math.random()*7)*4;  /*atsitiktinai parenkama nauja kalade*/
    let naujaSpalva = Math.ceil(Math.random()*4);   /*atsitiktinai parenkama kalades spalva*/
    naujaSpalva = "sp" + naujaSpalva;
    let naujaKalade = [];
    let pt = 4;            /* pradinis taškas */

    for (var i = 0; i < 4; i++) {
        naujaKalade[i] = kalades[kalNr][i] + pt;
    };
    padetiKalade(naujaKalade, naujaSpalva);
}

function padetiKalade(kalade, spalva) {
    console.log("dedam kalade");
    for (let i = 0; i < kalade.length; i++) {
        let id = kalade[i];
        $("#"+id).addClass("juda");
        $("#"+id).addClass(spalva);
    }
}

function Rodykles() {

  this.aukstyn = 38;
  this.desinen = 39;
  this.kairen = 37;
  this.zemyn = 40;
  var paspaudimai = {};
  this.add = function(rodykle, ka_kvieciam) {
    paspaudimai[rodykle] = ka_kvieciam;
  };
  this.event = function(e) {
    if (paspaudimai[e.keyCode] === undefined) {
      return;
    }
    paspaudimai[e.keyCode]();
  };
}


function zaidimas() {
    $(".laikiklis").empty();
    lentele();
    gautiKalade();

    let rodykles = new Rodykles();
    document.onkeydown = rodykles.event;
    rodykles.add(rodykles.desinen, desinen);
    rodykles.add(rodykles.kairen, kairen);
    rodykles.add(rodykles.aukstyn, versti)

}

function desinen () {
    let judaX = [];
    let judaY = [];
    let prieKrasto = false;
    let sp;

    for (i = 0; i < 4; i++) {
        let j = $(".juda").attr("id");
        $("#"+j).removeClass("juda");
        let s = $("#"+j).attr("class");
        $("#"+j).removeClass("juda");
        $("#"+j).removeClass(s);
        j = parseInt(j);
        judaX.push(j);
        if (i == 0) {sp = s};
    }

    for (let i = 0; i < judaX.length; i++) {
        if (judaX[i] % stulp == stulp - 1) {
            prieKrasto = true;
            break;
        }
    }

    if (!prieKrasto) {
        for (let i = 0; i < judaX.length; i++) {
            judaY[i] = judaX[i]+1;
        }}
        else {
            judaY = judaX;
        };

    padetiKalade(judaY, sp);
}


function kairen () {
    let judaX = [];
    let judaY = [];
    let prieKrasto = false;
    let sp;

    for (i = 0; i < 4; i++) {
        let j = $(".juda").attr("id");
        $("#"+j).removeClass("juda");
        let s = $("#"+j).attr("class");
        $("#"+j).removeClass("juda");
        $("#"+j).removeClass(s);
        j = parseInt(j);
        judaX.push(j);
        if (i == 0) {sp = s};
    }

    for (let i = 0; i < judaX.length; i++) {
        if (judaX[i] % stulp == 0) {
            prieKrasto = true;
            break;
        }
    }

    if (!prieKrasto) {
        for (let i = 0; i < judaX.length; i++) {
            judaY[i] = judaX[i]-1;
        }}
        else {
            judaY = judaX;
        };

    padetiKalade(judaY, sp);
}

function versti () {

    console.log("verciam");
    let judaX = [];
    let judaY = [];
    let sp;
    let kaladesNr;
    let pos = 179;   /* paskutinis įmanomas */
    let prieKrasto = false;

    for (i = 0; i < 4; i++) {
        let j = $(".juda").attr("id");
        $("#"+j).removeClass("juda");
        let s = $("#"+j).attr("class");
        $("#"+j).removeClass("juda");
        $("#"+j).removeClass(s);
        j = parseInt(j);
        judaX.push(j);
        if (i == 0) {sp = s};
        if (j < pos) {pos = j};
        if ((j % 10) < (pos % 10)) {pos = pos - (pos % 10 - j % 10)};
    }


    console.log("sena pozicija" + pos);

    for (var i = 0; i < judaX.length; i++) {
        judaX[i] -= pos;
    }

    let a = stulp - 1 - pos;  /*atstumas nuo sieneles*/
    let b = Math.floor(judaX[3] / stulp) - Math.floor(judaX[0] / stulp); /*kalades aukstis*/

    if (a < b) {
        pos = pos - (b - a);
    }

    console.log("nauja pozicija" + pos);

    for (let i = 0; i < kalades.length; i++) {
        if (kalades[i][0] == judaX[0] && kalades[i][1] == judaX[1] && kalades[i][2] == judaX[2] && kalades[i][3] == judaX[3]) {
            kaladesNr = i;
            console.log("radom");
        }
    }

    if (kaladesNr % 4 == 3) {
        kaladesNr -= kaladesNr % 4;
    } else {
        kaladesNr++;
    }

    console.log("nauja kalade: " + kaladesNr);

    for (let i = 0; i < 4; i++) {
        judaY[i] = kalades[kaladesNr][i] + pos;
    }
    
    padetiKalade(judaY, sp);
}





$(document).ready(function(){
    $("#pradek").click(zaidimas);
});
