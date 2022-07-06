# HTML

## HTML 태그

---

### **text 단락 , 줄바꿈**

- `<p>,</p>` : 단락 태그
- `<br>` : 줄바꿈

### **이미지 넣기**

> `<img src="img.jpg" width="400" height="300" alt="사자 이미지" title="사자 이미지">`

- `<img src= " ">`
- `width height` : 사진 크기 조절
- `alt` : alternative 대체, 오류로 인해 사진 보이지 않을때 대체 텍스트
- `title` : 마우스 올렸을때 뜨는 제목 (다른 것에 적용 가능)

### **table**

- `<table>,</table>` : table 표 구분
- `<table border"2">` : border은 표의 테두리 굵기, "" 안에 설정
- `<tr>,</tr>` : table row
- `<td>,</td>` : table data
- `<th>,</th>` : thead 셀 진하게 표시
- `<thead>,</thead>` : 표 젤 위 (순서 바꿔도 젤 위에 위치)
- `<tfoot>,</tfoot>` : 표 젤 아래(순서 바꿔도 젤 아래 위치)
- `rowspan` : 세로 병합
- `colspan` : 가로 병합

### **form**

- `<input type="">` : 입력 공간 생성, " "에는 text,password,submit 등이 가능
- `<input type="" name="">` : name 에는 id, pwd 와 같이 전송할 데이터의 유형 지정
- `<form action=""></form>` : " "위치에 데이터 코드 전송
- `value=""` : 기본값 으로 입력되어져있음
- `<textarea>,</textarea>` : 텍스트 수용량 조절, 사이에 텍스트 기본값 입력
