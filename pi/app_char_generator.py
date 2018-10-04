from time import sleep
from sense_hat import SenseHat
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#firebase init
cred = credentials.Certificate("charactergenerator-a88a7-firebase-adminsdk-d3wy6-81d801feb9.json")
firebase = firebase_admin.initialize_app(cred,{'databaseURL':'https://charactergenerator-a88a7.firebaseio.com'})

#init sensehat
sense = SenseHat()

currentMatrix = []
currentColor = { 'r':0 , 'g':0 , 'b':0 }

while True:
    #import firebase vars
    color = db.reference('/color').get()
    matrix = db.reference('/matrix').get()
    
    #create vars from firebase imports
    r = color['r']
    g = color['g']
    b = color['b']

    #color lights
    col = 0
    row = 0
    if currentMatrix != matrix or currentColor != color:
        sense.clear()
        currentMatrix = matrix
        currentColor = color
        for Array in matrix:
            for val in Array:
                if val == "color":
                    sense.set_pixel(row, col, r, g, b)
                print(col)
                col += 1
                if col > 7:
                    col = 0
            row += 1
            if row > 7:
                row = 0
     
    #check every 3 seconds
    sleep(3)






