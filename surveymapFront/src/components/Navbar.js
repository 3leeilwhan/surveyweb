import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="nav sticky flex justify-between items-center top-0 h-9 bg-red-200">
            <div>
                <Link to="/" className="text-lg mx-5 text-red-400">Home</Link>
                <Link to="/community" className="text-lg mx-5 text-red-400">Community</Link>
            </div>

            {/* 로그아웃 버튼, JWT 삭제, 홈페이지로 이동 */}
            {localStorage.getItem('token') ? <button onClick={() => { localStorage.removeItem("token"); navigate('/') }} className="text-lg mx-5 text-red-400">Logout</button> :
                <button onClick={() => { navigate('/login') }} className="text-lg mx-5 text-red-400">Login</button>}
        </div>
    )
}
