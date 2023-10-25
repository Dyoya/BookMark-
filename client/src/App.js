import './App.css'
import MainPage from './page/MainPage'
import Best from './page/Best'
import Recommend from './page/Recommend'
import AddRecommend from './page/AddRecommend'
import { Routes, Route, BrowserRouter } from "react-router-dom";

//리액트 라우터 사용
const App = () => {
  return (
	<BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/best" element={<Best />} />
        <Route path="/recommend" element={<Recommend />} />
		<Route path="/recommend/add" element={<AddRecommend />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App