var colors = ['black'];
var ime;
var vreme;
var info = ["Welcome to the jungle - Dule", "Pravi programer uvek nadje server - Gavrilo"];
var new_message_sound;
var messages_data;
var zajeb_enabled;
var zajeb_funkcije = ['nudge'];
var session_messages;
var users = [];
var chat_enabled;
var toggle_emo;
var msn_nudge_sound;


$(document).ready(function ()
{
    $('#podesavanja_prozor').hide();
    

    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function (event) {
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');

    });
    $('#loading').toggle('fast');
    
    toggle_emo = false;
    chat_enabled = false;
    session_messages = 0;
    zajeb_enabled = false;
    messages_data = ["*", "*", "*"];
    messages_data[1] = {};
    messages_data[1].full_date = "";
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function (event) {
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });
    new_message_sound = document.getElementById("new_message_sound");
    msn_nudge_sound = document.getElementById("msn_nudge_sound");
    
    new_message_sound.volume = 0.2;
    $('#info_0').append(info[0]);
    $('#info_1').append(info[1]);

    setInterval(get_random_message(), 1000 * 15);

    get_weather();

    $("#info > p:gt(0)").hide();
    setInterval(function () {
        $('#info > p:first')
                .fadeOut(500)
                .next()
                .fadeIn(500)
                .end()
                .appendTo('#info');
    }, 7000);

    $('#chat').on('click', function ()
    {
        if (chat_enabled === false)
        {
            $('#main').load('chat.html #dialog-message', '', function ()
            {
                $('#ime').focus();
                $('#login_button').on('click', function ()
                {
                    var username = $('#ime').val();
                    var lozinka = $('#lozinka').val();
                    validacija_podataka(username, lozinka);
                });
                $('#dialog-message').keyup(function (e) {
                    if (e.keyCode === 13) {
                        $('#login_button').trigger('click');
                        return false;
                    }
                });
            });
        } else {
            document.getElementById("radio_stream").pause();
            chat_enabled = false;
            logout(ime);
        }
    });

    $('#pekarica').on('click', function ()
    {
        $('#main').load('pekarica.html #items', '', function ()
        {
            $('#prihvati').on('click', function ()
            {
                var vecera = [];
                if ($('#pica_burek').attr('checked'))
                {
                    console.log('pica burek');
                }
                //   porudzbina(); 
            });
        });
    });

    $('#biblioteka').on('click', function ()
    {
        $('#main').load('biblioteka.html', '', function ()
        {
            $('#add_new_book').on('click', function ()
            {
                var title;
                var author;
                var type;
                var status;

                title = $('#title').val();
                author = $('#author').val();
                type = $('#type').val();
                status = $('#status').val();
                // add_new_book_websql(db,title,author,type,status);
                add_new_book_database(title, author, type, status);
            });

            $('#edit_book').on('click', function ()
            {
                get_books();
            });
        });
    });
    $('#home').on('click', function ()
    {
        $('#main').load("index.php #main");
    });

    $('#play_radio').on('click', function ()
    {

        if ($('#play_radio').attr('src') === "slike/play1.png")
        {
            $('#play_radio').attr('src', 'slike/stop1.png');
            document.getElementById("radio_stream").pause();

        } else
        {
            $('#play_radio').attr('src', 'slike/play1.png');
            document.getElementById("radio_stream").play();
        }
    });
    $('#podesavanja_dugme').on('click', function()
    {
       $('#podesavanja_prozor').slideToggle('slow');
    });
    $('#siva_tema').on('click', function()
    {
        
        $('link[href="CSS/main.css"]').attr('href','CSS/gray_theme.css');
    });
     $('#narandzasta_tema').on('click', function()
    {
        $('link[href="CSS/gray_theme.css"]').attr('href','CSS/main.css');
    });
});