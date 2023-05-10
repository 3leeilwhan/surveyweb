import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: null, password: null });

    // Hook을 사용하여, 컴포넌트가 렌더링되면 실행
    useEffect(() => {
        if (localStorage.getItem('token'))
            navigate("/community")
    }, [])

    // 로그인 폼에서 입력한 이메일과 패스워드를 서버로 전송, 로그인 기능
    // 이메일 주소의 유효성 검사
    // 패스워드 필드가 비어있지 않은지 확인
    // 이메일과 패스워드가 모두 유효하다면, 해덩 정보를 서버로 배내 로그인을 시도
    // 서버로부터 전달받은 JWT 토큰을 로컬 스토리지에 저장하고 commutiy페이지로 이동
    const handleSubmit = (e) => {
        e.preventDefault();
        let email_regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        let update_errors = {};
        if (email.length < 1) {
            update_errors = { ...update_errors, email: { message: "This field is required" } }
        } else if (!email_regex.test(email)) {
            update_errors = { ...update_errors, email: { message: "Invalid email address" } }
        } else {
            update_errors = { ...update_errors, email: null }
        }

        if (password.length < 1) {
            update_errors = { ...update_errors, password: { message: "This field is required" } }
        }
        else {
            update_errors = { ...update_errors, password: null }
        }

        setErrors(update_errors);
        if (update_errors.email || update_errors.password)
            return;


        const user = {
            email, password
        };

        // user 객체를 JSON 문자열로 변환
        console.log(JSON.stringify(user));
        fetch('login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.err) {
                    return alert("Login Failed : " + data.err_msg)
                }
                console.log(data.token);
                localStorage.setItem('token', data.token);
                navigate('/community');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="bg-blue-100 min-h-screen">
        <Navbar />
        <div className="text-center text-purple-300 text-6xl font-bold my-10">
            Survey Map
        </div>
        <div className="max-w-md mx-auto px-6 py-8 rounded-md bg-white shadow-md">
            <h2 className="text-center text-2xl font-bold mb-8">
            Sign in to your account
            </h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
                >
                Email
                </label>
                <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${
                    errors.email ? 'border-red-500' : 'border-gray-400'
                } appearance-none border-2 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                />
                {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                </span>
                )}
            </div>
            <div className="mb-6">
                <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
                >
                Password
                </label>
                <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                    errors.password ? 'border-red-500' : 'border-gray-400'
                } appearance-none border-2 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                />
                {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                </span>
                )}
            </div>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md">
                Sign in
            </button>
            <div className="text-center mt-4">
                Don't have an account?{' '}
                <Link
                to="/join"
                className="text-blue-500 font-bold hover:text-blue-700"
                >
                Sign up
                </Link>
            </div>
            </form>
        </div>
        </div>
    );
}

export default Login;
