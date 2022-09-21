<?php
    if(isset($_POST['submit'])) {
        //grab uploaded file
        $file = $_FILES['filename'];
        //get information about file
        $fileName = $_FILES['filename']['name'];
        $fileTmpName = $_FILES['filename']['tmp_name'];
        $fileSize = $_FILES['filename']['size'];
        $fileError = $_FILES['filename']['error'];
        $fileType = $_FILES['filename']['type'];
        //get the extention
        $fileExt = explode('.', $fileName);
        $fileActualExt = strtolower(end($fileExt));
        //define what extensions are allowed
        $allow = array('csv');
        //check and upload
        if(in_array($fileActualExt, $allow)) {
            if($fileError === 0) {
                $fileDest = '../upload/'.$fileName;
                move_uploaded_file($fileTmpName, $fileDest);
                header("Location: ../index.html");
            } else {
                echo "ERROR $fileError: There was an issue uploading your file, please try again.";
            }
        } else {
            echo "ERROR: the file type $fileActualExt is not allowed, please try again.";
        }
    }
?>