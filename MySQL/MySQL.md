# SQL

`S`tructured `Q`uery `L`anguage

# 표 만들기

## 용어정리

- table, 표
- row, record, 행
- column, 열

## Create

- sql의 column은 엑셀과 다르게, 데이터형을 가지고 있다. 또한 길이에 대한 규제도 가능하다.

### column 생성

```sql
CREATE TABLE topic(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NULL,
    created DATETIME NOT NULL,
    author VARCHAR(30) NULL,
    profile VARCHAR(30) NULL,
    PRIMARY KEY(id)
);
```

`INT(11)` : datatype
`NOT NUll` : 공란 허용하지 않음
`AUTO_INCREMENT` : 추가시, 자동적으로 번호 증가
`VARCHAR(100)` : data size 설정
`NULL` : 값이 없는것을 허용한다
`DATETIME` : 날짜 datatype
`PRIMARY KEY(id)` : 메인 key가 id이다, 중복 방지

### row 생성

```sql
INSERT INTO topic (title,description,created,author,profile) VALUES('ORACLE','ORACLE is ...',NOW(),'noah','developer');
```

## read

```sql
 SELECT* FROM topic;
```

## update

```sql
UPDATE topic SET description="Oracle is ...",title='Oracle' WHERE id =2;
```

## Delete

```sql
DELETE FROM topic WHERE id=5;
```

- `where` 잊어버리고 Enter키 치면 큰일난다 진짜. 조심하자.
