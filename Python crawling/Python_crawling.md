# Ptyhon Crawling

> ## pyautogui를 사용한 자동화

- ### 마우스 자동화

```python
import pyautogui
import time

pyautogui.moveTo(1386, 408, 2)
pyautogui.doubleClick()
time.sleep(1)

pyautogui.typewrite(['a', 'b', 'c', 'enter'])
pyautogui.typewrite(['abc', 'enter'])
```

`typewrite()` [] 안에는 하나의 키보드 단위로 인식하므로, abc는 존재X

- ### screenshot을 이용한 자동화

```python
import pyautogui

# print(pyautogui.position())
pyautogui.screenshot('1.png', region=(1577, 569, 30, 30))
num1 = pyautogui.locateCenterOnScreen('1.png')
pyautogui.click(num1)
```

> ## beautifulsoup crawling

## urllib

모듈을 핸들링하는 URL

- **urllib.request**
- **urllib.error**
- **urllib.parse**
- **urllib.robotparser**

- ### 검색결과 가져오기

```python
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
```

- `import urllib.parse` , `urllib.parse.quote_plus(plusUrl)` : 한글 검색이 가능하도록 해줌
