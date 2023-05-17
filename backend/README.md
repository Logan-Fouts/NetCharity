# Backend Documentation
**This is a Python code snippet that demonstrates the usage of the TextRazor API for extracting relevant tags from a desired charity website and storing the information in a MySQL database or in a local file.**

## Prerequisites
Before running the code, ensure that you have the following set up:
* TextRazor API Key: Obtain an API key from the TextRazor website (https://www.textrazor.com/) and replace secrets.API_KEY with your API key.
* MySQL Database: Set up a MySQL database and replace the database connection details in the sql_POST and sql_GET functions with your database host, user, password, and database name.

## Code Description  
The code performs the following tasks:
* Setup: The TextRazor API key is configured, and the necessary TextRazor features and classifiers are specified.
* get_tags Function: This function takes a charity array (containing name, description, and URL) as input. It uses the TextRazor API to analyze the URL and extract relevant tags. The extracted tags are appended to the charity array and returned.
* sql_POST Function: This function inserts a charity record into the MySQL database. It takes a charity array as input and performs the database insertion using the provided connection details.
* sql_GET Function: This function retrieves all elements (charity records) from the MySQL database. It returns the retrieved rows as a result.
* *Temporary Code:* This section includes temporary code snippets that demonstrate how the functions sql_POST and sql_GET can be used to insert and retrieve data from the MySQL database. This section can be replaced or modified as per your requirements.

## Usage
To use this code:
* Make sure you have the necessary prerequisites set up.
* Replace the placeholders and configure the TextRazor API key and MySQL database connection details.
* Use the get_tags function to extract relevant tags from a desired charity website and obtain the updated charity array.
* Use the sql_POST function to insert the charity array into the MySQL database.
* Use the sql_GET function to retrieve all charity records from the MySQL database.
* **Note:** The temporary code section demonstrates how the functions can be used with sample data. You can modify it or remove it as needed.
