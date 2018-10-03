import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("services/charactergenerator-a88a7-firebase-adminsdk-d3wy6-81d801feb9.json")
firebase_admin.initialize_app(cred)