import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Notebox() {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [point, setPoint] = useState(0);
    const [comments, setComments] = useState('');
    const [surveys, setSurveys] = useState([]);

    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        // localStorage에 저장된 JWT를 가져옴
        // locasStorage에 JWT가 저장되어 있지 않으면, /login 경로로 이동
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return
        }

        // JWT를 디코딩하여 서용자 정보를 추출
        setUserData(JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('token').split('.')[1]))))
        );

        // JWT가 포함된 GET 요청을 보내고, 응답으로 받은 데이터를 처리
        fetch(`list?token=${localStorage.getItem("token")}`).then(
            
            // 응답 본문을 JSON 형식으로 파싱, 응답 데이터 처리
            (res) => res.json()
        ).then((data) => {
            if (data.err) {
                localStorage.removeItem('token');
                navigate("/login");
            }
            console.log(data);

            //데이터 저장
            setSurveys(data);
        })

        // point API에 대한 GET 요청을 보냄
        // JWT를 가져워서 쿼리 파라미터 추가
        fetch(`point?token=${localStorage.getItem("token")}`).then(
            (res) => res.json()
        ).then((data) => {
            if (data.err) {
                localStorage.removeItem('token');
                navigate("/login");
            }
            console.log(data.point);
            setPoint(data.point);
        })
    }, [])

    
    //사용자가 로그인 폼에서 이메일과 비밀번호를 제출할 때 호출
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e);

        const newSurvey = {
            token: localStorage.getItem("token"),
            title: title,
            link: link,
            comments: comments,
        };
        console.log(JSON.stringify(newSurvey));

        // 서버에 새로운 설문지 추가, 응답으로 생성된 설문지 id를 클라이언트에 전달
        fetch('community/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSurvey),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.err) {
                    return alert("sumbit failed : " + data.err_msg);
                }

                console.log(data._id);

                // 배열에 새로운 설문지 정보를 추가
                setSurveys([...surveys, { ...newSurvey, user: userData.email, _id: data._id }]);

                // 설문 조사지 정보 입력 폼 초기화
                setTitle('');
                setLink('');
                setComments('');

                // point API에 대한 GET 요청을 보내고, JWT를 포함
                // 서버에서 현재 사용자의 포인트 정보를 가져옴
                fetch(`point?token=${localStorage.getItem("token")}`).then(
                    (res) => res.json()
                ).then((data) => {
                    if (data.err) {
                        localStorage.removeItem('token');
                        navigate("/login");
                    }
                    console.log(data.point);
                    setPoint(data.point);
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };


    // 설문지를 삭제하는 기능
    const handleDelete = (id) => {

        // 해당 id를 가진 설문지를 배열에서 제외한 새로운 배열 생성
        const filteredSurveys = surveys.filter((survey) => survey._id !== id);

        // 새로운 배열 저장, 업데이트
        setSurveys(filteredSurveys);

        // JWT 유효성 확인, 해당 id를 가진 설문지 삭제
        fetch('delete', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id, token: localStorage.getItem("token") }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mx-auto my-10 p-6">
            <h1 className="text-4xl font-bold mb-4">Share your Google Form link<span className='text-xl fond-bold ml-4'>(Point : {point.toLocaleString()})</span></h1>
            <form onSubmit={handleSubmit}>
                <ul className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            className="border border-gray-400 rounded py-1 px-2 w-full mb-2"
                        />
                        <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
                            Link
                        </label>
                        <input
                            type="text"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            name="link"
                            className="border border-gray-400 rounded py-1 px-2 w-full mb-2"
                        />
                        <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">
                            Comments
                        </label>
                        <textarea
                            id="comments"
                            name="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="border border-gray-400 rounded py-1 px-2 w-full h-24 resize-none"
                        />
                    </div>

                </ul>

                <button
                    type="button"
                    className="bg-red-500 text-white rounded py-2 px-4 mr-4"
                    onClick={() => {
                        setTitle('')
                        setLink('')
                        setComments('')

                    }}
                >
                    Cancel
                </button>

                <button type="submit" className="bg-green-500 text-white rounded py-2 px-4">
                    Save
                </button>

            </form>

            <ul id="surveyList" className="mt-8">
                {surveys.map((survey) => (
                    <li key={survey._id} className="border border-gray-400 rounded p-4 flex justify-between items-center">
                        <div className="flex-grow">
                            <h2 className="text-lg font-bold mb-2">
                                {survey.title}
                            </h2>

                            {/* 설문지 링크 연결 하이퍼링크 생성 */}
                            <a href={`/page?id=${survey._id}&url=${survey.link}&token=${localStorage.getItem("token")}`} className="text-blue-500 hover:text-blue-700">
                                {survey.link}
                            </a>
                            <div className="mt-2">
                                <span className="text-gray-700">Comments: </span>
                                <a href={survey.comments} className="text-black hover:text-gray-500">
                                    {survey.comments}
                                </a>
                            </div>

                        </div>
                        {survey.user === userData.email &&
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(survey._id)}
                            >
                                Delete
                            </button>}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Notebox;