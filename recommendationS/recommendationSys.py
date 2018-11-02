import numpy as np
import mysql.connector
from mysql.connector import Error
import pandas as pd
from sklearn.model_selection import train_test_split
import csv
import json


con = mysql.connector.connect(host='localhost', database='shopsite', user='root', password='Cucurigu12')
cursor = con.cursor()
header = ['reviewerID', 'productID', 'raiting', 'reviewTime']
df = pd.read_csv(r'C:\Users\macov\Desktop\Licenta\recommendationS\ratingsElectronics.csv', names=header, header=0,
                     usecols=['reviewerID', 'productID', 'raiting'])







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


def createTrainDataAndTest():

    global df

    train_data, test_data = train_test_split(df, test_size=0.25)

    nrUsers = df.reviewerID.unique().shape[0]
    nrItems = df.productID.unique().shape[0]
    print('number of users and itmes', nrUsers, nrItems)


    # train_data_matrix = np.zeros((nrUsers, nrItems))
    # for line in train_data.itertuples():
    #     train_data_matrix[line[1] - 1, line[2] - 1] = line[3]






def printInTableSql():
    global readCVS
    global cursor
    global con

    with open(r'C:\Users\macov\Desktop\Licenta\recommendationS\ratingsElectronics.csv') as CVSforRead:
        readCVS = csv.reader(CVSforRead, delimiter=',')
        for row in readCVS:
            # print(row[0],row[1],row[2])
            cursor.execute("insert into recommenr(item_id,user_id,raiting) values('%s','%s',%s)" % (row[1], row[0], row[2]))
            con.commit()
            print(cursor.rowcount,'record inserted')






if __name__ == '__main__':
        connect()
        # showTable()
        createTrainDataAndTest()
        # printInTableSql()