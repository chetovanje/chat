<?php
include('database.php');

$username = $_GET['username'];
$password = $_GET['lozinka'];

$query1 = "SELECT * FROM register WHERE username='$username'";
$register_user = mysqli_query($db,$query1);
$query2 = "SELECT * FROM users WHERE user='$username'";
$logged_user = mysqli_query($db,$query2);
$query3 = "SELECT * FROM register WHERE username='$username' AND password='$password'";
$valid_password = mysqli_query($db, $query3);


if(strlen($password) == 0)
{
    if( mysqli_num_rows($register_user) == 0 )
    { 
        if(mysqli_num_rows($logged_user) == 0)
        {
            echo "incognito";
        }
        else
        {
            echo "postoji gost";
        }     
    }
    else{
        echo "postoji korisnik";
    }
    
}
else{
    if(mysqli_num_rows($valid_password) != 0):
    {
        echo "login_uspeh";
    }
    elseif(mysqli_num_rows($logged_user) == 0 && mysqli_num_rows($register_user) == 0):
    {
        $query4 = "INSERT into register (username, password) VALUES('$username', '$password')";
        $q = mysqli_query($db,$query4);
        echo "new user";
    }
    else:
    {
        echo "neuspeo login";
    }
    endif;
}

?>