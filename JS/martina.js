var code;
var player;

$(document).ready( function()
{
    
    var sideslider = $('[data-toggle=collapse-side]');
               var sel = sideslider.attr('data-target');
               var sel2 = sideslider.attr('data-target-2');
               sideslider.click(function(event){
                   $(sel).toggleClass('in');
                   $(sel2).toggleClass('out');
               });
               
    //Ovo je kod za navbar. selektujem celu stranicu (dokument, i hvatam sledeci dogadjaj:
    // KLIK, ako se se desi da  element na koji je kliknuto poseduje klasu .fa i klasu .fa-home, tada izvrsi funkciju:
    // TOGGLE skriva odnosno prikazuje element koji je u selektoru. Argument funkcije toggle je brzina toglovanja.
    $(window).resize(function () {

        if ($(window).width() > 960) {
            $('#holder').show('0', '');
        }
        if ($(window).width() <= 960) {
            $('#holder').hide('0', '');
        }
    });
    
    $(document).on('click', '.fa.fa-home', function()
    {
        $('#holder').toggle('fast');
    });
    
    $('#set_alarm_button').on('click', function()
    {
       code = $('#pesma').val().substring($('#pesma').val().lastIndexOf('=') + 1);
       console.log(code);
       var provera = setInterval(function (){
              var sada = new Date();
              var sat = sada.getHours();
              var minut = sada.getMinutes();
              if( sat == alarmHours && minut == alarmMinutes)
              {
                  $('#main').append("<iframe id='player' src= https://www.youtube.com/embed/" + code +"?autoplay=1" + " frameborder=0 height=0 widht=0 allowFullScreen></iframe>");
                  var element = document.getElementById('player');
                  element.webkitRequestFullScreen;
                  clearInterval(provera);
              }
        }, '1000');
    });


    //Zelimo da pocetak izvrsavanja bude na klik dugmeta.
    $('#start_load').on('click', function()
    {
       var max_sirina = $('#omotac').width(); //sirina do koje sme da se ide. Ucitavam je kad se klikne na dugme i ona predstavlja sirinu omotaca (tj. sirinu 100% celog dokumenta). To je fiksirana vrednost koja ostaje do kraja ista.
       //Sada postavljamo periodicnu funkciju koja ce se izvrsavati na 500ms. Tom celom procesu ponavljanja smo dali ime povecavnje_sirine da bismo kasnije mogli da zaustavimo taj proces.

       //Svaki put kad prodje 500ms mi zelimo da se desi sledece:
       //                     1) Uhvatimo koliko iznosi trenutna sirina load_trake.
       //                     2) podesimo novu vrednost load_trake tako sto uzmemo tu staru i povecamo je za 20 (ili koliko god)
       //                     3) Proverimo da li je trenutna duzina (stara_duzina) load_trake veca od maksimuma, tj. da li je stigla do kraja.
       //                     Ako nije, onda postavi novu sirinu, u suprtnom prekini ponavljanje funkcije.
       //
        povecanje_sirine = setInterval(function(){
            var stara_sirina  = $('#load_traka').width(); //ovo je sirina trake za load pre nego sto se poveca
            var nova_sirina = stara_sirina + 20;
            $('#procenti').text(nova_sirina);

             // njena nova sirina je stara plus 20 (piksela);
            if(stara_sirina < max_sirina) //ako je stara sirina manja od krajnje ivice, postavi sirinu povecanu za 20;
            {
                $('#load_traka').width(nova_sirina);

            }
            else{
                clearInterval(povecanje_sirine); // u suprotnom prekini ponavljanje funkcije koja se izvrsava svake sekunde. Primeti da ova linija kod nije neophodna, jer ukoliko bi sirina load trake premasila max-width onda se onaj IF deo ne bi izvrsavao pa bi se funkcija ponavljala "na prazno".
                                                //Ipak koristinom else da bismo zaustavili ponavljanje funkcije (zbog ustede performansi recimo)
            }
       } , '500');




    });

});
