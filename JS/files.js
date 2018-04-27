


$(document).ready(function()
{
    var myfiles = document.getElementById('myfiles');
    $('#error_log').text("Ready for action");
    
    $('#myfiles').on('change', function(e)
    {
        $('#error_log').text("File loaded");
        var files = e.target.files;
        var myfile = files[0];
        var reader = new FileReader();
        reader.readAsText(myfile);
        
        $(reader).on('load', function()
        {
           var res = reader.result;
           $('#error_log').text(res);
        });
        
       
        
    });
});