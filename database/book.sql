DROP DATABASE IF EXISTS bookdb;

CREATE DATABASE IF NOT EXISTS bookdb
    DEFAULT CHARACTER SET utf8mb4 
    DEFAULT COLLATE utf8mb4_general_ci;
    
USE bookdb;

-- 책 테이블
CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100),
    publication_date VARCHAR(255),
    rating INT,
    bestseller BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id)
)   ENGINE = INNODB
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;

-- 장르 테이블
CREATE TABLE genre (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
)   ENGINE = INNODB
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;

-- 책과 장르 관계
CREATE TABLE bookgenre (
    book_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY(book_id, genre_id),
    FOREIGN KEY(book_id) REFERENCES books(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(genre_id) REFERENCES genre(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX(book_id)
)   ENGINE = INNODB
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;
    
-- 책 추천 테이블
CREATE TABLE recobook (
    id INT NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(100),
    book_id INT NOT NULL,
    contents VARCHAR(512),
    delete_password VARCHAR(16) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES books(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)   ENGINE = INNODB
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;
    
-- 베스트셀러 추가
INSERT INTO books (title, author, publication_date, rating, bestseller) VALUES 
    ("불편한 편의점", "김호연", "2021-04-20", 8, TRUE),
    ("역행자", "자청", "2022-06-03", 5, TRUE),
    ("하얼빈", "김훈", "2022-08-03", 8, TRUE),
    ("그리움은 아무에게나 생기지 않습니다", "박근혜", "2021-12-30", 1, TRUE),
    ("작별인사", "김영하", "2022-05-02", 6, TRUE),
    ("부자 아빠 가난한 아빠1", "로버트 기요사키", "2022-10-28", 7, TRUE),
    ("달러구트 꿈 백화점", "이미예", "2020-07-08", 5, TRUE),
    ("이어령의 마지막 수업", "김지수", "2021-10-28", 8, TRUE),
    ("물고기는 존재하지 않는다", "를루 밀러", "2021-12-17", 5, TRUE),
    ("어서 오세요, 휴남동 서점입니다", "황보름", "2022-01-17", 7, TRUE),
    ("세상의 마지막 기차역", "무라세 다케시", "2022-05-09", 7, TRUE),
    ("달러쿠트 꿈 백화점 2", "이미예", "2021-07-27", 8, TRUE),
    ("웰씽킹", "켈리 최", "2021-11-10", 7, TRUE),
    ("기분을 관리하면 인생이 관리된다", "김다슬", "2022-04-12", 4, TRUE),
    ("불편한 편의점 2", "김호연", "2022-08-10", 8, TRUE),
    ("트렌드 코리아 2023", "김난도", "2022-10-05", 5, TRUE),
    ("마음의 법칙", "폴커 키츠", "2022-02-10", 4, TRUE),
    ("해커스 토익 기출 보카 TOEIC VOCA 단어장", "David Cho", "2022-03-14", 7, TRUE),
    ("오은영의 화해", "오은영", "2019-01-10", 8, TRUE),
    ("데일 카네기 인간관계론", "데일 카네기", "2019-10-07", 7, TRUE),
    ("파친코 1", "이민진", "2022-08-05", 8, TRUE),
    ("미드나잇 라이브러리", "매트 헤이그", "2021-04-28", 5, TRUE),
    ("돈의 속성", "김승호", "2020-06-15", 7, TRUE),
    ("흔한남매 10", "흔한남매", "2022-04-28", 9, TRUE),
    ("오십에 읽는 논어", "최종엽", "2021-11-03", 6, TRUE),
    ("부의 추월차선", "엠제이 드마코", "2022-02-04", 6, TRUE),
    ("나는 당신이 행복했으면 좋겠습니다", "박찬위", "2021-11-25", 8, TRUE),
    ("데일 카네기 자기관리론", "데일 카네기", "2021-01-13", 9, TRUE),
    ("원씽", "게리 켈러", "2013-08-30", 7, TRUE),
    ("운명을 바꾸는 부동잔 투자 수업: 기초편", "정태익", "2022-03-22", 7, TRUE),
    ("인간 실격", "다자이 오사무", "2012-04-10", 5, TRUE),
    ("일플레이션에서 살아남기", "오건영", "2022-05-23", 7, TRUE),
    ("소크라테스 익스프레스", "에릭 와이너", "2021-04-28", 7, TRUE),
    ("돈, 뜨겁게 사랑하고 차갑게 다루어라", "앙드레 코스톨라니", "2015-09-30", 7, TRUE),
    ("오늘 밤, 세계에서 이 사랑이 사라진다 해도", "이치조 미사키", "2021-06-28", 5, TRUE),
    ("돈의 심리학", "모건 하우절", "2021-01-13", 7, TRUE),
    ("파친코 1", "이민진", "2018-03-09", 6, TRUE),
    ("트렌드 코리아 2022", "김난도", "2021-10-06", 4, TRUE),
    ("아몬드", "손원평", "2022-05-12", 8, TRUE),
    ("멘탈을 바꿔야 인생이 바뀐다", "박세니", "2022-04-30", 1, TRUE);
    
-- 장르 추가
INSERT INTO genre (id, name) VALUES
    (1, "한국소설 일반"),
    (2, "자기계발"),
    (3, "역사/대하 소설"),
    (4, "정치/사회"),
    (5, "경제/경영"),
    (6, "판타지 소설"),
    (7, "인문"),
    (8, "과학"),
    (9, "일본소설 일반"),
    (10, "시/에세이"),
    (11, "외국어"),
    (12, "영미소설 일반"),
    (13, "만화"),
    (14, "기타");

-- 베스트셀러-장르 관계 추가
INSERT INTO bookgenre VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 1),
    (6, 5),
    (7, 6),
    (8, 7),
    (9, 8),
    (10, 1),
    (11, 9),
    (12, 6),
    (13, 2),
    (14, 10),
    (15, 1),
    (16, 5),
    (17, 7),
    (18, 11),
    (19, 2),
    (20, 2),
    (21, 12),
    (22, 12),
    (23, 5),
    (24, 13),
    (25, 7),
    (26, 5),
    (27, 10),
    (28, 2),
    (29, 2),
    (30, 5),
    (31, 9),
    (32, 5),
    (33, 7),
    (34, 5),
    (35, 9),
    (36, 5),
    (37, 12),
    (38, 5),
    (39, 1),
    (40, 2);

-- 책 추천 등록
INSERT INTO books (title, author) VALUES
    ("용의자 X의 헌신", "히가시노 게이고");
    
INSERT INTO recobook (nickname, contents, delete_password, book_id)
    SELECT '형민', "재밌어요!!", "0509", books.id
    FROM books
    WHERE title = '용의자 X의 헌신';


-- 베스트셀러 조인 확인
SELECT title, author FROM books
    LEFT JOIN bookgenre ON books.id = bookgenre.book_id
    LEFT JOIN genre ON genre.id = bookgenre.genre_id
    WHERE books.bestseller IS TRUE;

-- 추천 책 조인 확인
SELECT nickname, books.title, books.author, contents FROM recobook
    LEFT JOIN books ON books.id = recobook.book_id
    WHERE books.bestseller IS FALSE;