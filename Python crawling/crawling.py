import urllib.request
import urllib.parse
from bs4 import BeautifulSoup

baseUrl = 'https://search.naver.com/search.naver?where=view&sm=tab_jum&query='
plusUrl = input('검색어를 입력하세요:')
url = baseUrl + urllib.parse.quote_plus(plusUrl)
html = urllib.request.urlopen(url).read()
soup = BeautifulSoup(html, 'html.parser')


title = soup.find_all(class_='api_txt_lines total_tit')

for i in title:
    print(i.text)
    print(i.attrs['href'])
    print()
