import axios from 'axios'
import '../App.css'

const EXPRESS_URL = 'https://dbhw20190348.run.goorm.site';

function AddRecommend() {
  const handleSubmit = async () => {
	//작성한 정보 가져오기
	const nickname = document.getElementById("nickname").value;
	const title = document.getElementById("title").value;
    const authorName = document.getElementById("authorName").value;
    const content = document.getElementById("content").value;
    const password = document.getElementById("password").value;
	
	//비밀번호 숫자 외의 문자가 있는지 검사
	const nonDigit = /[^0-9]/;
    if (nonDigit.test(password)) {
    	alert("비밀번호에는 숫자만 입력해주세요.");
    	return;
    }
	
	//비어있는 내용이 있는지 검사
    if (!nickname || !title || !authorName || !content || !password) {
        alert("모든 내용을 작성해주세요.");
        return;
    }

    try {
	  //작성한 내용 POST
      await axios.post(EXPRESS_URL + '/book/recommend/insert', {
        nickname,
		title,
        authorName,
        content,
        password
      });
      window.location.href = "/recommend";
    } catch (error) {
      console.error('Error:', error);
      alert("데이터베이스에 삽입하는 중 오류가 발생했습니다.");
    }
  };
  
  return (
		<div className="addContainer">
			<h1>책 정보 입력 페이지</h1><h3>20190348 김형민</h3>
			<div className="addBox">
				<div className="addForm-group">
					<label for="nickname">닉네임: </label>
					<input type="text" id="nickname" name="nickname" required></input>
				</div>
				<div className="addForm-group">
					<label for="title">책 이름: </label>
					<input type="text" id="title" name="title" required></input>
				</div>
				<div className="addForm-group">
					<label for="authorName">작가 이름: </label>
					<input type="text" id="authorName" name="authorName" required></input>
				</div>
				<div className="addForm-group">
					<label for="content">내용: </label>
					<textarea id="content" name="content" required></textarea>
				</div>
				<div className="addForm-group">
					<label for="password">비밀번호: </label>
					<input type="password" id="password" name="password" required></input>
				</div>
			</div>
			<h2> </h2>
			<div className="addForm-group">
				<a href="/recommend"> <button onClick={handleSubmit} style={{ width: '100px', height: '50px'}}>완료</button> </a>
				<h2>　　</h2>
				<a href="/recommend"><button style={{ width: '100px', height: '50px'}}>취소</button> </a>
		    </div>
		</div>
  )
}
export default AddRecommend;