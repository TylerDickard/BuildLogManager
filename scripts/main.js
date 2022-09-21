//Author: Tyler Dickard
//File Name: main.js
//Description: This file houses all jQuery, and Javascript for the index.html file.
//Last Update: 8/10/2022
//
//Name: stageOptions
//Purpose: this variable will store all of the possible values for the dropdown menu in the editor
//Variable Type: array of strings
//
var pause = false;
var stageOptions = ["Stage 1 - Imaging", "Stage 2 - Running USMT", "Stage 3 - Software Inventory", "Stage 4 - Installing Software from SCCM", "Stage 5 - Manual Install", "Stage 6 - Testing", "Stage 7 - User Testing", "Stage 8 - Deployed", "Stage 11 - Canceled" ];
//
//Function Name: sessionDataLabel
//Parameters: an object named d
//Returns: N/A
//Description: When this function is called it will use the data object d to set the local storage objects of date, new asset tag, the end users name,
//the end user's id, the new model number, the old model number, the old asset tag, the stage, the csa agent assigned, and the ticket number for the 
//label maker to use when creating the label.
//
function sessionDataLabel(d) {
	window.localStorage.setItem('date', d.dateAccepted);
	window.localStorage.setItem('newAsstTag', d.newAsstTag);
	window.localStorage.setItem('userName', d.endUser);
	window.localStorage.setItem('userID', d.userID);
	window.localStorage.setItem('newDeviceName', d.newModelNumber);
	window.localStorage.setItem('oldDeviceName', d.oldModelNumber);
	window.localStorage.setItem('oldAsstTag', d.oldAsstTag);
	window.localStorage.setItem('stage', d.stage);
	window.localStorage.setItem('csa', d.csa);
	window.localStorage.setItem('email', d.userEmail);
	window.localStorage.setItem('ticketNumber', d.ticketNumber);
}
//
//Function Name: sessionDataReturnLabel
//Parameters: an object named d
//Returns: N/A
//Description: When this function is called it will set the local storage of the browser to house the old asset tag, the old device name, the csa agent, and the mailzone
//using the data object d
//
function sessionDataReturnLabel(d) {
	window.localStorage.setItem('oldAsstTag', d.oldAsstTag);
	window.localStorage.setItem('oldDeviceName', d.oldModelNumber);
	window.localStorage.setItem('csa', d.csa);
	window.localStorage.setItem('mail',d.mailZone);
}
//
//Function Name: $(document).ready( function ())
//Parameters: N/A
//Returns: N/A
//Description: This function will initialize all of the data and resources for the DataTables and its functions
//
var activeTable;
var deployedTable;
$(document).ready( function () {
	//
	//Initialization for the active refresh table's DataTable
	//
    activeTable = $('#activeRefreshesTable').DataTable( {
		//
		//Loading the dataset for the active refresh table
		//
		"ajax": {
			"url": "http://localhost:3000/save/loadActive.json",
			"type": "GET",
			"dataSrc": "",
		},
		//
		//Defining the columns for the table
		//
		"columns": [
			{ 
				"className": 'select',
				data: "ticketNumber"
			},
			{ 
				"className": 'select',
				data: "csa" 
			},
			{ 
				"className": 'select',
				data: "dateAccepted",
				datetimepicker: { timepicker: false, format : "m/d/Y"}
			},
			{ 
				"className": 'select',
				data: "endUser"
			},
			{
				"className": 'select',
				data: "userID"
			},
			{
				"className": 'select',
				data: "stage",
				type: "select",
				options: stageOptions,
			},
			{
				"className": 'select',
				data: "userEmail"
			},
			{
				"className": 'select',
				data: "csaEmail"
			},
			{
				"className": 'select',
				data: "oldAsstTag"
			},
			{
				"className": 'select',
				data: "newAsstTag"
			},
			{
				"className": 'select',
				data: "oldModelNumber"
			},
			{
				"className": 'select',
				data: "newModelNumber"
			},
			{
				"className": 'select',
				data: "managerName"
			},
			{
				"className": 'select',
				data: "managerEmail"
			},
			{
				"className": 'select',
				data: "mailZone"
			}
		],
		//
		//This property will load the data for the table in ascending order
		//
		"order" : [[1, 'asc']],
		//
		//This property enables the alt editor library to work as the editor for the data table
		//
		altEditor: true,
		//
		//This property allows the selection of rows in the table
		//
		select: "single",
		//
		//Allows for the table to  be scrollable on the x-axis
		//
		scrollX: true,
	});
	//
	//Function Type: On Click Event
	//Description: When you click on a row within a table it will add the selected class to that table row to signal that it is selected. 
	//This function will also enable the edit and delete button when you select a row.
	//
	$('#activeRefreshesTable tbody').on('click', 'td.select', function () {
		pause = true;
		var tr = $(this).closest('tr');
		var editBtn = document.getElementById('activeEditButton');
		var deleteBtn = document.getElementById('activeDeleteButton');
		var transferBtn = document.getElementById('activeTransferButton');
		var softwareBtn = document.getElementById('activeSoftwareCompareButton');
		var labelBtn = document.getElementById('activeLabelButton');
		var newReturnBtn = document.getElementById('activeNewReturnButton');
        if (tr.hasClass('selected')) {
            tr.removeClass('selected');
			editBtn.disabled = true;
			deleteBtn.disabled = true;
			transferBtn.disabled = true;
			softwareBtn.disabled = true;
			labelBtn.disabled = true;
			newReturnBtn.disabled = true;
			pause = false;
        } else {
            tr.addClass('selected');
			editBtn.disabled = false;
			deleteBtn.disabled = false;
			transferBtn.disabled = false;
			softwareBtn.disabled = false;
			labelBtn.disabled = false;
			newReturnBtn.disabled = false;
        }
    });
	//
	//Function Type: On Click Event
	//Description: When you click the add button it will use the AltEditor to pull up the new entry menu.
	//
	$('#activeAddbutton').on('click', function () {
		pause = true;
		var that = $( '#activeRefreshesTable' )[0].altEditor;
		that._openAddModal();
		$('#altEditor-add-form-' + that.random_id)
			.off('submit')
			.on('submit', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that._addRowData();
				var activeDataSet = activeTable.rows().data().toArray();
				$.ajax({
					url:"../scripts/saveActive.php",
					type:"POST",
					data: {activeDataSet}
				});
				pause = false;
			});
	});
	//
	//Function Type: On Click Event
	//Description: When you click the delete button it will warn you before you delete an entry. If confirmed it will delete the entry
	//
	$('#activeDeleteButton').on('click', function (x) {  
		var that = $( '#activeRefreshesTable')[0].altEditor;
		that._openDeleteModal();
		$('#altEditor-delete-form-' + that.random_id)
			.off('submit')
			.on('submit', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that._deleteRow();
				document.getElementById('activeEditButton').disabled = true;
				document.getElementById('activeDeleteButton').disabled = true;
				document.getElementById('activeTransferButton').disabled = true;
				document.getElementById('activeSoftwareCompareButton').disabled = true;
				document.getElementById('activeLabelButton').disabled = true;
				document.getElementById('activeNewReturnButton').disabled = true;
				var activeDataSet = activeTable.rows().data().toArray();
				$.ajax ({
					"url":"../scripts/saveActive.php",
					"type":"POST",
					"data":{activeDataSet}
				});
			});
		x.stopPropagation(); //avoid open "Edit" dialog
	});
	//
	//Function Type: On Click Event
	//Description: When you click the edit button it will use the AltEditor to pull up the edit entry menu.
	//
	$('#activeEditButton').on('click', function () {
		var that = $( '#activeRefreshesTable' )[0].altEditor;
		that._openEditModal();
		$('#altEditor-edit-form-' + that.random_id)
			.off('submit')
			.on('submit', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that._editRowData();
				var activeDataSet = activeTable.rows().data().toArray();
				$.ajax ({
					"url":"../scripts/saveActive.php",
					"type":"POST",
					"data":{activeDataSet}
				});
			});
	});
	//
	//Function Type: On Click Event
	//Description: When you click the label link, it will open the label file with the data sent by the sessionDataLabel function
	//
	$('#activeLabelButton').on('click', function (x) {
		sessionDataLabel(activeTable.row('.selected').data());
		window.open("HTMLTemplates/label.html", "_blank");
	});
	//
	//Function Type: On Click Event
	//Description: When you click the new return link it will open the new return label html file with the data provided by ther sessionDataReturnLabel function
	//
	$('#activeNewReturnButton').on('click', function (x) {
		sessionDataReturnLabel(activeTable.row('.selected').data());
		window.open("HTMLTemplates/newReturnLabel.html", "_blank");
	});
	$('#activeSoftwareCompareButton').on('click', function() {
		var tr = document.getElementsByClassName("selected");
		var row = activeTable.row(tr).data().oldModelNumber;
		
		$.ajax ({
			url:"../upload/"+row+".csv",
			type: 'HEAD',
			success : function () {
				$('#prevCompare').removeClass("invisible");
			}
		});
	});
	//
	//Initialization for the deployed refresh table's DataTable
	//
	deployedTable = $('#deployedRefreshesTable').DataTable( {
		//
		//Loading the dataset for the deployed refresh table
		//
		"ajax": {
			"url": "http://localhost:3000/save/loadDeployed.json",
			"type": "GET",
			"dataSrc": "",
		},
		//
		//Defining the columns for the table
		//
		"columns": [
			{ 
				"className": 'select',
				data: "ticketNumber"
			},
			{ 
				"className": 'select',
				data: "csa" 
			},
			{ 
				"className": 'select',
				data: "dateAccepted",
				datetimepicker: { timepicker: false, format : "m/d/Y"}
			},
			{ 
				"className": 'select',
				data: "endUser"
			},
			{
				"className": 'select',
				data: "userID"
			},
			{
				"className": 'select',
				data: "stage",
				type: "select",
				options: stageOptions
			},
			{
				"className": 'select',
				data: "userEmail"
			},
			{
				"className": 'select',
				data: "csaEmail"
			},
			{
				"className": 'select',
				data: "oldAsstTag"
			},
			{
				"className": 'select',
				data: "newAsstTag"
			},
			{
				"className": 'select',
				data: "oldModelNumber"
			},
			{
				"className": 'select',
				data: "newModelNumber"
			},
			{
				"className": 'select',
				data: "managerName"
			},
			{
				"className": 'select',
				data: "managerEmail"
			},
			{
				"className": 'select',
				data: "mailZone"
			},
		],
		//
		//This property will load the data for the table in ascending order
		//
		"order" : [[1, 'asc']],
		//
		//This property enables the alt editor library to work as the editor for the data table
		//
		altEditor: true,
		//
		//This property allows the selection of rows in the table
		//
		select: "single",
		//
		//Allows for the graph to be scrollable along the x-axis
		//
		scrollX: true
	});
	//
	//Function Type: On Click Event
	//Description: When you click on a row within a table it will add the selected class to that table row to signal that it is selected. 
	//This function will also enable the edit and delete button when you select a row.
	//
	$('#deployedRefreshesTable tbody').on('click', 'td.select', function () {
		var tr = $(this).closest('tr');
		var editBtn = document.getElementById('deployedEditButton');
		var deleteBtn = document.getElementById('deployedDeleteButton');
		var transferBtn = document.getElementById('deployedTransferButton');
		var softwareBtn = document.getElementById('deployedSoftwareCompareButton');
		var labelBtn = document.getElementById('deployedLabelButton');
		var newReturnBtn = document.getElementById('deployedNewReturnButton')
        if (tr.hasClass('selected')) {
            tr.removeClass('selected');
			editBtn.disabled = true;
			deleteBtn.disabled = true;
			transferBtn.disabled = true;
			softwareBtn.disabled = true;
			labelBtn.disabled = true;
			newReturnBtn.disabled = true;
        } else {
            tr.addClass('selected');
			editBtn.disabled = false;
			deleteBtn.disabled = false;
			transferBtn.disabled = false;
			softwareBtn.disabled = false;
			labelBtn.disabled = false;
			newReturnBtn.disabled = false;
        }
    });
	//
	//Function Type: On Click Event
	//Description: When you click the add button it will use the AltEditor to pull up the new entry menu.
	//
	$('#deployedAddButton').on('click', function () {
		var that = $( '#deployedRefreshesTable' )[0].altEditor;
		that._openAddModal();
		$('#altEditor-add-form-' + that.random_id)
			.off('submit')
			.on('submit', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that._addRowData();
				var deployedDataSet = deployedTable.rows().data().toArray();
				$.ajax ({
					"url":"../scripts/saveDeployed.php",
					"type":"POST",
					"data":{deployedDataSet}
				});
			});
	});
	//
	//Function Type: On Click Event
	//Description: When you click the add button it will use the AltEditor to pull up the edit entry menu
	//
	$('#deployedDeleteButton').on('click', function (x) {  
		var that = $( '#deployedRefreshesTable')[0].altEditor;
		that._openDeleteModal();
		$('#altEditor-delete-form-' + that.random_id)
			.off('submit')
			.on('submit', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that._deleteRow();
				var deployedDataSet = deployedTable.rows().data().toArray();
				$.ajax({
					"url":"../scripts/saveDeployed.php",
					"type":"POST",
					"data": {deployedDataSet}
				});
			});
		x.stopPropagation(); //avoid open "Edit" dialog
	});
	//
	//Function Type: On Click Event
	//Description: When you click the add button it will use the AltEditor to pull up the delete entry menu.
	//
	$('#deployedEditButton').on('click', function () {
		var that = $( '#deployedRefreshesTable' )[0].altEditor;
		that._openEditModal();
		$('#altEditor-edit-form-' + that.random_id)
			.off('submit')
			.on('submit', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that._editRowData();
				var deployedDataSet = deployedTable.rows().data().toArray();
				$.ajax({
					"url":"../scripts/saveDeployed.php",
					"type":"POST",
					"data": {deployedDataSet}
				});
			});
	});
	//
	//Function Type: On Click Event
	//Description: When you click the label link, it will open the label file with the data sent by the sessionDataLabel function
	//
	$('#deployedLabelButton').on('click', function (x) {
		sessionDataLabel(activeTable.row('.selected').data());
		window.open("HTMLTemplates/label.html", "_blank");
	});
	//
	//Function Type: On Click Event
	//Description: When you click the new return link it will open the new return label html file with the data provided by ther sessionDataReturnLabel function
	//
	$('#deployedNewReturnButton').on('click', function (x) {
		sessionDataReturnLabel(activeTable.row('.selected').data());
		window.open("HTMLTemplates/newReturnLabel.html", "_blank");
	});
	//
	//Function Type: On Click Event
	//Description: When the active transfer button is clicked, it will copy the selected row's data and create a new row on the deployed
	//table with that data. It will then delete the old row and redraw the table to update the entries.
	//
	$('#activeTransferButton').on('click', function () {
		var pause = true;
		var tr = document.getElementsByClassName("selected");
		var row = activeTable.row(tr);
		document.getElementById('activeEditButton').disabled = true;
		document.getElementById('activeDeleteButton').disabled = true;
		document.getElementById('activeTransferButton').disabled = true;
		document.getElementById('activeSoftwareCompareButton').disabled = true;
		document.getElementById('activeLabelButton').disabled = true;
		document.getElementById('activeNewReturnButton').disabled = true;

		deployedTable.row.add(row.data());
		activeTable.row(tr).remove();
		
		activeTable.draw();
		deployedTable.draw();
		var activeDataSet = activeTable.rows().data().toArray();
		var deployedDataSet = deployedTable.rows().data().toArray();
		$.ajax({
			"url":"../scripts/saveActive.php",
			"type":"POST",
			"data": {activeDataSet}
		});
		$.ajax({
			"url":"../scripts/saveDeployed.php",
			"type":"POST",
			"data": {deployedDataSet}
		});
		
		var pause = false;
	});
	//
	//Function Type: On Click Event
	//Description: When the active transfer button is clicked, it will copy the selected row's data and create a new row on the active
	//table with that data. It will then delete the old row and redraw the table to update the entries.
	//
	$('#deployedTransferButton').on('click', function () {
		var pause = true;
		var tr = document.getElementsByClassName("selected");
		var row = deployedTable.row(tr);
		document.getElementById('activeEditButton').disabled = true;
		document.getElementById('activeDeleteButton').disabled = true;
		document.getElementById('activeTransferButton').disabled = true;
		document.getElementById('activeSoftwareCompareButton').disabled = true;
		document.getElementById('activeLabelButton').disabled = true;
		document.getElementById('activeNewReturnButton').disabled = true;

		activeTable.row.add(row.data());
		deployedTable.row(tr).remove();
		
		activeTable.draw();
		deployedTable.draw();
		var activeDataSet = activeTable.rows().data().toArray();
		var deployedDataSet = deployedTable.rows().data().toArray();
		$.ajax({
			"url":"../scripts/saveDeployed.php",
			"type":"POST",
			"data": {deployedDataSet}
		});
		$.ajax({
			"url":"../scripts/saveActive.php",
			"type":"POST",
			"data": {activeDataSet}
		});
		var pause = false;
	});
	//
	//Function Type: On Resize
	//Description: When the window resizes it will redraw the tables to match the size of the webpage.
	//
	window.addEventListener("resize", function() {
		activeTable.draw();
		deployedTable.draw();
	});
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
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
		  event.preventDefault();
		  return false;
		}
	  });
	  $('#deployedSoftwareCompareButton').on('click', function() {
		var tr = document.getElementsByClassName("selected");
		var row = deployedTable.row(tr).data().oldModelNumber;
		
		$.ajax ({
			url:"../upload/"+row+".csv",
			type: 'HEAD',
			success : function () {
				$('#prevCompare').removeClass("invisible");
			}
		});
	});
});
//
//Function Name: openSoftwareCompare()
//Parameters: N/A
//Returns: N/A
//Description: This function will open the softwareCompare.php file and send over some variables for use over there.
//
function openSoftwareCompare() {
	var tr = document.getElementsByClassName("selected");
	var row = activeTable.row(tr).data();
	document.cookie = "oldModelNumber = " + row.oldModelNumber;
	window.localStorage.setItem('newDeviceName', row.newModelNumber);
	window.localStorage.setItem("oldDeviceName", row.oldModelNumber);
	window.open("../HTMLTemplates/softwareCompare.php", "_blank");
};
//
//TEMPORARY TIMER
//This timer is temporary as checks every second for data within the .json file, ideally we would like to use a sql
//table to store this information, but until then we have this.
//
setInterval(function () {
	if (pause === false) {
		$.get('../save/loadActive.json', function(newDataArray) {
			var temp = JSON.stringify(activeTable.rows().data().toArray())
			var temp2 = JSON.stringify(newDataArray);
			if(temp2 != temp) {
				activeTable.clear();
				activeTable.rows.add(newDataArray);
				activeTable.draw();
			}
		});
		$.get('../save/loadDeployed.json', function(newDataArray) {
			var temp = JSON.stringify(deployedTable.rows().data().toArray())
			var temp2 = JSON.stringify(newDataArray);
			if(temp2 != temp) {
				deployedTable.clear();
				deployedTable.rows.add(newDataArray);
				deployedTable.draw();
			}
		});
	}
}, 1000);