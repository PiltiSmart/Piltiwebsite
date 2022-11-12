<?php
$queries = array();
parse_str($_SERVER['QUERY_STRING'], $queries);
function execPrint($command) {
   $result = array();
   exec($command, $result);
   print("<pre>");
   foreach ($result as $line) {
       print($line . "\n");
   }
   print("</pre>");
}
if ($queries["username"] == "Manikandan" && $queries["password"] == "123456"){
   execPrint("sudo git status");
   execPrint("sudo git pull origin develop");
   execPrint("sudo git status");
} else{
   print_r("Unverfied");
}
?>