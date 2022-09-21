<?php
    //
    //Getting the data in an array when the post method is used
    //
    $arr = array();
    $arr = $_POST['activeDataSet'];
    //
    //definining the array for the stored object in the json file
    //
    $tempArray = array();
    //
    //entry statement for json objects
    //
    array_push($tempArray, "[");
    //
    //check if the array is null - fixes an issue where ghost entries would be readded to the json file
    //
    if($arr != null) {
        //
        //Iterates through the array to add each entry to the json file
        //
        for($i = 0; $i < count($arr); $i++) {
            if($i != count($arr)-1) {
                array_push($tempArray, '{"ticketNumber":"'.$arr[$i]['ticketNumber'].'", "csa":"'.$arr[$i]['csa'].'", "dateAccepted":"'.$arr[$i]['dateAccepted'].'", "endUser":"'.$arr[$i]['endUser'].'", "userID":"'.$arr[$i]['userID'].'", "stage":"'.$arr[$i]['stage'].
                    '", "userEmail":"'.$arr[$i]['userEmail'].'", "csaEmail":"'.$arr[$i]['csaEmail'].'", "oldAsstTag":"'.$arr[$i]['oldAsstTag'].'", "newAsstTag":"'.$arr[$i]['newAsstTag'].'", "oldModelNumber":"'.$arr[$i]['oldModelNumber'].
                    '", "newModelNumber":"'.$arr[$i]['newModelNumber'].'", "managerName":"'.$arr[$i]['managerName'].'", "managerEmail":"'.$arr[$i]['managerEmail'].'", "mailZone":"'.$arr[$i]['mailZone'].'"},');
            } else {
                array_push($tempArray, '{"ticketNumber":"'.$arr[$i]['ticketNumber'].'", "csa":"'.$arr[$i]['csa'].'", "dateAccepted":"'.$arr[$i]['dateAccepted'].'", "endUser":"'.$arr[$i]['endUser'].'", "userID":"'.$arr[$i]['userID'].'", "stage":"'.$arr[$i]['stage'].
                    '", "userEmail":"'.$arr[$i]['userEmail'].'", "csaEmail":"'.$arr[$i]['csaEmail'].'", "oldAsstTag":"'.$arr[$i]['oldAsstTag'].'", "newAsstTag":"'.$arr[$i]['newAsstTag'].'", "oldModelNumber":"'.$arr[$i]['oldModelNumber'].
                    '", "newModelNumber":"'.$arr[$i]['newModelNumber'].'", "managerName":"'.$arr[$i]['managerName'].'", "managerEmail":"'.$arr[$i]['managerEmail'].'", "mailZone":"'.$arr[$i]['mailZone'].'"}');
            } 
        }
        
        var_dump($test3);
    }
    //
    //Closing statment for the json entries
    //
    array_push($tempArray, "]");
    //
    //saving the entries to the json file
    //
    file_put_contents("../save/loadActive.json",  $tempArray);
?>