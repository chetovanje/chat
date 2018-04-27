<html>
    <head>
        <title>Četaonica</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Catamaran" rel="stylesheet">
        <link rel="stylesheet" href="JS/jquery-ui-1.12.1/jquery-ui-1.12.1/jquery-ui.css">

        <script src="JS/jquery.js" type="text/javascript"></script>
        <script src="JS/jquery-ui-1.12.1/jquery-ui-1.12.1/jquery-ui.js"></script>
        <script src="JS/jquery.canvasjs.min.js" type="text/javascript"></script>
        <script src="JS/functions.js" type="text/javascript"></script>
        <script src="JS/chat_functions.js" type="text/javascript"></script>
        <script src="JS/socket.io.js"> </script>
        <script src="JS/main.js"></script>
        <script src="JS/music.js"></script>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="CSS/main.css">

        <script type="text/javascript" src= 'JS/martina.js'> </script>
        <script src="JS/test.js" type="text/javascript"></script>

    </head>
    <body>
        <div id='navbar'>
      <header role="banner" class="navbar navbar-fixed-top navbar-inverse" id="nav" >
      <div class="container" id="navv">
        <div class="navbar-header">
          <button data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container" type="button" class="navbar-toggle pull-left"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
        </div>
        <div class="navbar-inverse side-collapse in" id="izbacen">
          <nav role="navigation" class="navbar-collapse" id="sta" >
            <ul class="nav navbar-nav" id="lista">
              <li  class='play'><a href='#home' id="home" class='link'>Home</a></li>
              <li  class="play"><a href='#biblioteka' id='biblioteka' class='link' > Biblioteka </a></li>
              <li  class='play'><a href='Martina.html' id='martina' class='link' > Martina </a></li>
              <li  class='play'><a href='#chat' id='chat' class='link'> Chat </a></li>
              <li  class='play'><a href='#pekarica' id="pekarica" class='link'> Pekarica </a></li>
            </ul>
          </nav>
        </div>
      </div>
            <audio id="new_message_sound">
                <source src="sounds/msn_new_message.mp3"></source>
            </audio>
             <audio id="msn_nudge_sound">
                <source src="sounds/msn_nudge_sound.mp3"></source>
            </audio>
            <audio id='radio_stream' volume='0.2'>
                <source src = 'http://naxi64.streaming.rs:9160/;stream.nsv' type="audio/mpeg">
            </audio>
            <br>
            <div id="info_radio">
              <div id="info">
                <p id="info_0"></p>
                <p id="info_1"></p>
                <p id="info_2"></p>
                <p id="info_3"></p>
              </div>
                <div id="podesavanja"> 
                    <button id="podesavanja_dugme"> Settings </button>
                    <div id="podesavanja_prozor" hidden> 
                        <fieldset>
                            <legend> Tema: </legend>
                            <label for="siva_tema">Siva tema </label>
                            <input type="radio" id="siva_tema" name="tema">
                            <br>
                            <label for="narandzasta_tema">Narandzasta tema </label>
                            <input type="radio" id="narandzasta_tema" name="tema">
                        </fieldset>
                            <input type="file" id="load_css">
    
                    </div>
                </div>
              <div id='radio_control'>
                <img src="slike/play1.png" id='play_radio'>
              </div>
            </div>
    </header>
        </div>
        <div id='main'>
            <audio id="new_message_sound">
                <source src="sounds/msn_new_message.mp3"></source>
            </audio>
            <div id='chat-test1'>
                <div class='message_box'> <div class='date_name'><span class='name'> Gavrilo: </span><span class='date'>21:23:10</span></div><span class='m' style='color:blue'> Zdravo. Ovo je rukom pisana poruka za testiranje izgleda chata. Sada ima vise mesta sa desne strane za neke stvari. Naravano, ovaj chat se moze gurnuti udesno a da levo ostane #left </span></div>
                <div class='message_box'> <div class='date_name'><span class='name'> Gavrsdadsailo: </span><span class='date'>21:23:10</span></div><span class='m'> Zdravo. Smajliji su postavljeni, treba samo da se iskodiraju sifre za njihovo ispisivanje a ja cu staviti nekad da mogu i klikom da se insertuju </span></div>
                <div class='message_box'> <div class='date_name'><span class='name'> Gavrilo: </span><span class='date'>21:23:10</span></div><span class='m'> Zdravo </span></div>
                <div class='message_box'> <div class='date_name'><span class='name'> Gavrdsadilo: </span><span class='date'>04:23:10</span></div><span class='m'> Ponovo Zdravo. Sta mislis o ovom metodu za prikazivanje teksta? Mali problem je sto ce manje linija da stane, ali je autenticnije. Naravno, boje se moraju promeniti, a sada je moguce da radim sa tekstom sta god hocu (u smislu bilo kakvog stilizovanja). Mislim da bi trebalo recimo staviti datum da stoji gore desno i da bude malo bledji, a levo asmo ime, i ispod tekst. Posto sada svaka poruka ima pozadinu, moze da se menja u zavisnosti kakvog je tipa poruka, npr /me itd.</span></div>
                <div class='message_box'> <div class='date_name'><span class='name'> Gavrilo: </span><span class='date'>21:23:10</span></div><span class='m'> Zdravo </span></div>
            </div>
        </div>
        <div id='loading'> <img src='slike/loading.gif'> </div>
    </body>
</html>
