from time import sleep
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#firebase init
cred = credentials.Certificate("services/charactergenerator-a88a7-firebase-adminsdk-d3wy6-81d801feb9.json")
firebase_admin.initialize_app(cred)

while True:
    #firebase vars
    color = db.reference().child('color')
    r = 0
    g = 0
    b = 0

    matrix = db.reference().child('matrix')

    print(color)
    print(matrix)

    #color lights
    col = 0
    for row in matrix:
        for val in matrix
            if val = "color":
                sense.set_pixel(row, col, r, g, b)
            col = col + 1

    sleep(1)






