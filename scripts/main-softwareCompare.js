//File Name: main-softwareCompare.js
//Author: Tyler Dickard
//Last Update: 8/10/2022
//Description: This file houses all functions needed for the softwareCompare.php
//file.
//
//initializing the table variables
var missingTable;
var versionTable;
var installTable;
//
//Function Type: .ready function
//Parameters: N/A
//Returns: N/A
//Description: This function will wait for the webpage to load before executing the included
// functions
//
$(document).ready(function () {
    var oldDeviceName = window.localStorage.getItem("oldDeviceName");
    var newDeviceName = window.localStorage.getItem("newDeviceName");
    //
	//Function Type: On Keystroke
	//Description: As you type in the search bar it will search the tables
	//
	$("#refreshSearch").on("keyup", function() {
		var tables = $('table.dataTable');
		tables.DataTable().search(this.value).draw();
	});
	//
	//Function Type: On Click
	//Description: When you click on the x in the search box it will reset the filters
	//
	$('input#refreshSearch.form-control').on('keyup click', function() {
		var tables = $('table.dataTable');
		window.setTimeout(function() {
			if(document.getElementById('refreshSearch').value == '') {
				tables.DataTable().search('').draw();
			}
		}, 100);
	});
    //
    //Function Type: On Keydown
    //Description: Will ignore the enter button when pressed due to the page refreshing
    //
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
		  event.preventDefault();
		  return false;
		}
    });
    //
    //Function Type: on click
    //Description: When the printResult button is pressed, it will generate a pdf of the results
    //from the software comparison.
    //
    $('#printResult').on('click', function() {
        var config = {
            className:"buttons-pdf buttons-html5",
            customize:null,
            download:"download",
            exportOptions:{},
            extension:".pdf",
            filename: "*",
            footer:"false",
            header:"true",
            messageBottom:"*",
            messageTop:"*",
            namespace:".dt-button-2",
            orientation:"portrait",
            pageSize:"A4",
            title:"*"
        };
        var tables = ["missingSoftwareTable", "versionConflictsTable", "installedSoftwareTable"];
        var tablesConverted = {};
        for(let i =0; i <tables.length; i++) {
            var dt = $('#'+tables[i]).DataTable();
            var data = dt.buttons.exportData(config.exportOptions);
            var info = dt.buttons.exportInfo(config);

            var rows = [];

            if ( config.header ) {
                rows.push( $.map( data.header, function ( d ) {
                    return {
                        text: typeof d === 'string' ? d : d+'',
                        style: 'tableHeader'
                    };
                } ) );
            }

            for ( let j=0, ien=data.body.length ; j<ien ; j++ ) {
                rows.push( $.map( data.body[j], function ( d ) {
                    return {
                        text: typeof d === 'string' ? d : d+'',
                        style: j % 2 ? 'tableBodyEven' : 'tableBodyOdd'
                    };
                } ) );
            }

            if ( config.footer && data.footer) {
                rows.push( $.map( data.footer, function ( d ) {
                    return {
                        text: typeof d === 'string' ? d : d+'',
                        style: 'tableFooter'
                    };
                } ) );
            }

            tablesConverted[tables[i]]=rows;
    }


        var doc = {
            pageSize: config.pageSize,
            pageOrientation: config.orientation,
            content: [
                "Data for Missing Software",
                {
                    table: {
                        headerRows: 1,
                        body: tablesConverted[tables[0]]
                    },
                    layout: 'noBorders'
                },
                " ",
                "Data for Version Conflicts",
                " ",
                {
                    table: {
                        headerRows: 1,
                        body: tablesConverted[tables[1]]
                    },
                    layout: 'noBorders'
                },
                " ",
                "Data for Installed Software",
                " ",
                {
                    table: {
                        headerRows: 1,
                        body: tablesConverted[tables[2]]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                tableHeader: {
                    bold: true,
                    fontSize: 11,
                    color: 'white',
                    fillColor: '#2d4154',
                    alignment: 'center'
                },
                tableBodyEven: {},
                tableBodyOdd: {
                    fillColor: '#f3f3f3'
                },
                tableFooter: {
                    bold: true,
                    fontSize: 11,
                    color: 'white',
                    fillColor: '#2d4154'
                },
                title: {
                    alignment: 'center',
                    fontSize: 15
                },
                message: {}
            },
            defaultStyle: {
                fontSize: 10
            }
        };

        if ( info.messageTop ) {
            doc.content.unshift( {
                text: info.messageTop,
                style: 'message',
                margin: [ 0, 0, 0, 12 ]
            } );
        }

        if ( info.messageBottom ) {
            doc.content.push( {
                text: info.messageBottom,
                style: 'message',
                margin: [ 0, 0, 0, 12 ]
            } );
        }

        if ( info.title ) {
            doc.content.unshift( {
                text: info.title,
                style: 'title',
                margin: [ 0, 0, 0, 12 ]
            } );
        }

        if ( config.customize ) {
            config.customize( doc, config );
        }


    pdfMake.createPdf(doc).download("Comparison of " + oldDeviceName + " and " + newDeviceName+'.pdf');
});
        
    
});
//
//Function Name: initializeMissingTable()
//Parameters: N/A
//Returns: N/A
//Description: This function initializes the Missing Programs Table
//
function initializeMissingTable() {
    missingTable = $("#missingSoftwareTable").DataTable ( {
        "columns": [
            {
                "className" : 'select',
                data: "deviceName"
            },
            {
                "className" : 'select',
                data: "softwareName"
            },
            {
                "className" : 'select',
                data: "version"
            },
            {
                "className" : 'select',
                data: "publisher"
            },
        ],
        //
		//This property will load the data for the table in ascending order
		//
		"order" : [[1, 'asc']],
		//
		//This property allows the selection of rows in the table
		//
		select: "single",
        //
        //This property allows the graph to be scrollable along the x axis
        //
		scrollX: true,
        //
        //This property removes the ability to page the results, thus showing them all
        //
        paging: false
    });
}
//
//Function Name: initializeInstallTable()
//Parameters: N/A
//Returns: N/A
//Description: This function initializes the Installed Programs Table
//
function initializeInstallTable() {
    installTable = $("#installedSoftwareTable").DataTable ( {
        "columns": [
            {
                "className" : 'select',
                data: "deviceName"
            },
            {
                "className" : 'select',
                data: "softwareName"
            },
            {
                "className" : 'select',
                data: "version"
            },
            {
                "className" : 'select',
                data: "publisher"
            },
        ],
        //
		//This property will load the data for the table in ascending order
		//
		"order" : [[1, 'asc']],
		//
		//This property allows the selection of rows in the table
		//
		select: "single",
        //
        //This property allows the graph to be scrollable along the x axis
        //
		scrollX: true,
        //
        //This property removes the ability to page the results, thus showing them all
        //
        paging: false
    });
}
//
//Function Name: initializeVersionTable()
//Parameters: N/A
//Returns: N/A
//Description: This function initializes the Version Conflicts Table
//
function initializeVersionTable() {
    versionTable = $("#versionConflictsTable").DataTable ( {
        "columns": [
            {
                "className" : 'select',
                data: "deviceName"
            },
            {
                "className" : 'select',
                data: "softwareName"
            },
            {
                "className" : 'select',
                data: "version"
            },
            {
                "className" : 'select',
                data: "publisher"
            },
        ],
        //
		//This property will load the data for the table in ascending order
		//
		"order" : [[1, 'asc']],
		//This property allows the selection of rows in the table
		//
		select: "single",
        //
        //This property allows the graph to be scrollable along the x axis
        //
		scrollX: true,
        //
        //This property removes the ability to page the results, thus showing them all
        //
        paging: false
    });
}
//
//Function Name: addInstalled
//Parameters: an object named result
//Returns: N/A
//Description: This function adds an entry to the Installed Software Table
//from a given object passed to it
//
function addInstalled(result) {
    const tdDevice = document.createElement("td");
    const tdDeviceTxt = document.createTextNode("Both");
    tdDevice.appendChild(tdDeviceTxt);

    const tdName = document.createElement("td");
    const tdNameTxt = document.createTextNode(result[0]);
    tdName.appendChild(tdNameTxt);

    const tdVersion = document.createElement("td");
    const tdVersionTxt = document.createTextNode(result[1])
    tdVersion.appendChild(tdVersionTxt);

    const tdPublisher = document.createElement("td");
    const tdPublisherTxt = document.createTextNode(result[2]);
    tdPublisher.appendChild(tdPublisherTxt);

    const tr = document.createElement("tr");
    tr.appendChild(tdDevice);
    tr.appendChild(tdName);
    tr.appendChild(tdVersion);
    tr.appendChild(tdPublisher);

    const tbody = document.getElementById("installedBody");
    tbody.appendChild(tr);

}
//
//Function Name: addVersion
//Parameters: an object named result0, an object named result1, a string named devNameNew,
//and a string named devNameOld
//Returns: N/A
//Description: This function adds an entry to the Version Conflict Table
//using the parameters passed into it
//
function addVersion(result0, result1, devNameNew, devNameOld) {
    const tdDeviceNew = document.createElement("td");
    const tdDeviceTxtNew = document.createTextNode(devNameNew + " (New) ");
    tdDeviceNew.appendChild(tdDeviceTxtNew);

    const tdNameNew = document.createElement("td");
    const tdNameTxtNew = document.createTextNode(result0[0]);
    tdNameNew.appendChild(tdNameTxtNew);

    const tdVersionNew = document.createElement("td");
    const tdVersionTxtNew = document.createTextNode(result0[1])
    tdVersionNew.appendChild(tdVersionTxtNew);

    const tdPublisherNew = document.createElement("td");
    const tdPublisherTxtNew = document.createTextNode(result0[2]);
    tdPublisherNew.appendChild(tdPublisherTxtNew);

    const trNew = document.createElement("tr");
    trNew.appendChild(tdDeviceNew);
    trNew.appendChild(tdNameNew);
    trNew.appendChild(tdVersionNew);
    trNew.appendChild(tdPublisherNew);

    const tdDeviceOld = document.createElement("td");
    const tdDeviceTxtOld = document.createTextNode(devNameOld + " (Old) ");
    tdDeviceOld.appendChild(tdDeviceTxtOld);

    const tdNameOld = document.createElement("td");
    const tdNameTxtOld = document.createTextNode(result1[0]);
    tdNameOld.appendChild(tdNameTxtOld);

    const tdVersionOld = document.createElement("td");
    const tdVersionTxtOld = document.createTextNode(result1[1])
    tdVersionOld.appendChild(tdVersionTxtOld);

    const tdPublisherOld = document.createElement("td");
    const tdPublisherTxtOld = document.createTextNode(result1[2]);
    tdPublisherOld.appendChild(tdPublisherTxtOld);

    const trOld = document.createElement("tr");
    trOld.appendChild(tdDeviceOld);
    trOld.appendChild(tdNameOld);
    trOld.appendChild(tdVersionOld);
    trOld.appendChild(tdPublisherOld);

    const tbody = document.getElementById("versionBody");
    tbody.appendChild(trNew);
    tbody.appendChild(trOld);
}
//
//Function Name: addMissing
//Parameters: an object named result
//Returns: N/A
//Description: This function adds an entry to the Missing Software Table
//from a given object passed to it
//
function addMissing(result, temp) {
    const tdDevice = document.createElement("td");
    const tdDeviceTxt = document.createTextNode(temp +" (New)");
    tdDevice.appendChild(tdDeviceTxt);

    const tdName = document.createElement("td");
    const tdNameTxt = document.createTextNode(result[0]);
    tdName.appendChild(tdNameTxt);

    const tdVersion = document.createElement("td");
    const tdVersionTxt = document.createTextNode(result[1])
    tdVersion.appendChild(tdVersionTxt);

    const tdPublisher = document.createElement("td");
    const tdPublisherTxt = document.createTextNode(result[2]);
    tdPublisher.appendChild(tdPublisherTxt);

    const tr = document.createElement("tr");
    tr.appendChild(tdDevice);
    tr.appendChild(tdName);
    tr.appendChild(tdVersion);
    tr.appendChild(tdPublisher);

    const tbody = document.getElementById("missingBody");
    tbody.appendChild(tr);
}
//
//Function Name: findName
//Parameters: a string named temp and an array of objects named tempArray
//Returns: an integer
//Description: this function determines if the name given is within the given array
//
function findName(temp, tempArray) {
    for(let i = 0; i < tempArray.length; ++i) {
        if(tempArray[i][0] === temp) {
            return i;
        }
    }
    return -1;
}
//
//Function Name: findVersion
//Parameters: a string named temp and an array of objects named tempArray
//Returns: an integer
//Description: this function determines if the given version is within the given array
//
function findVersion(temp, tempArray) {
    for(let j = 0; j < tempArray.length; ++j) {
        if(tempArray[j][1] === temp) {
            return j;
        }
    }
    return -1;
}
//
//Function Name: compareResults
//Parameters: an array of objects named resultsCSV, an array of objects named resultsSQL,
//a string named newDevName, and a string named oldDevName
//Returns: N/A
//Description: This is the main parent function that uses logic to call different functions
//to add the data to the datatables and also initalizes the tables.
//
function compareResults(resultsCSV, resultsSQL, newDevName, oldDevName) {
    for(let i=0; i < resultsCSV[0].length; i++) {
        if (findName(resultsCSV[0][i][0], resultsSQL) !== -1) {
            if(findVersion(resultsCSV[0][i][1], resultsSQL) !== -1) {
                addInstalled(resultsCSV[0][i]);
                resultsSQL.splice(findName(resultsCSV[0][i][0], resultsSQL), 1);
            } else {
                addVersion(resultsCSV[0][i], resultsSQL[findName(resultsCSV[0][i][0], resultsSQL)], newDevName, oldDevName);
                resultsSQL.splice(findName(resultsCSV[0][i][0], resultsSQL),1);
            }
        } 
    }
    for(let j =0; j < resultsSQL.length; j++) {
        if(!(resultsSQL[j][0].includes("Windows 10 Enterprise"))) {
            addMissing(resultsSQL[j], newDevName);
        }
    }
    initializeInstallTable();
    initializeVersionTable();
    initializeMissingTable();
}
