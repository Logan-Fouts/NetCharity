"""
This file is a backend server that allows interaction with a MYSQL db through GET and POST requests as well as generating tags for organizations.
"""
import http.server
import json
import secrets
import socketserver

import mysql.connector
import textrazor

# Setup textrazor API.
textrazor.api_key = secrets.API_KEY

client = textrazor.TextRazor(extractors=["entities", "topics"])
client.set_cleanup_mode("cleanHTML")
client.set_classifiers(["textrazor_newscodes"])

def get_Tags(user):
    """
    Finds relevant tags from the desired organization's website. Uses textrazor API.

    Arguments: 
        user (dict): User data with organization details (name, description, url).
    """
    response = client.analyze_url(user["organizationURL"])
    entities = list(response.entities())
    entities.sort(key=lambda x: x.relevance_score, reverse=True)
    tmp = []
    for topic in response.topics():
        if topic.score > 0.6:
            tag = topic.label
            tmp.append(tag)
    user["organizationTags"] = tmp
    return user


def sql_POST(user):
    """
    Insert user data into the MySQL database.

    Arguments:
        user (dict): User data dictionary.
    """
    cnx = mysql.connector.connect(
        host=secrets.MYSQL_HOST,
        user=secrets.MYSQL_USER,
        password=secrets.MYSQL_PASSWORD,
        database=secrets.MYSQL_DATABASE
    )

    cursor = cnx.cursor()

    if user["isOrganization"]:
        user = get_Tags(user)

    # Check if the username already exists.
    username = user["username"]
    query_check_username = "SELECT COUNT(*) FROM `users` WHERE `username` = %s"
    cursor.execute(query_check_username, (username,))
    count = cursor.fetchone()[0]

    if count > 0:
        print(f"Username '{username}' already exists. User data not inserted.")
    else:
        query_insert_user = "INSERT INTO `users`(`username`, `password`, `email`, `isOrg`, `orgName`, `orgURL`, `orgCode`, `orgDescription`, `orgTags`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        data = (
            user["username"],
            user["password"],
            user["email"],
            int(user["isOrganization"]),
            user.get("organizationName", ""),
            user.get("organizationURL", ""),
            user.get("organizationRegistrationCode", ""),
            user.get("organizationDescription", ""),
            ",".join(user.get("organizationTags", []))
        )
        cursor.execute(query_insert_user, data)
        cnx.commit()
        print("User data inserted successfully.")

    cursor.close()
    cnx.close()


def sql_GET():
    """
    Returns all elements from the MySQL database.

    Arguments:
        list (): List of tuples representing rows from the users table.
    """
    cnx = mysql.connector.connect(
        host=secrets.MYSQL_HOST,
        user=secrets.MYSQL_USER,
        password=secrets.MYSQL_PASSWORD,
        database=secrets.MYSQL_DATABASE
    )

    cursor = cnx.cursor()
    query = "SELECT * FROM `users`"
    cursor.execute(query)
    rows = cursor.fetchall()
    cursor.close()
    cnx.close()
    return rows


#################### Server ####################
PORT = 2565

class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
    
    def do_GET(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-type", "application/json")
        self.end_headers()

        rows = sql_GET()

        # Convert into list of dictionaries.
        data = []
        for row in rows:
            data.append({
                "username": row[0],
                "password": row[1],
                "email": row[2],
                "isOrg": bool(row[3]),
                "orgName": row[4],
                "orgURL": row[5],
                "orgCode": row[6],
                "orgDescription": row[7],
                "orgTags": row[8].split(",") if row[8] else []
            })

        response = json.dumps(data)
        self.wfile.write(response.encode("utf-8"))

    def do_POST(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        content_length = int(self.headers["Content-Length"])
        body = self.rfile.read(content_length)
        user_data = json.loads(body.decode("utf-8"))
        sql_POST(user_data)

# Create an HTTP server. Run until interrupted.
with socketserver.TCPServer(("", PORT), MyRequestHandler) as httpd:
    print("Server Started, Port:", PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
        print("Server Stopped")