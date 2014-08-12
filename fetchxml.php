<?php

header ('Content-type: application/json');
echo file_get_contents("http://www.linticket.no/json/index.php3?db=Kvarteret&StartDato=".$_GET["year"]."-".$_GET["month"]."-".$_GET["date"]."&SluttDato=".$_GET["year"]."-".$_GET["month"]."-".$_GET["date"]."");

// http://www.linticket.no/json/index.php3?db=Kvarteret&StartDato=2014-08-11&SluttDato=2014-08-11

?>
