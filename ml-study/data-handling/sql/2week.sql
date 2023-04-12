# 1번 각 코스별, 숙제별로 중간에 포기한 학생의 수와
# 각 숙제별로 그 학생들이 포기하기까지 시도한 최대 횟수를 출력하시오 (단, 한번도 제출하지 않은 학생은 제외)
WITH scoring AS (SELECT assignments.course_id,
                assignments.assignment_title,
                submissions.student_id,
                submissions.assignment_id,
                ROW_NUMBER() over
                    (PARTITION BY submissions.assignment_id,
                    submissions.student_id
                    ORDER BY total_score) AS rn,
                submissions.total_score
                FROM assignments
                INNER JOIN submissions
                ON assignments.assignment_id = submissions.assignment_id
                WHERE submissions.assignment_id != 1
                    AND submissions.student_id != 11
                    AND assignments.started_date <= submissions.submit_date
                    AND assignments.ended_date >= submissions.submit_date),
    students AS (SELECT *
                FROM student_course_relation
                WHERE teaching_assistant = 0)

SELECT scoring.course_id 코스명,
    scoring.assignment_title 과제명,
    scoring.student_id 학생id,
    max(scoring.rn) 제출횟수,
    max(scoring.total_score) 점수,
     scoring.assignment_id

FROM scoring
    INNER JOIN students
    ON scoring.student_id = students.student_id

GROUP BY scoring.course_id, scoring.assignment_title, scoring.student_id
HAVING max(scoring.total_score) != 100;



#2번 문제- 각 코스별, 숙제별로 만점까지의 제출 시간 평균이 가장 빠른 학생의 아이디를 출력하시오
select assignments.course_id, assignments.assignment_id, students.student_id, student_name, submit_date
from submissions
inner join assignments
            on submissions.assignment_id = assignments.assignment_id
inner join students
            on submissions.student_id = students.student_id
WHERE submissions.assignment_id != 1
                    AND submissions.student_id != 11
                    AND assignments.started_date <= submissions.submit_date
                    AND assignments.ended_date >= submissions.submit_date
                    AND total_score = 100
group by assignments.course_id, assignments.assignment_id;


#3번- 각 코스별, 숙제별로 첫 번째 제출에 50점 이상을 받은 학생의 수를 구하여라
# 조교 안해줬음 ..
# 아님 order by totalscore로 해줬음
WITH scoring AS (SELECT assignments.course_id,
                assignments.assignment_title,
                assignments.assignment_id,
                submissions.student_id,
                ROW_NUMBER() over
                    (PARTITION BY submissions.assignment_id,
                    submissions.student_id
                    ORDER BY submit_date) AS rn,
                submissions.total_score
                FROM assignments
                INNER JOIN submissions
                ON assignments.assignment_id = submissions.assignment_id
                WHERE submissions.assignment_id != 1
                    AND submissions.student_id != 11
                    AND assignments.started_date <= submissions.submit_date
                    AND assignments.ended_date >= submissions.submit_date),
    students AS (SELECT *
                FROM student_course_relation
                WHERE teaching_assistant = 0)

select course_id, assignment_title, assignment_id,count(student_id)
from scoring
where scoring.rn = 1
    AND scoring.total_score >= 50
group by course_id, assignment_title
order by course_id, assignment_title;

#4번- 각 코스별로 만점을 가장 많이 받았으면서도 제출 시간이 가장 빠른 학생의 평균 점수를 구하여라



#5번 - 각 코스별, 숙제별로 마감 날짜에 가장 근접하게 만점을 받은 학생을 구하여라

select * from
    (select assignments.course_id, assignments.assignment_id, students.student_id, student_name, submit_date, total_score
    from submissions
    inner join assignments
                on submissions.assignment_id = assignments.assignment_id
    inner join students
                on submissions.student_id = students.student_id
    WHERE submissions.assignment_id != 1
                        AND submissions.student_id != 11
                        AND assignments.started_date <= submissions.submit_date
                        AND assignments.ended_date >= submissions.submit_date
                        AND total_score = 100
        order by submit_date desc
        LIMIT 18446744073709551615) a

group by a.course_id, a.assignment_id;


with time as (select relation.course_id, relation.assignment_id, relation.student_id, submissions.total_score, timediff(relation.ended_date, submissions.submit_date) as remain_time
from submissions inner join (select assignments.course_id, assignments.assignment_id, student_course_relation.student_id, assignments.started_date, assignments.ended_date
                            from assignments inner join student_course_relation
                            on assignments.course_id = student_course_relation.course_id
                            where teaching_assistant = 0
                            and assignments.assignment_id <> 1
                            and student_course_relation.student_id <> 11) relation
on submissions.assignment_id = relation.assignment_id
and submissions.student_id = relation.student_id
where submissions.submit_date > relation.started_date
and submissions.submit_date < relation.ended_date
and submissions.total_score = 100
order by assignment_id)

select *
from time
where remain_time in (select min(remain_time) as min_remain_time
from time
group by course_id, assignment_id)
group by course_id, assignment_id;


#SQL Standard에서 규정한 DB Table은 데이터의 순서가 의미를 갖는 것이 아니기 때문에 Sub Query를 실행한다고 하여도
# 데이터의 본질적인 값의 구조와 정렬이 변하지 않는다는 것이다.
#하지만, Limit을 걸어줄 경우 데이터의 순서 뿐만 아니라 데이터의 갯수까지도 제한되기 떄문에
# 테이블 내 데이터의 본절적인 내용이 변경되어서 서브쿼리의 결과 즉, group by의 대상이 되는 결과가 원하던 바 대로 설정되는 것이었다.




#6번 - 각 코스별, 숙제별로 만점까지 걸린 가장 빠른 제출 시간을 시간 단위로 구하여라
select assignments.course_id, assignments.assignment_id, students.student_id, student_name, submit_date
from submissions
inner join assignments
            on submissions.assignment_id = assignments.assignment_id
inner join students
            on submissions.student_id = students.student_id
WHERE submissions.assignment_id != 1
                    AND submissions.student_id != 11
                    AND assignments.started_date <= submissions.submit_date
                    AND assignments.ended_date >= submissions.submit_date
                    AND total_score = 100
group by assignments.course_id, assignments.assignment_id;
# min과 같이 별 조치를 취하지 않아도 submit date가 최저읜 조건이 성립된다 !
# 데이터가 들어가는 순서대로 시간이 증가해서 그런것 같은데
# 이렇게 해도 되는지.. 궁금

#7번 - 각 코스별, 숙제별로 0점을 제외하고 가장 낮은 점수를 받은 학생의 제출 횟수를 구하여라
with scoring as (select  assignments.course_id,
        assignments.assignment_title,
        submissions.student_id,
       row_number() over
    (partition by assignments.assignment_id,student_id
    order by total_score ) as rn,
    submissions.total_score
    from assignments
    inner join submissions
        on assignments.assignment_id = submissions.assignment_id
    where submissions.assignment_id != 1
                            AND submissions.student_id != 11
                            AND assignments.started_date <= submissions.submit_date
                            AND assignments.ended_date >= submissions.submit_date
                            AND total_score != 0)
# student_id, min(scoring.total_score), max(rn) 가 제각각 별개로 나온다.
# 어떻게 하면 연결 될까? join도 안되는것 같음
select scoring.course_id, scoring.assignment_title, scoring.student_id, min(scoring.total_score), max(scoring.rn)
from scoring
    inner join students
    on scoring.student_id = students.student_id
group by course_id, assignment_title, scoring.student_id;




# 8번
with scoring as (select  assignments.course_id,
        assignments.assignment_title,
        submissions.student_id,
       row_number() over
    (partition by assignments.assignment_id,student_id
    order by total_score ) as rn,
    submissions.total_score
    from assignments
    inner join submissions
        on assignments.assignment_id = submissions.assignment_id
    where submissions.assignment_id != 1
                            AND submissions.student_id != 11
                            AND assignments.started_date <= submissions.submit_date
                            AND assignments.ended_date >= submissions.submit_date
                            AND total_score != 0)
# student_id, min(scoring.total_score), max(rn) 가 제각각 별개로 나온다.
# 어떻게 하면 연결 될까? join도 안되는것 같음
select scoring.course_id, scoring.assignment_title, max(scoring.rn)
from scoring
group by course_id, assignment_title, student_id;





# 9번 문제
with student_all100 as (SELECT  submissions.student_id,
        assignments.assignment_title,
        ROW_NUMBER() over
            (PARTITION BY submissions.student_id
            ORDER BY submissions.assignment_id) AS rn,
        submissions.total_score
        FROM assignments
        INNER JOIN submissions
        ON assignments.assignment_id = submissions.assignment_id
        where submissions.total_score = 100 and
              assignments.course_id = 'DSAA-2022' and
              submissions.student_id != 11
        group by submissions.student_id, assignment_title)

select students.student_name
from student_all100
    inner join students on student_all100.student_id = students.student_id
where student_all100.rn = 6;


WITH score_100 AS (SELECT course_id, a.assignment_id, student_id, total_score
FROM submissions
    INNER JOIN assignments a on submissions.assignment_id = a.assignment_id
WHERE course_id='DSAA-2022' AND total_score=100
GROUP BY a.assignment_id, student_id)

SELECT student_name 학생명
FROM students
    RIGHT JOIN score_100 ON students.student_id = score_100.student_id
WHERE score_100.assignment_id != 1
    AND score_100.student_id != 11
GROUP BY student_name
HAVING COUNT(assignment_id)=6;


