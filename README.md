# **Build Log Manager Web App Project**
For the Build Log Manager Project here is a quick run down on all of the current features, future features, features I was unable to do, and current bugs

## **Current Features**
- Leverages jQuery's DataTables to hold the information
- Stores data in a .json file
- Has automatic label creation
- Leverages the SCCM SQL Database for old device information
- Able to print/save as pdf results from a software comparison
- Able to edit, add, and remove entries
- Able to transfer entries from one table to another

## **Future Features**
- Creation of a IIS Server, with PHP and SQL
  - Extensions needed for the php.ini file are: 
    - extension=curl
    - extension=mysqli
    - extension=openssl 
    - extension=php_sqlsrv_81_nts_x64.dll
    - extension=php_pdo_sqlsrv_81_nts.dll
- Integration with Easy Vista's REST API
  - Queries I've been running:
    - https://medmutual.easyvista.com/api/v1/50005/requests?search=sd_catalog_id~"5293" -- For getting all hardware requests
  - Problems I've been having
    - As of right now the only way to differentiate between a hardware request and a refresh request is by looking for the word "refresh" in the description
- Switching over from json to SQL table for mutiple users adding/editing/deleting entries
- Integration with AD
  - For security reasons
  - Unless user is an admin they can only view the tickets assigned to them
- Adding the ability to handle tickets like new hire's devices, or replacement devices
  - For replacements leverage the database to tell us what we need to install on the new device
  - For new hire devices get information from the ticket for what software to install
- Appending pdf's of software comparison results to a EasyVista ticket
- When a user clicks on a software compare button it runs a script to attempt to gather software inventory before prompting to upload a .csv file

## **Features I was unable to do**
- The EasyVista REST API Integration
  - Needs to be on an IIS Server
  - No clear way to identify a refresh ticket
- SQL Database instead of a json file
  - Unable to create a table due to permissions
- Powershell script
  - IIS

## **Bugs**
- If we continue to use json to store data, whenever a user on another instance adds an entry it deselects the currently selected entry and if editing an entry wont save the data
- If two users add an entry to the tables at the same time the last person to submit will replace the first users entry
- If the user hits upload for a software comparson file but doesnt provide a file it still loads and opens the softwareCompare.php file, could cause issues.
# Please check the code for documentation regarding the code itself.