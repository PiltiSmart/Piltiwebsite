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
   execPrint("git status");
   execPrint("git pull https://Manikandan971@bitbucket.org/pilti/piltiwebsite.git");
   execPrint("git status");
} else{
   print_r("Unverfied");
}
?>