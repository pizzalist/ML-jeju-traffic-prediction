# HTML

## HTML 태그

---

- `<meta charset="utf-8">` : 한글 안깨지게 하기

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

**form** 의 기능 : 사용자가 브라우저에 입력한 정보를 특정 서버의 URL로 전송

- `<input type="">` : 입력 공간 생성, " "에는 text,password,submit 등이 가능
- `<input type="" name="">` : name 에는 id, pwd 와 같이 전송할 데이터의 유형 지정
- `<form action=""></form>` : " "위치에 데이터 코드 전송
- `value=""` : 기본값 으로 입력되어져있음
- `<textarea>,</textarea>` : 텍스트 수용량 조절, 사이에 텍스트 기본값 입력
- `<select name="">,</select>` :dropdown list 선택 형식
- `<option value=""> </option>` :option 만들기
- `<input type="radio" name="">` : 같은 이름으로 설정된 radio는 하나의 버튼만 선택된다.
- `<input type="checkbox">` : checkbox는 다중선택
- `<input type="button">` : 버튼 만들기
- `<input type="hidden">` :사용자에게는 보이지 않는 숨겨진 입력 필드를 정의한다.
  숨겨진 입력 필드는 렌더링이 끝난 웹 페이지에서는 전혀 보이지 않으며, 페이지 콘텐츠 내에서 이걸 볼 있게 만들 방법도 없다. (당장 이해 안돼도 됨)
- `<label>,</label>` : lable로 묶어준다, 사용성 높임
