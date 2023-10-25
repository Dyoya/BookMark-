import { useState, useEffect } from 'react'
import axios from 'axios'

const EXPRESS_URL = 'https://dbhw20190348.run.goorm.site';

function Recommend() {
  const [items, setItem] = useState([])
	
  useEffect(() => {
    (async () => {
      const res = await axios.get(EXPRESS_URL + '/book/recommend')
      setItem(res.data)
    })()
  }, [])

//삭제 버튼 이벤트 처리
const handleDeleteButtonClick = async(id) => {
  const password = prompt("설정한 비밀번호를 입력하세요", "0000");
  try {
	//id와 비밀번호를 express에 전달
    const result = await axios.post(EXPRESS_URL + '/book/recommend/delete', {
      id,
      password
    });
	
	//응답이 success면 성공, 화면 갱신
    if (result.data.result === 'success') {
      const res = await axios.get(EXPRESS_URL + '/book/recommend');
      setItem(res.data);
    } 
	//응답 메세지가 passwordError면 비밀번호 오류 팝업 출력
	else if (result.data.result === 'passwordError') {
      alert('비밀번호가 틀렸습니다.');
    } 
	//나머지 응답 메세지
	else {
      alert('삭제 중 오류가 발생했습니다.');
    }
  } catch (error) { //예외 처리
    console.error('Error:', error);
    alert('삭제 중 오류가 발생했습니다.');
  }
}

  return (
	<div>
		<h1>유저 추천 목록</h1> <h3>20190348 김형민</h3>
		{/*메인화면 이동 버튼*/}
		<a href="./"><button style={{ width: '100px', height: '50px', backgroundColor: 'white' }}> 메인으로</button></a>
		{/*추천 책 등록 화면 이동 버튼*/}
		<a href="./recommend/add"><button style={{ width: '100px', height: '50px', backgroundColor: 'skyblue' }}>등록</button></a>
		<table>
		  <thead>
			<tr><th>닉네임</th><th>책 제목</th><th>작가</th><th>추천 내용</th><th>이동</th><th>삭제</th></tr>
		  </thead>
		  <tbody>
			{ items.map( (book, i) => <tr key={i}>
				<td>{book.nickname}</td>
				<td>{book.title}</td>
				<td>{book.author}</td>
				<td>{book.contents}</td>
				{/*교보문고 이동 버튼*/}
				<td>
				<a href={`https://search.kyobobook.co.kr/search?keyword=${book.title}&gbCode=TOT&target=total`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <button style={{ backgroundColor: 'blue', color: 'white' }}>교보문고 이동</button> </a>
				</td>
				{/*삭제 버튼, 이벤트 실행*/}
				<td><button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteButtonClick(book.id)}>삭제</button></td>
				</tr>) }
		  </tbody>
		</table>
	</div>
  )
}

export default Recommend;

