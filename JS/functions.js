function get_weather()
{
    $.ajax({
        url: 'http://api.wunderground.com/api/40d33b8bbb810b5b/forecast10day/q/serbia/belgrade.json',
        success: function (e)
        {
            vreme = get_data_weather(e);
            info.push('max: ' + vreme[0].high + ", min: " + vreme[0].low); 
            $('#info_2').append('Max: ' + vreme[0].high + "C , Min: " + vreme[0].low + "C");       
        },
        error: function (e)
        {
            console.log('ajax error');
        }
    });
}

function get_data_weather(e)
{
    var data = [];
    var j = 0;

    for (var i = 0; i < 10; i++)
    {
        data[i] = {};
        data[i].day = new Date(e.forecast.simpleforecast.forecastday[i].date.year, e.forecast.simpleforecast.forecastday[i].date.month - 1, e.forecast.simpleforecast.forecastday[i].date.day);
        data[i].high = e.forecast.simpleforecast.forecastday[i].high.celsius;
        data[i].low = e.forecast.simpleforecast.forecastday[i].low.celsius;
        data[i].condition = e.forecast.simpleforecast.forecastday[i].conditions;
        data[i].txt_day = e.forecast.txt_forecast.forecastday[j].fcttext_metric;
        data[i].txt_night = e.forecast.txt_forecast.forecastday[j + 1].fcttext_metric;
        data[i].dateshort = data[i].day.toLocaleString().substring(0, 10).replace(",", '').concat(" " + e.forecast.simpleforecast.forecastday[i].date.weekday);
        j = j + 2;
    }

    return data;
}


function append_to_slideshow(info){
    
    $('#info').empty();
    for(var i = 0; i < info.length; i++)
    {
        $('#info').append("<p>" + info[i] + "</p>");
    }
}

function draw_table(data)
{
    $('#data_table').DataTable({
        data: data,
        columns: [
            {data: 'dateshort'},
            {data: 'high'},
            {data: 'low'},
            {data: 'condition'},
            {data: 'txt_day'}
        ],
        paging: false,
        searching: false,
//         scrollY: "400px",
        scrollCollapse: true,
        "info": false
    });
}

function draw_graph(data)
{
    var options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Temperatura"
        },
        axisX: {
            title: "Dan"
        },
        axisY: {
            title: "Min Temperatura",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            includeZero: false
        },
        axisY2: {
            title: "Max Temperatura",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
                type: "spline",
                name: "min temp",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                dataPoints: [
                    {x: data[0].day, y: parseInt(data[0].low)},
                    {x: data[1].day, y: parseInt(data[1].low)},
                    {x: data[2].day, y: parseInt(data[2].low)},
                    {x: data[3].day, y: parseInt(data[3].low)},
                    {x: data[4].day, y: parseInt(data[4].low)},
                    {x: data[5].day, y: parseInt(data[5].low)},
                    {x: data[6].day, y: parseInt(data[6].low)},
                    {x: data[7].day, y: parseInt(data[7].low)},
                    {x: data[8].day, y: parseInt(data[8].low)},
                    {x: data[9].day, y: parseInt(data[9].low)}
                ]
            },
            {
                type: "spline",
                name: "max Temp",
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM DD YYYY",
                dataPoints: [
                    {x: data[0].day, y: parseInt(data[0].high)},
                    {x: data[1].day, y: parseInt(data[1].high)},
                    {x: data[2].day, y: parseInt(data[2].high)},
                    {x: data[3].day, y: parseInt(data[3].high)},
                    {x: data[4].day, y: parseInt(data[4].high)},
                    {x: data[5].day, y: parseInt(data[5].high)},
                    {x: data[6].day, y: parseInt(data[6].high)},
                    {x: data[7].day, y: parseInt(data[7].high)},
                    {x: data[8].day, y: parseInt(data[8].high)},
                    {x: data[9].day, y: parseInt(data[9].high)}
                ]
            }]
    };
    $('#graph').CanvasJSChart(options);
}

function add_new_book_websql(db, title, author, type, status)
{
    db.transaction(function (tx)
    {
        tx.executeSql("SELECT * FROM BOOKS", [], function (tx, res)
        {
            var rows = res.rows;
            var d = new Date();
            var id = res.rows.length + 1;
            tx.executeSql("INSERT INTO BOOKS (id, title, author, status, date, type) VALUES(?,?,?,?,?,?)", [id, title, author, status, d, type]);
            $('#title').val = "";
            $('#author').val = '';
        });
    });
}

function add_new_book_database(title, author, type, status)
{
    $.ajax({
        // url: 'PHP/test.php',
        url: 'http://localhost/PhpProject1/php/books.php',
        method: 'GET',
        data: {title: title, author: author, type: type, status: status},
        success: function (e)
        {
            $('#error_log').append(e);
        },
        error: function (e)
        {
            console.log('Greska sa phpom. ' + e);
        }
    });
}

function get_books()
{
    $.ajax({
        url: 'PHP/get_books.php',
        method: 'GET',
        success: function (e)
        {
            var data = e.split('\n');
            for (var i = 0; i < data.length; i++)
            {
                var b = data[i];
                data[i] = {};
                b = b.split(',');
                data[i].title = b[0];
                data[i].author = b[1];
                data[i].type = b[2];
                data[i].status = b[3];
                data[i].date = b[4];
            }
            $('#book_table').DataTable({
                data: data,
                columns: [
                    {data: 'title'},
                    {data: 'author'},
                    {data: 'type'},
                    {data: 'status'},
                    {data: 'date'}
                ],
                paging: false,
                searching: false,
//         scrollY: "400px",
                scrollCollapse: true,
                "info": false
            });
        },
        error: function (e)
        {
            $('#error_log').val('Greska u php-u' + e);
        }
    });
}

//funkcija koja pretvara kod u ime fajla za sliku smajlija.
function codeToEmo(code)
{
    var response;
    
    if(code.indexOf('/:') != -1)
       response = code.replace('/','').replace(":","").replace(":","") + ".png"; 
    else{
        switch(code){
            case ":)":
                response = "happy.png";
                break;
            case ":(":
                response = "sad.png"; //treba ovako za svaki da se odradi. ovo sad.png je ime slike koja ce zameniti ovu gornju komandu
                break;
        }
    }  
    return response;
}


//ovde treba obrnuto uraditi. dato je ime slike, a to treba pretvoriti u kod. Ona je dosta slozenija ali ti ne treba za to sto ti hoces
function emoToCode(src)
{
    var response;
    response = "/:" + src.substring(0,src.length-4) + ":";
    
    return response;
}

jQuery.fn.getSelectionStart = function(){
	if(this.lengh == 0) return -1;
	input = this[0];

	var pos = input.value.length;

	if (input.createTextRange) {
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', input.value.length);
		if (r.text == '') 
		pos = input.value.length;
		pos = input.value.lastIndexOf(r.text);
	} else if(typeof(input.selectionStart)!="undefined")
	pos = input.selectionStart;

	return pos;
}

jQuery.fn.getCursorPosition = function(){
	if(this.lengh == 0) return -1;
	return $(this).getSelectionStart();
}


function insert_text_in_string(text, insert, position)
{
    var response = [text.slice(0, position), insert, text.slice(position)].join('');
    return response;
}

function ucitaj_disk()
{
    
}