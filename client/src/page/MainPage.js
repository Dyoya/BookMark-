const MainPage = () => {
  return (
    <div>
        <h1>
           북 뱅크!
        </h1>
		<h3>20190348 김형민</h3>
		<div className="container">
		    <div className="box">
				<h2> 베스트셀러 목록 </h2> <h2> </h2>
				<img src={process.env.PUBLIC_URL + `/images/1.jpg`} alt="이미지" width="400" height="500" />
				<h3> 2022년 연간 베스트셀러 TOP 40!</h3>
				<a href="/best"><button>이동</button></a>
			</div>

			<div className="box">
				<h2> 유저 추천 목록 </h2> <h2> </h2>
				<img src={process.env.PUBLIC_URL + `/images/2.jpg`} alt="이미지" />
				<h3> 유저들이 직접 추천하는 책 목록! </h3>
				<a href="/recommend"><button>이동</button></a>
			</div>
		</div>
	</div>
  )
}

export default MainPage