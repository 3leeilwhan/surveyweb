import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

function Join() {
    useEffect(() => {
        localStorage.removeItem("token");
    }, [])

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ email: null, password: null, password_confirmation: null });

    // 회원가입 폼에서 submit 버튼을 클릭했을 때 실행
    // 유효성 검사 진행 후 서버에 회원가입 요청을 보냄
    // 응답으로 받은 토큰을 로컬스토리지에 저장하고 커뮤니티 페이지로 이동
    // 이메일과 비밀번호의 유효성 검사 진행
    // 유효성 검사에 실패한 경우 오류 메시지 출력
    const handleSubmit = (e) => {
        e.preventDefault();

        // 이메일 주소의 유효성을 검사하기 위한 정규표현식
        let email_regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        console.log(email.length + " sadasd " + password.length)
        let update_errors = {};

        // 이메일 주소의 유효성을 검사
        if (email.length < 1) {
            update_errors = { ...update_errors, email: { message: "This field is required" } }
        } else if (!email_regex.test(email)) {
            update_errors = { ...update_errors, email: { message: "Invalid email address" } }
        } else {
            update_errors = { ...update_errors, email: null }
        }

        // 비밀번호의 유효성을 검사
        if (password.length < 1) {
            update_errors = { ...update_errors, password: { message: "This field is required" } }
        }
        else if (password.length < 6) {
            update_errors = { ...update_errors, password: { message: "Password must be at least 6 characters" } }
        }
        else {
            update_errors = { ...update_errors, password: null }
        }

        // 회원가입 페이지에서 입력받은 비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러 메시지 업데이트
        if (confirmPassword.length < 1) {
            update_errors = { ...update_errors, password_confirmation: { message: "This field is required" } }
        }
        else if (confirmPassword !== password) {
            update_errors = { ...update_errors, password_confirmation: { message: "Passwords do not match" } }
        }
        else {
            update_errors = { ...update_errors, password_confirmation: null }
        }

        // 이메일, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사
        setErrors(update_errors);
        if (update_errors.email || update_errors.password || update_errors.password_confirmation)
            return;


        const user = {
            email, password
        };
        console.log(JSON.stringify(user));

        // 회원가입 처리, 서버에 데이터를 저장하고 서버에서 응답 받아 처리
        // 회원가입 성공 시, data.token을 localStorage에 저장하고 community 페이지로 이동
        // 회원가입 실패 시, 실패 메시지를 출력
        fetch('signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.err) {
                    return alert("SignUp Failed : " + data.err_msg)
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
                    Create an account
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
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className={`${errors.email ? 'border-red-500' : 'border-gray-400'
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            className={`${errors.password ? 'border-red-500' : 'border-gray-400'
                                } appearance-none border-2 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Confirm password
                        </label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="password_confirmation"
                            type="password"
                            className={`${errors.password_confirmation
                                ? 'border-red-500'
                                : 'border-gray-400'

                                } appearance-none border-2 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                        />
                        {errors.password_confirmation && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.password_confirmation.message}
                            </span>
                        )}
                    </div>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md">
                        Sign up
                    </button>
                    <div className="text-center mt-4">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-blue-500 font-bold hover:text-blue-700"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Join;
