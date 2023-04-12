-- 1번
SELECT A.course_id, count(DISTINCT S.student_id), count( S.submission_id), AVG(S.total_score)
FROM submissions S JOIN assignments A ON S.assignment_id = A.assignment_id
GROUP BY A.course_id;

-- 2번
SELECT A.course_id ,A.assignment_title, ST.student_name, min(S.submit_date)
FROM submissions S  JOIN assignments A ON S.assignment_id = A.assignment_id
			JOIN students ST ON S.student_id = ST.student_id

GROUP BY A.course_id ,A.assignment_id;

-- 3번
SELECT A.course_id, A.assignment_title, count(S.submission_id)
FROM submissions S  JOIN assignments A ON S.assignment_id = A.assignment_id
JOIN students ST ON S.student_id = ST.student_id

WHERE S.assignment_id != 1
        AND S.student_id != 11
        AND A.started_date <= S.submit_date
        AND A.ended_date >= S.submit_date
GROUP BY A.course_id, A.assignment_id;






-- 4번
SELECT A.course_id, A.assignment_title, ST.student_name, COUNT(S.submission_id)
FROM submissions S JOIN assignments A ON S.assignment_id = A.assignment_id
					JOIN students ST ON S.student_id = ST.student_id
WHERE 
S.total_score < 100 
AND S.submit_date <= (SELECT MIN(submit_date)
						FROM submissions WHERE total_score = 100
                        AND S.assignment_id = A.assignment_id 
                        AND S.student_id = ST.student_id)
GROUP BY A.course_id, A.assignment_title, ST.student_id;


-- 5번 
SELECT A.course_id, ST.student_id,
(SELECT count(S2.total_score = 100) from submissions S2 where S2.student_id = ST.student_id 
															and A.assignment_id = S2.assignment_id) as count_100,

(SELECT avg(S2.submit_date) from submissions S2 where S2.student_id = ST.student_id 
															and A.assignment_id = S2.assignment_id)	as avg_submitdate			
FROM submissions S,
	assignments A,  
	students ST 
WHERE 
	S.assignment_id = A.assignment_id
	and S.student_id = ST.student_id
    and S.total_score = 100
    and S.submit_date = (select min(submit_date) from submissions S3 where S.submission_id = S3.submission_id)
GROUP BY A.course_id;


-- 6번
SELECT A.assignment_title, AVG(S.total_score)
FROM submissions S JOIN assignments A ON S.assignment_id = A.assignment_id
					JOIN students ST ON S.student_id = ST.student_id
WHERE S.submit_date <= (SELECT min(submit_date) FROM submissions S2 WHERE total_score = 100 
						AND S.student_id = S2.student_id AND S.assignment_id = S2.assignment_id)
GROUP BY A.assignment_id;

-- 7번
SELECT ST.student_name, A.assignment_title, count(S.submission_id) as count_100 
, time(max(S.submit_date) - min(S.submit_date)) as submit_time
FROM submissions S JOIN assignments A ON S.assignment_id = A.assignment_id
					JOIN students ST ON S.student_id = ST.student_id
WHERE 
S.total_score < 100 
AND S.submit_date <= (SELECT MIN(submit_date)
						FROM submissions S2 WHERE total_score = 100
                        AND S2.assignment_id = A.assignment_id 
                        AND S2.student_id = ST.student_id)
GROUP BY A.assignment_id, ST.student_id;

-- 8번
SELECT A.course_id, A.assignment_title, min(S.submit_date) as start_submit, max(S.submit_date) as end_submit
FROM submissions S JOIN assignments A ON S.assignment_id = A.assignment_id
					JOIN students ST ON S.student_id = ST.student_id
WHERE S.submit_date >= A.started_date and S.submit_date >= A.ended_date
GROUP BY A.course_id, A.assignment_id 
                    


                    
                    