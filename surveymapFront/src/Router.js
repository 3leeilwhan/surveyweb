// React Router를 사용하여, URL 경로에 따라 다른 컴포넌트를 렌더링하는 라우팅 기능을 구현

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Community from './pages/Community';
import Login from './pages/Login';
import Join from './pages/Join';

function Router() {
    return (
        <Routes>
            <Route path = "/" element = {<Home />}/>
            <Route path = "/community" element={<Community />}/>
            <Route path="/join" element={<Join />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    )
}

export default Router;