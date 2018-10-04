from time import sleep
from sense_hat import SenseHat
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#firebase init
cred = credentials.Certificate("charactergenerator-a88a7-firebase-adminsdk-d3wy6-81d801feb9.json")
firebase = firebase_admin.initialize_app(cred,{'databaseURL':'https://charactergenerator-a88a7.firebaseio.com'})

sense = SenseHat()
sense.clear()


while True:
    #firebase vars
    color = db.reference('/color').get()
    r = color['r']
    g = color['g']
    b = color['b']
    print(r)

    matrix = db.reference('/matrix').get()
    #print(matrix)

    #color lights
    col = 0
    row = 0
    for Array in matrix:
        for val in row:
            if val == "color":
                sense.set_pixel(row, col, r, g, b)
            print(col)
            col = col + 1
            if col > 7:
                col = 0
        row = row + 1
        if row > 7:
            row = 0
            
    sleep(10)






