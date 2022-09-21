<?php
    $serverName = "*INSERT DB NAME*";
    $connectionInfo = array("Database"=>"*DB NAME*", "CharacterSet" => "UTF-8");

    $conn = sqlsrv_connect($serverName, $connectionInfo);
