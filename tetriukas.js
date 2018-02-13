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


function lentele() {
    let lentele = $("<table>");
    lentele.attr("id", "lentele");
    let eilute, langelis;
    let indeksas = 0;
    for (let j = 0; j < eil; j++) {
        eilute = $("<tr>");
        for (let i = 0; i < stulp; i++) {
            langelis = $("<td>");
            langelis.attr("id", indeksas);
            eilute.append(langelis);
            indeksas++;
        }
        lentele.append(eilute);
    };
    lentele.appendTo("#laikiklis");

    let rodyklesPelei = $('<div class="rodyklesPelei"></div>');
    rodyklesPelei.width(stulp * 30);
    rodyklesPelei.height((eil) * 30);
    let rodV = $('<div class="rod rodV" onclick="versti()"></div>');
    rodV.append("<i class='fas fa-angle-double-up fa-3x'></i>");
    let rodK = $('<div class="rod rodK" onclick="kairen()"></div>');
    rodK.append("<i class='fas fa-angle-double-left fa-3x'></i>");
    let rodP = $('<div class="rod rodP" onclick="einaNeina()"></div>');
    rodP.attr("id", "pauzestart");
    rodP.append("<i class='fas fa-pause fa-2x'></i>");
    let rodD = $('<div class="rod rodD" onclick="desinen()"></div>');
    rodD.append("<i class='fas fa-angle-double-right fa-3x'></i>");
    let rodA = $('<div class="rod rodA" onclick="leistis()"></div>');
    rodA.append("<i class='fas fa-angle-double-down fa-3x'></i>");
    rodV.appendTo(rodyklesPelei);
    rodK.appendTo(rodyklesPelei);
    rodP.appendTo(rodyklesPelei);
    rodD.appendTo(rodyklesPelei);
    rodA.appendTo(rodyklesPelei);
    rodyklesPelei.appendTo("#laikiklis");

    let svieslente = $("<p id='rezultatas'>Taškai: 0</p>");
    svieslente.appendTo('#laikiklis');
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

        let prieDugno = false;
        for (let i = 0; i < 4; i++) {
            let nid = naujaKalade[i] + stulp;
            prieDugno = prieDugno || $("#"+nid).hasClass("guli");
        }
        padetiKalade(naujaKalade, naujaSpalva);

        if (prieDugno) {
            pabaiga();
        }
}

function padetiKalade(kalade, spalva) {
        for (let i = 0; i < kalade.length; i++) {
            let id = kalade[i];
            $("#"+id).addClass("juda");
            $("#"+id).addClass(spalva);
        }
        return;
}

//
// function Rodykles() {
//
//         this.aukstyn = 38;
//         this.desinen = 39;
//         this.kairen = 37;
//         this.zemyn = 40;
//         this.baigti = 27;
//         this.pauze = 32;
//         var paspaudimai = {};
//         this.add = function(rodykle, ka_kvieciam) {
//             paspaudimai[rodykle] = ka_kvieciam;
//         };
//         this.event = function(e) {
//             if (paspaudimai[e.keyCode] === undefined) {
//                 return;
//             }
//         paspaudimai[e.keyCode]();
//       };
// }

//
// function zaidimas() {
//     $(".laikiklis").empty();
//     lentele();
//     gautiKalade();
//
//     let rodykles = new Rodykles();
//     document.onkeydown = rodykles.event;
//     rodykles.add(rodykles.desinen, desinen(1));
//     rodykles.add(rodykles.kairen, kairen);
//     rodykles.add(rodykles.aukstyn, versti);
//     rodykles.add(rodykles.zemyn, leistis);  /*po paspaudimo leidziames po 4 eilutes zemyn*/
//     rodykles.add(rodykles.baigti, pabaiga);
//     rodykles.add(rodykles.pauze, einaNeina);
//
//     einaNeina();
// }


function zaidimas() {
    $(".laikiklis").empty();
    lentele();
    gautiKalade();

    $(document).keypress(function(e) {
        let keycode;
        if (e.keyCode) {keycode = e.keyCode} else {keycode = e.which};
        if (keycode == '37') {kairenDesinen(-1)}
        if (keycode == '38') {versti()}
        if (keycode == '39') {kairenDesinen(1)}
        if (keycode == '40') {leistis()}
        if (keycode == '27') {pabaiga()}
        if (keycode == '32') {einaNeina()}
    });

    einaNeina();
}


let spaudimas;

function einaNeina() {
    let stresas = 1200;
    let akimirkos = 0;
    let perioduSk = 20;

    if (!spaudimas) {
        spaudimas = setInterval(function(){
            if (akimirkos / perioduSk == 1) {          /*kas perioduSk periodų pagreitėja*/
                stresas = Math.round(stresas*0.7);
                akimirkos = 1;
                perioduSk = Math.round(perioduSk / 0.7);
            };
            if ($("#lentele").hasClass("baigta")) {
                clearInterval(spaudimas);
            } else {
                $('#pauzestart').empty();
                $('#pauzestart').append("<i class='fas fa-pause fa-2x'></i>");
                spausti();
                akimirkos++;
        }}, stresas);
    } else {
        clearInterval(spaudimas);
        $('#pauzestart').empty();
        $('#pauzestart').append("<i class='fas fa-play fa-2x'></i>");
        spaudimas = null;
    }
}

function kairenDesinen (x) {
    let judaX = [];
    let judaY = [];
    let prieKrasto = false;
    let sp;

    for (i = 0; i < 4; i++) {            /* nuimam klases judanciam objektui */
        let j = $(".juda").attr("id");
        $("#"+j).removeClass("juda");
        let s = $("#"+j).attr("class");
        $("#"+j).removeClass(s);
        j = parseInt(j);
        judaX.push(j);
        if (i == 0) {sp = s};
    }

    for (let i = 0; i < judaX.length; i++) {     /* tikrinam ar objektas yra prie krasto */
        if (((x == 1) && (judaX[i] % stulp == stulp - 1)) || ((x == -1) && (judaX[i] % stulp == 0))) {
            prieKrasto = true;
            break;
        }
    }

    if (!prieKrasto) {                                  /* jeigu ne prie krasto, juda kairen (-1) arba desinen (+1) */
        for (let i = 0; i < judaX.length; i++) {
            judaY[i] = judaX[i]+x;
        }}
        else {
            judaY = judaX;
        };
    padetiKalade(judaY, sp);
}
//
// function kairen () {
//     let judaX = [];
//     let judaY = [];
//     let prieKrasto = false;
//     let sp;
//
//     for (i = 0; i < 4; i++) {
//         let j = $(".juda").attr("id");
//         $("#"+j).removeClass("juda");
//         let s = $("#"+j).attr("class");
//         $("#"+j).removeClass(s);
//         j = parseInt(j);
//         judaX.push(j);
//         if (i == 0) {sp = s};
//     }
//
//     for (let i = 0; i < judaX.length; i++) {
//         if (judaX[i] % stulp == 0) {
//             prieKrasto = true;
//             break;
//         }
//     }
//
//     if (!prieKrasto) {
//         for (let i = 0; i < judaX.length; i++) {
//             judaY[i] = judaX[i]-1;
//         }}
//         else {
//             judaY = judaX;
//         };
//
//     padetiKalade(judaY, sp);
// }

function versti () {
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
        $("#"+j).removeClass(s);
        j = parseInt(j);
        judaX.push(j);
        if (i == 0) {sp = s};
        if (j < pos) {pos = j};
        if ((j % stulp) < (pos % stulp)) {pos = pos - (pos % stulp - j % stulp)};
    }
    for (var i = 0; i < judaX.length; i++) {
        judaX[i] -= pos;
    }
    let a = stulp - 1 - (pos % stulp);  /*atstumas nuo sieneles*/
    let b = Math.floor(judaX[3] / stulp) - Math.floor(judaX[0] / stulp); /*kalades aukstis*/
    if (a < b) {
        pos = pos - (b - a);
    }
    for (let i = 0; i < kalades.length; i++) {
        if (kalades[i][0] == judaX[0] && kalades[i][1] == judaX[1] && kalades[i][2] == judaX[2] && kalades[i][3] == judaX[3]) {
            kaladesNr = i;
        }
    }
    if (kaladesNr % 4 == 3) {
        kaladesNr -= kaladesNr % 4;
    } else {
        kaladesNr++;
    }
    for (let i = 0; i < 4; i++) {
        judaY[i] = kalades[kaladesNr][i] + pos;
    }
    padetiKalade(judaY, sp);
}

function leistis() {
        prieDugno = false;
        let sp;
        let z = 4;   /*po paspaudimo leidziames 4 eilutes zemyn*/

    do {
        let judaX = [];
        let judaY = [];
        prieDugno = false;

        for (i = 0; i < 4; i++) {
            let j = $(".juda").attr("id");
            $("#"+j).removeClass("juda");
            let s = $("#"+j).attr("class");
            $("#"+j).removeClass(s);
            j = parseInt(j);
            judaX.push(j);
            if (i == 0) {sp = s};
        }
        judaY = judaX;

        for (let i = 0; i < 4; i++) {
            if (Math.ceil(judaY[i]) / stulp >= eil - 1) {prieDugno = true;}
            let nid = judaY[i] + stulp;
            prieDugno = prieDugno || $("#"+nid).hasClass("guli");
        }

        if (!prieDugno) {
            for (let i = 0; i < judaY.length; i++) {
                judaY[i] = judaY[i]+stulp;
            };
            padetiKalade(judaY, sp);
        } else {
                paguldyti(judaY, sp);
            };
        z--;
    }
    while (!prieDugno && z > 0);
}

function spausti() {
        prieDugno = false;
        let sp;
        let judaX = [];
        let judaY = [];
        prieDugno = false;

        for (i = 0; i < 4; i++) {
            let j = $(".juda").attr("id");
            $("#"+j).removeClass("juda");
            let s = $("#"+j).attr("class");
            $("#"+j).removeClass(s);
            j = parseInt(j);
            judaX.push(j);
            if (i == 0) {sp = s};
        }
        judaY = judaX;

        for (let i = 0; i < 4; i++) {
            if (Math.ceil(judaY[i]) / stulp >= eil - 1) {prieDugno = true;}
            let nid = judaY[i] + stulp;
            prieDugno = prieDugno || $("#"+nid).hasClass("guli");
        }

        if (!prieDugno) {
            for (let i = 0; i < judaY.length; i++) {
                judaY[i] = judaY[i]+stulp;
            };
            padetiKalade(judaY, sp);
        } else {
            paguldyti(judaY, sp);
        };
}

let rezultatas = 0;


function paguldyti (kalade, spalva) {
    for (let i = 0; i < 4; i++) {
        $("#"+kalade[i]).removeClass();
        $("#"+kalade[i]).addClass("guli");
        $("#"+kalade[i]).addClass(spalva);
    }
    let premija = 0;
    let zemiausiaEilute = Math.floor(kalade[3] / stulp);
    let auksciausiaEilute = Math.floor(kalade[0] / stulp);
    for (let e = auksciausiaEilute; e <= zemiausiaEilute; e++) {

        let pilnaEilute = true;
        for (let i = 0; i < stulp; i++) {
            let eid = e * stulp + i;
            pilnaEilute = pilnaEilute && $("#"+eid).hasClass("guli");
        }
        if (pilnaEilute) {
            premija += 10;
            for (i = 0; i < stulp; i++) {     /* istrinam eilute */
                eid = e * stulp + i;
                $("#"+eid).removeClass("guli");
                sp = $("#"+eid).attr("class");
                $("#"+eid).removeClass(sp);
            }
            rezultatas += premija;
            $('#rezultatas').empty();
            $('#rezultatas').text("Taškai: " + rezultatas);
            let o = [];                      /* sukuriam visu aukstesniu pilnu langeliu masyva, juos isvalom*/
            let k = 0;
            for (let langnum = e * stulp - 1; langnum > 1; langnum--) {
                if ($("#"+langnum).hasClass("guli")) {
                    $("#"+langnum).removeClass("guli");
                    s = $("#"+langnum).attr("class");
                    $("#"+langnum).removeClass(s);
                    o[k] = {id:langnum, sp:s};
                    k++;
                }
            }
                            // visus aukstesnius pilnus langelius pastumiam zemyn
            for (let i = 0, j = o.length; i < j; i++) {
                let naujasid = o[i].id + stulp;
                let s = o[i].sp;
                $("#"+naujasid).addClass("guli");
                $("#"+naujasid).addClass(s);
            }
        }
    };

    gautiKalade();
}

function pabaiga() {
    $("#lentele").addClass("baigta");
    let pabaigosLentele = $("<div>");
    pabaigosLentele.addClass("pabaiga");
    pabaigosLentele.append("<h3>Pabaiga</h3>");
    pabaigosLentele.append("<p>Rezultatas: " + rezultatas + "</p>");
    pabaigosLentele.append("<a onclick='zaidimas()'>pakartot!</a>");
    pabaigosLentele.appendTo(".laikiklis");
    $("td").removeClass("juda");
    $("td").removeClass("guli");
    document.onkeydown = null;
}


$(document).ready(function(){

    let fonas = $("<table>");
    fonas.attr("id", "fonas");
    let fonoEilute, fonoLangelis;
    for (let j = 0; j < eil; j++) {
        fonoEilute = $("<tr>");
        for (let i = 0; i < stulp; i++) {
            fonoLangelis = $("<td>");
            let spalvosNr = Math.floor(Math.random()*5);
            let klase = "sp" + spalvosNr;
            fonoLangelis.addClass(klase);
            fonoEilute.append(fonoLangelis);
        }
        fonas.append(fonoEilute);
    };
    fonas.appendTo(".laikiklis");
    let pradziosLentele = $("<div>");
    pradziosLentele.attr("id", "pradinis");
    pradziosLentele.append("<h3>mini</h3>");
    pradziosLentele.append("<h1>TETRIS</h1>");
    pradziosLentele.append("<h2 id='pradek'>spausk!</h2>");
    pradziosLentele.append("<h4 id='kaipzaisti'>Kaip žaisti?</h4>");
    pradziosLentele.appendTo(fonas);
    $("#pradek").click(zaidimas);

    $("#kaipzaisti").click(function(){
        pradziosLentele.empty();
        pradziosLentele.append("<p>rodyklė aukštyn - versti;</p>");
        pradziosLentele.append("<p>rodyklė į kairę - kairėn;</p>");
        pradziosLentele.append("<p>rodyklė į dešinę - dešinėn;</p>");
        pradziosLentele.append("<p>rodyklė žemyn - leistis;</p>");
        pradziosLentele.append("<p>Esc - baigti;</p>");
        pradziosLentele.append("<p>Tarpas - pauzė;</p>");
        pradziosLentele.append("<h2 id='pradek2'>spausk!</h2>");
        $("#pradek2").click(zaidimas);
    })


});
