import { useState, useEffect } from 'react';
import axios from 'axios';

const EXPRESS_URL = 'https://dbhw20190348.run.goorm.site';

function Best() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    (async () => {
      const res = await axios.get(EXPRESS_URL + '/book/main');
      setItems(res.data);
      setFilteredItems(res.data); //필터링된 책 목록 설정
		
	  //작가, 장르 목록 설정 (중복 X)
      setAuthors([...new Set(res.data.map(book => book.author))]);
      setGenres([...new Set(res.data.map(book => book.name))]);
    })();
  }, []);
  
  //필터링 처리
  useEffect(() => {
    const filterBooks = () => {
      let newFilteredItems = [...items];
	  
	  //선택된 작가가 있으면, 작가 필터링
      if (selectedAuthor !== 'all') {
        newFilteredItems = newFilteredItems.filter(book => book.author === selectedAuthor);
      }
	  //선택된 장르가 있으면, 장르 필터링
      if (selectedGenre !== 'all') {
        newFilteredItems = newFilteredItems.filter(book => book.name === selectedGenre);
      }

      setFilteredItems(newFilteredItems);
    };
    filterBooks();
  }, [selectedAuthor, selectedGenre, items]);

  //이벤트 처리
  const onAuthorChange = event => {
    setSelectedAuthor(event.target.value);
  };

  const onGenreChange = event => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
	  <h1>2022년 연간 베스트셀러 TOP 40</h1><h3>20190348 김형민</h3>
      <div>
		{/* 메인화면으로 버튼 */}
		<a href="./"><button style={{ width: '100px', height: '50px', backgroundColor: 'white' }}> 메인으로</button></a>
        {/* 선택 박스 */}
		<label>
          작가:
          <select value={selectedAuthor} onChange={onAuthorChange}>
            <option value="all">모두 보기</option>
            {authors.map((author, i) => (
              <option key={i} value={author}>
                {author}
              </option>
            ))}
          </select>
        </label>
        <label>
          장르:
          <select value={selectedGenre} onChange={onGenreChange}>
            <option value="all">모두 보기</option>
            {genres.map((genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* 데이터 테이블 */}
      <table>
        <thead>
          <tr>
            <th>이미지</th><th>책 이름</th><th>작가</th><th>장르</th><th>출판일</th><th>평점(9.x)</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((book, i) => (
            <tr key={i}>
              {book.rating == null ? (
                <td />
              ) : (
                <td> {/* id에 따른 이미지 추가, 교보문고 하이퍼 링크 추가 */}
                  <a
                    href={`https://search.kyobobook.co.kr/search?keyword=${book.title}&gbCode=TOT&target=total`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={process.env.PUBLIC_URL + `/images/${book.id}.jpg`} alt="이미지" />
                  </a>
                </td>
              )}
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.name}</td>
              <td>{book.publication_date}</td>
              <td>{book.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Best;
