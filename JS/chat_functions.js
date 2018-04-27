/* global users */
function ok_button()
{
        $('#main').toggleClass('blur');
        $('#loading').toggle('fast');
       
        
        ime = $('#ime').val(); 
        var color = colors[ Math.floor(Math.random() * (4 - 0 + 1)) + 0];
        chat_enabled = true;
        add_user(ime, color);
        
        $('#main').load('chat.html #chat_main', '', function ()
        {
                $('#emo_prozor').hide();
                $('#chat').empty();
                $('#chat').append('Logout');
                $('#new_message').focus();
                first_load();
                    
            ref_mess = setInterval(refreshMessages, 1000);
            ref_users = (refreshUsers, 1000 * 10);
            
            $(window).bind('beforeunload', function(){logout(ime);});
            
            $(document).on('click', '.message_image',function (e) 
            {                               
                 e.target.classList.toggle('enlarge');
            });
            $(document).on('selectstart', "#menu li", function (e)
            {
                return false;
            });
            $(document).on('click', function(e)
            {
               if(e.target != $('#emo_prozor')[0] && e.target != $('#select_emo')[0] && e.target != $('#new_message')[0])
               {
                   $('#emo_prozor').slideUp('fast');
               }
            });        
            
            $('#select_emo').on('click', function(){select_emo_window()});

            $('#zajeb').on('click', function ()
            {
                zajeb_dugme();
            });

            $('#send').on('click', function ()
            {
                var message = $('#new_message').val();
                var date = new Date();
                var timestamp = new Date().toIsoString().slice(0, 19).replace('T', ' ');
                if (message.trim().length > 0)
                    send_message(timestamp, ime, message);
            });

            $("#new_message").keyup(function (event) {
                if (event.keyCode === 13) {
                    $("#send").click();
                }
            });
        });
}

function send_message(timestamp, user, message)
{
    if (message.indexOf('/ime') == 0)
    {

        $('#new_message').val("");
        if(message.substring(0,5) === '/ime ')
        {
            promeni_ime(message.substring(5));
        }
        else{
            komanda(timestamp,user,message);
        }

    }
    if(message.indexOf('/boja') == 0)
    {
        $('#new_message').val("");
        change_color(ime,message.split(' ')[1]); 
    }
    else {
        $.ajax({
            //url: 'http://localhost/PhpProject1/PHP/chat.php',
            url: 'PHP/chat.php',
            data: {timestamp: timestamp, user: user, message: message},
            success: function (e)
            {
                $('#new_message').val("");
                session_messages++;
                 $('#left').removeClass('klasa_nudge');
                 $('#right').removeClass('klasa_nudge'); 

                if (session_messages == 1) //vrati na 15 kad zavrsis
                {
                    aktiviraj_zajeb(); 
                }
                else
                {
                    deaktiviraj_zajeb();
                }
            }
        });
    }
}

function get_random_message()
{
    $.ajax(
            {
                url: 'PHP/get_random_message.php',
                success: function (e)
                {
                    info[3] = e;
                    $('#info_3').empty();
                    $('#info_3').append(e);
                }
            });
}

function get_emoticons()
{
    $.ajax(
            {
                url: "PHP/get_emoticons.php",
                success: function (e)
                {
                    e = e.split('\n');
                    for(var i = 0; i < e.length - 1; i++)
                    {

                        $('#emo_prozor').append("<img class = emoticon src = emoji/img/187129-emoticons/png/" + e[i] + ">");
                    }
                    $('.emoticon').on('click', function (e)
                    {
                        insert_emoticon(e);
                    });
                } 
            });
}

function refreshMessages()
{
    var last_message_date = messages_data[messages_data.length - 2].full_date;   
    $.ajax({
        //url: 'http://localhost/PhpProject1/PHP/get_chat.php',
        url: 'PHP/get_chat.php',
        data: {last_message_date: last_message_date},
        success: function (e)
        {
            if (e === "1!")
            {
                
            } else{
                
                var last_message = messages_data[messages_data.length - 2].message;
                messages_data = [];
                messages_data = message_to_object(e);
                
                $('#chat-test').empty();
                for (var i = 0; i < messages_data.length - 1; i++)
                {
             
                    $('#chat-test').append("<div class='message_box'> <div class='date_name'><span class='name'>" + messages_data[i].name + ":" + "</span><span class='date'>" + messages_data[i].date + "</span></div><span class='m' style='color:" + messages_data[i].color + "'> " + return_link(messages_data[i].message,messages_data[i].name) + "</span></div>");
                }

                if (last_message !== messages_data[messages_data.length - 2].message)
                {
                    $('#chat-test').animate({scrollTop: $('#chat-test').prop('scrollHeight')}, 0);
                    new_message_sound.play();
                }
            }
            
        }
    });
}

function count_messages(user)
{
    var number_of_messages;
    for(var i = 0; i < messages_data.length; i++)
    {
        if(messages_data[i].name === ime)
        {
            number_of_messages ++;
        }
    }
    return number_of_messages();
}

function refreshUsers()
{
    $.ajax({
        //url: 'http://localhost/PhpProject1/PHP/get_users.php',
        url: 'PHP/get_users.php',
        success: function (e)
        {
            users_string = e.split('!!');
            for(var i = 0; i < users_string.length - 1; i++)
            {
                users[i] = {};
                users[i].name = users_string[i].split('@')[0];
                users[i].color = users_string[i].split('@')[1];
            }     
           
            $('#menu').empty();
            for (var i = 0; i < users_string.length - 1; i++)
            {
                $('#menu').append("<li class = 'ui-widget-content'>" + users[i].name + "</li>");
            }
        }
    });
}

function add_user(name, color)
{
    var d = new Date();
    var id = parseInt(d.getHours() + "" + ('0' + d.getMinutes()).slice(-2) + "" + d.getSeconds() + "" + d.getMilliseconds());

    $.ajax({
        //url: 'http://localhost/PhpProject1/PHP/add_user.php',
        url: 'PHP/add_user.php',
        data: {id: id, name: name, color: color},
        success: function(e)
        {
            //console.log(e);
        },
        error: function(e)
        {
           // console.log(e);
        }
    });
}

function promeni_ime(novo_ime)
{
    $.ajax({
        url: 'PHP/promeni_ime.php',
        data:{ime:ime, novo_ime:novo_ime},
        success: function(e)
        {
            ime = novo_ime;
        }
    });
}

function zajeb_dugme()
{
    
    if (zajeb_enabled === true)
    {
        console.log('osposob');
        zajeb_enabled = false;  
        $('#zajeb').removeClass('zajeb_enabled');
        
        var zaj = 'nudge'; // zajeb_funkcije[Math.floor(Math.random() * zajeb_funkcije.length)];
        if (zaj === 'rtl')
        {
            $('#main').addClass("flip");
            setTimeout(
                    function ()
                    {
                        $('#main').removeClass("flip");  
                    }
            , 10000);
        }
        if(zaj === 'hide_messages')
        {
            $('#main').addClass("hide_messages");
            setTimeout(
                    function ()
                    {
                        $('#main').removeClass("hide_messages");
                    }
            , 10000);
        }
        if (zaj === 'rotate_90')
        {
            $('body').addClass("rotate_90");
            setTimeout(
                    function ()
                    {
                        $('body').removeClass("rotate_90");
                    }
            , 10000);
        }
        if(zaj === 'nudge')
        {
            nudge(); 
        }
    }

}

function nudge()
{
    console.log('nudge');
    $('#left').addClass('klasa_nudge');
    $('#right').addClass('klasa_nudge');
    function dial() {
        function ring() {
             msn_nudge_sound.play();
        }
        ring();
        setTimeout(ring, 1500);
    }
    dial();
   
}
function aktiviraj_zajeb()
{
    zajeb_enabled = true;
    $('#zajeb').toggleClass('zajeb_enabled');
    session_messages = 0;
}
function deaktiviraj_zajeb()
{
    zajeb_enabled = false;
    $('#zajeb').removeClass('zajeb_enabled');
}

function logout(ime)
{
    $('#chat').empty();
    $('#chat').append("Chat");
    clearInterval(ref_mess);
    clearInterval(ref_users);
    $.ajax({
        url: 'PHP/remove_user.php',
        data: {ime: ime}
    });
    $('#main').load('#index.php #main');
}

Date.prototype.toIsoString = function () {
    var tzo = -this.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
    return this.getFullYear() +
            '-' + pad(this.getMonth() + 1) +
            '-' + pad(this.getDate()) +
            'T' + pad(this.getHours()) +
            ':' + pad(this.getMinutes()) +
            ':' + pad(this.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
};

String.prototype.lines = function () {
    return this.split(/\r*\n/);
};
String.prototype.lineCount = function () {
    return this.lines().length;
};

function first_load()
{
    $.ajax({
        //url: 'http://localhost/PhpProject1/PHP/get_users.php',
        url: 'PHP/get_users.php',
        success: function (e)
        {


            users_string = e.split('!!');
            for (var i = 0; i < users_string.length - 1; i++)
            {
                users[i] = {};
                users[i].name = users_string[i].split('@')[0];
                users[i].color = users_string[i].split('@')[1];
            }

            $('#menu').empty();
            for (var i = 0; i < users_string.length - 1; i++)
            {
                $('#menu').append("<li class = 'ui-widget-content'>" + users[i].name + "</li>");
            }
         
            $.ajax(
                    {
                        url: 'PHP/first_load.php',
                        success: function (e)
                        {
                            messages_data = message_to_object(e);
                            for (var i = 0; i < messages_data.length - 1; i++)
                            {
                                $('#chat-test').append("<div class='message_box'> <div class='date_name'><span class='name'>" + messages_data[i].name + ":" + "</span><span class='date'>" + messages_data[i].date + "</span></div><div class='m'>" + return_link(messages_data[i].message, messages_data[i].name) + "</div></div>"); //returan span if not working
                            }
                            $('#chat-test').animate({scrollTop: $('#chat-test').prop('scrollHeight')}, 0);

                            get_emoticons();
                            $('#main').toggleClass('blur');
                            $('#loading').toggle('fast');
                        }
                    });
        }
    });

}
function message_to_object(messages){
    var data = [];
    var object = [];
    data = messages.split('\n');

    for(var i = 0; i < data.length; i++)
    {
        object[i] = {};
        object[i].date = data[i].substring(0, data[i].indexOf('$')).split(' ')[1];
        object[i].name = data[i].substring(data[i].indexOf('$') + 1 , data[i].indexOf('<'));
        object[i].message = data[i].substring(data[i].indexOf('<') + 1);
        object[i].full_date = data[i].substring(0, data[i].indexOf('$'));
        object[i].color = 'black';
        for(var j = 0; j < users.length; j++)
        {   
            if(users[j].name == object[i].name)
                object[i].color = users[j].color;
        }
        
    }

    return object;    
}

function komanda(timestamp,user,message)
{
    
}

//funkcija koja prepoznaje link i vraca odgovarajucu poruku. I NE SAMO TO, VEC STAMPA I CELU PORUKU
//Zapravo formatira poruku u zavisnosti sta poruka sadrzi. Prilicno haoticna funkcija ako mene pitate,
//ne znam zasto je ne sredm fino. Mrzi me, toliko toga me mrzi da odradim

function return_link(message, name)
{
    var reply ="";
    
    if(message.indexOf("/me") == 0)
    {
        reply = "<span style='color:purple; font-style:italic;'>" + name +" "+ message.substring(4) + "</span>";
    }
    else if(message.indexOf('.jpg') != -1 || message.indexOf('.jpeg') != -1 || message.indexOf('.gif') != -1 || message.indexOf('.png') != -1  )
    {
        reply = "<img class=message_image src=" + message + ">";
        
    }
    else if(message.indexOf('www.youtube.com') != -1)
    {
        var code = message.substring(message.lastIndexOf('=') + 1);
        reply = "<iframe class='player' src= https://www.youtube.com/embed/" + code + " frameborder=0 allowfullscreen></iframe>"
    }
    else if(message.indexOf("http") !== -1 && message.indexOf('<img') == -1)
    {
        var link_pocetak = message.indexOf('http');
        var link_kraj = link_pocetak + message.substring(link_pocetak).indexOf(" ");
        if(link_kraj === -1)
            link_kraj = message.length;
        var podela = message.split('http');
        var link = message.substring(link_pocetak, link_kraj);
        reply = message.substring(0, link_pocetak) + "<a href = " + link + " target=_blank> " + link + "</a>" + message.substring(link_kraj);
    }
    else{
        reply =  message;
    }
    
    var i = 0;
    while(i < reply.length)
    {

        var podniz = reply.substring(i);
        var lokacija = podniz.indexOf('/:');
        var pomocni = podniz.substring(lokacija + 2);
        var duzina = pomocni.length;
        var lokacija_u_glavnom = i + lokacija;
        
        if(lokacija !== -1)
        {           
           var code = podniz.substring(lokacija,lokacija + pomocni.indexOf(':') + 3); 
           var insert = "<img class=smile src=emoji/img/187129-emoticons/png/" + codeToEmo(code) + ">";
           reply = [reply.slice(0, lokacija_u_glavnom), insert, reply.slice(lokacija_u_glavnom + code.length)].join('');

           reply.replace(code,"");

           i = i + insert.length + lokacija_u_glavnom;
        }
        else
            break;
    }
   
    return reply;
}

function change_color(user,color)
{
    $.ajax({
        url: 'PHP/change_color.php',
        data:{color:color, user:user},
        success: function(e)
        {
            console.log(e);
        }
    });
}



function select_emo_window()
{
    $('#emo_prozor').slideToggle('fast');        
}
function insert_emoticon(emoticon)
{
        var emo = emoticon.target.src.substring(emoticon.target.src.lastIndexOf('/') + 1);
        var code = emoToCode(emo);
        var pos = $("input[id='new_message'").getCursorPosition();
        var text = $('#new_message').val();
        
        $('#new_message').val([text.slice(0, pos), code, text.slice(pos)].join(''));  
        $('#new_message').focus();
}

function validacija_podataka(username,lozinka)
{
    var odgovor;
  
    if(username.length === 0)
        return "Unesite nadimak";
    if(username.indexOf('@') !== -1)
        return "Nedozvoljen karakter";
    
    $.ajax({
        url: 'PHP/validacija_podataka.php',
        data:{username:username, lozinka:lozinka},
        success: function(e)
        {
            console.log(e);
            $('#greska').text(e);
                if(e != 'postoji gost' && e != 'postoji korisnik' && e != 'neuspeo login')
                {
                    ok_button();
                }
        },
        error: function(error)
        {
            $('#greska').text(error);
        }    
    });
}