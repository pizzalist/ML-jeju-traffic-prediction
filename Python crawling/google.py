from urllib.parse import quote_plus
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

baseUrl = 'https://www.google.com/search?q='
plusUrl = input('무엇을 검색할까요? :')
url = baseUrl + quote_plus(plusUrl)

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(url)

html = driver.page_source
soup = BeautifulSoup(html)

g = soup.select('.g')
print(type(g))
for i in g:
    print(i.select_one('.LC20lb.MBeuO.DKV0Md').text)
    print(i.select_one('.iUh30.qLRx3b.tjvcx').text)
    print(i.a.attrs['href'])
    print()

driver.close()
