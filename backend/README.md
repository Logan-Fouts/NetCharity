# Backend Documentation

This backend allows users to interact with a properly configured MySQL database through sending GET and POST requests.  
Also, it will as well generate tags for organizations based on their website with textrazor.

## Installation and Setup

1. Install the required dependencies:

    ```pip install mysql-connector-python textrazor```
2. Create a secrets.py file in the backend directory  
    ```MYSQL_HOST = "your_mysql_host"
    MYSQL_USER = "your_mysql_user"
    MYSQL_PASSWORD = "your_mysql_password"
    MYSQL_DATABASE = "your_mysql_database"
    API_KEY = "your_textrazor_api_key"  
3. Run the server **Note: It is by default listening on port 2565**  
    ```python server.py```

## Usage
* Use the **POST** to insert user data into MySQL. Send a POST request with a JSON payload containing the required fields. If the username already exists, an error message will be returned server side.  
* Use the **GET** to retrieve all user data from MySQL. Send a GET request here, and receive a JSON response with an array of user data.