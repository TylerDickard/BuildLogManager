<!--
    Author: Tyler Dickard
    Last Updated: 8/10/2022
    Description: This file houses the software comparison results.
-->
<!DOCTYPE html>
<html lang = "en">
    <meta name="viewport" content="width=device-width, initial-scale=1" charset="UTF-8">
    <!--Title tag-->
    <head>
        <title>Software Comparison Results</title>
    </head>
    <!--All Stylesheets-->
    <link rel = "stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">
	<link rel="stylesheet" href="../styles/dataTables.bootstrap5.min.css" />
	<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.dataTables.min.css" />
	<link rel="stylesheet" href="https://cdn.datatables.net/select/1.3.1/css/select.dataTables.css" />
	<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.5/css/responsive.dataTables.css" />
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css" />
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <!--Body of the webpage, houses all of the datatables-->
    <body id="body">
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<div class="container-fluid">
			  <a class="navbar-brand" href="../index.html">Home</a>
			  <div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				  <li class="nav-item">
					<a class="nav-link" href="#missingSoftware">Missing Software</a>
				  </li>
				  <li class = "nav-item">
					  <a class="nav-link" href = '#versionConflicts'>Version Conflicts</a>
				  </li>
                  <li class = "nav-item">
					  <a class="nav-link" href = '#installedSoftware'>Installed Software</a>
				  </li>
                  <li class = "nav-item">
					  <a class="nav-link" id = 'printResult'>Print Results</a>
				  </li>
				</ul>
				<form class="d-flex" role="search">
					<input class="form-control" type="search" placeholder="Search" aria-label="Search" id="refreshSearch">
				  </form>
			  </div>
			</div>
		</nav>
    
        <section id="missingSoftware">
            <h1>Missing Software</h1>
            <!--The table for active refreshes-->
            <table id="missingSoftwareTable" class="dataTable table-striped">
                <thead>
                    <tr>
                        <!--Table Headders-->
                        <th>Device</th>
                        <th>Software Name</th>
                        <th>Version</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody id = "missingBody">

                </tbody>
            </table>
        </section>
        <section id="versionConflicts">
            <h1>Version Conflicts</h1>
            <!--The table for active refreshes-->
            <table id="versionConflictsTable" class="dataTable table-striped">
                <thead>
                    <tr>
                        <!--Table Headders-->
                        <th>Device</th>
                        <th>Software Name</th>
                        <th>Version</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody id="versionBody">

                </tbody>
            </table>
        </section>
        <section id="installedSoftware">
            <h1>Installed Software</h1>
            <!--The table for active refreshes-->
            <table id="installedSoftwareTable" class="dataTable table-striped">
                <thead>
                    <tr>
                        <!--Table Headders-->
                        <th>Device</th>
                        <th>Software Name</th>
                        <th>Version</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody id="installedBody">

                </tbody>
            </table>
        </section>
    </body>
    <!--Footer-->
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-light">
		<div class="col-md-4 d-flex align-items-center">
			<span class="mb-3 mb-md-0 text-muted">© 2022, Medical Mutual - All Rights Reserved</span>
		</div>
	</footer>
    <!--jQuery-->
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
	<script src="https://code.jquery.com/jquery-migrate-3.4.0.js"></script>
    <!--DataTables-->
	<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" ></script>
	<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js" ></script>
	<script src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.js" ></script>
    <script src="https://cdn.datatables.net/responsive/2.2.5/js/dataTables.responsive.js" ></script>
	<script src="https://cdn.datatables.net/datetime/1.1.2/js/dataTables.dateTime.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
    <script src= "../scripts/jszip.min.js"></script>
    <script src="../scripts/pdfmake.min.js"></script>
    <script src = "../scripts/vfs_fonts.js"></script>
    <!--Bootstrap-->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <script src="../scripts/papaparse.js"></script>
    <!--My Scripting-->
    <script src="../scripts/main-softwareCompare.js"></script>
</html>
<script>
    <?php
        //Including the database handler
        include_once("../scripts/dbh.inc.php");
        //setting the old device name
        $oldDevName = $_COOKIE['oldModelNumber'];
        $js_array = [];
        //sql query statement
        $sql = "
        SELECT 
            InstallSoftware.ProductName0 AS ProductName,
            InstallSoftware.ProductVersion0 AS ProductVersion,
            InstallSoftware.Publisher0 AS Publisher
        FROM
            v_R_System AS SYS
        JOIN v_GS_INSTALLED_SOFTWARE InstallSoftware ON InstallSoftware.ResourceID = SYS.ResourceID
        WHERE SYS.Name0= ?";
        //preparing the query, and filling in the question marks with the variables
        //data
        $stmt = sqlsrv_query($conn, $sql, array($oldDevName));
        //executing the query
        sqlsrv_execute($stmt);
        //creating the array that stores the results of the query
        while ($row = sqlsrv_fetch_array($stmt)) {
            array_push($js_array,$row); 
        }
        //sending the array with the results to javascript
        echo "var javascript_array = ".json_encode($js_array) . ";\n";
        //releasing the variable for the query
        sqlsrv_free_stmt($stmt);
    ?>;
    //creating the array for the csv parsing results
    var resultsCSV = [];
    //running the PapaParse Parsing function to read the file and save the results
    Papa.parse("../upload/"+ window.localStorage.getItem("newDeviceName") +".csv", {
        download: true,
        header: false,
        skipEmptyLines: true,
        complete: function (results) {
        },
        chunk : function(results, parser) {
            //shifting the data to get rid of the headers
            results.data.shift();
            results.data.shift();
            var newDevName = window.localStorage.getItem("newDeviceName");
            var oldDevName = window.localStorage.getItem("oldDeviceName");
            //saving the results to that array
            resultsCSV.push(results.data);
            //running the parent function for displaying the results of the
            //comparison
            compareResults(resultsCSV, javascript_array, newDevName, oldDevName);
        }
    });
</script>
