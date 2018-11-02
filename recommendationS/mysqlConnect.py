import mysql.connector
from mysql.connector import Error
import pandas as pd


con = mysql.connector.connect(host='localhost', database='shopsite', user='root', password='Cucurigu12')
cursor = con.cursor()

def connect():
    global con
    try:
        if con.is_connected():
            print("s a connectat la baza de date")
            return 1
        else:
            return 0

    except Error as e:
        print(e)




def showTable():
    global cursor
    global con
    try:
        cursor.execute("select nume,item_type from items")
        itemsRows = cursor.fetchall()
        for row in itemsRows:
            print(row[0], row[1])
    finally:
        print("Tabelul s a terminat")
        cursor.close()
        con.close()





if __name__ == '__main__':
        connect()
        showTable()
