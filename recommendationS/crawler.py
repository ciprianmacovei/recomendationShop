import requests
from bs4 import BeautifulSoup
import mysql.connector
from mysql.connector import Error




con = mysql.connector.connect(host='localhost', database='shopsite', user='root', password='Cucurigu12')
cursor = con.cursor()
itemsArray = []
obj = {}

def webCrawler():
    urlEmag = 'https://www.emag.ro/cmp/crazy-days-august-2018/telefoane-tablete-gadgeturi.php?ref=section_CMP-5880_3014'
    global itemsArray, obj
    response = requests.get(urlEmag)

    soup = BeautifulSoup(response.content)
    # soup = soup.prettify()


    articolTelefon = soup.article.contents
    price = articolTelefon[1].contents
    print(price[1].find('span', {'class': 'money-int'}).text.strip(), 'hai cipriane')

    for x in soup.findAll('article', {"class": 'section-product-item'}):
        if x.find('h2', {'class': 'spi-title'}).text.strip().find('Telefon') != -1:
            #print(x.find('a', href=True)['href'], '@@@@@@@@@@@@@@@@@@@@@@@@', x.find('h2', {'class': 'spi-title'}).text.strip(), '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', x.contents[1].find('span',{'class': 'money-int'}).text.strip())
            obj = {'nume': x.find('h2', {'class': 'spi-title'}).text.strip(), 'price': x.contents[1].find('span', {'class': 'money-int'}).text.strip(), 'imagePath':x.find('a', href=True)['href'], 'item_type': 4, 'numar':x.contents[1].find('span', {'class': 'money-int'}).text.strip()[0] }
            print(obj)
    # for i in soup.findAll("h2", {"class": 'spi-title'}):
    #     if i.text.strip().find('Telefon') != -1:
    #        print(i.text.strip())
            # obj = {'nume': i.text.strip(),'price':}
            # itemsArray.append(i.text.strip())
    # for i in soup.findAll("article", {"class": 'section-product-item'}):
        # if i.find("span",{"class:''"}):
        #     print(i.text.strip(), 'asdasdasdsadasdsadsadasdas')

    # print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    # print(itemsArray)


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
    global obj, itemsArray, con, cursor
    # try:
    for index, val in enumerate(obj):
        cursor.execute("insert into items(item_id,nume,descriere,imagePath,price,item_type,numar) values(%d,'%s','%s','%s',%s,%s,%s)" % (index+13, val['nume'], ' ', val['imagePath'],  int(val['price']), val['item_type'], val['numar']))
        cursor.commit()
        print(cursor.rowcount, 'Item inserted')
    # finally:
    #     print("S a terminar de inserat")
    #     cursor.close()
    #     con.close()








if __name__ == '__main__':
    connect()
    webCrawler()
    # showTable()
