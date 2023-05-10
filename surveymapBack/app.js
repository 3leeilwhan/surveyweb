const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
var crypto = require("crypto");

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "860457fa7a5bf4112eec40abc0a72d7088ef858f";

const bodyParser = require('body-parser');
const Mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
app.use(express.json())

// mongoDB 연결
MongoClient.connect('mongodb+srv://3leeilwhan:2022@cluster0.ujqiv8z.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
    console.log('mongoDB connected');
    if (err) {
        return console.log(err);
    }

    var db;
    db = client.db('surveymap');


    // community/add 앤드포인트에 대한 POST 요청을 처리하는 함수
    app.post("/community/add", function (req, res) {

        // 클라이언트가 전송한 폼 데이터인 req.body에서 title, link, comments, token 정보를 추출
        let { title, link, comments, token } = req.body;
        if (token.split('.').length !== 3) {
            return res.json({ err: true, err_msg: "No Token" })
        }

        // 토큰이 유효한지 확인
        if (!jwt.verify(token, JWT_SECRET_KEY)) {
            return res.json({ err: true, err_msg: "Invalid Account" })
        }

        const user = jwt.decode(token);
        console.log(title);
        console.log(link);
        console.log(comments);

        db.collection('user').findOne({ email: user.email }, function (err, result) {

            // 사용자의 포인트가 10포인트를 넘지 않으면 error 메시지
            if (result.point < 10) {
                return res.json({ err: true, err_msg: "a submit is need 10 points" })
            }

            // 포인트를 10포인트 차감한 후, post 컬렉션에 게시글 정보 저장
            db.collection('user').update({ email: user.email }, { "$inc": { "point": -10 } }, function (err, result) {
                db.collection('post').insertOne({ user: user.email, title, link, comments }, function (err, result) {
                    console.log('저장완료');
                    console.log(result.ops[0])
                    return res.json({ _id: result.ops[0]._id });
                });
            })
        });

    });
    app.post('/login', function (req, res) {
        let { email, password } = req.body;

        // crypto를 사용하여 사용자의 비밀번호를 해싱
        const user = {
            email,
            password: crypto.createHash("sha512").update(password).digest('base64')
        };

        db.collection('user').findOne(user, function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ err: true, err_msg: "server error" });
            }
            if (!result) {
                return res.json({ err: true, err_msg: "No User" })
            }
            console.log(result);
            const user = { email: result.email };
            const token = jwt.sign(user, JWT_SECRET_KEY, {
                algorithm: "HS256",
            });
            return res.json({ token });
        });
    });
    app.post('/signup', function (req, res) {
        let { email, password } = req.body;

        db.collection('user').findOne({ email }, function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ err: true, err_msg: "server error" });
            }
            if (result) {
                return res.json({ err: true, err_msg: "this email already exists" })
            }
            const user = {
                email,
                password: crypto.createHash("sha512").update(password).digest('base64'),
                point: 0,
            };
            db.collection('user').insertOne(user, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.json({ err: true, err_msg: "server error" });
                }
                console.log('가입 완료');
                console.log(result.ops[0])
                const token = jwt.sign({ email }, JWT_SECRET_KEY, {
                    algorithm: "HS256",
                });
                console.log(token);
                return res.json({ token });
            });
        });

    })


    // list 앤드포인트에 대한 GET 요청을 처리하는 함수
    app.get('/list', function (req, res) {

        // token 정보 추출, 클라이언트가 URL 쿼리 매개변수를 통해 전송한 JWT
        const { token } = req.query;
        if (token.split('.').length !== 3) {
            return res.json({ err: true, err_msg: "No Token" })
        }

        // token이 유효한지 확인
        if (!jwt.verify(token, JWT_SECRET_KEY)) {
            return res.json({ err: true, err_msg: "Invalid Account" })
        }
        db.collection('post').find().toArray(function (err, result) {
            console.log(result);
            return res.json(result);
        });
    });

    // point 앤드포인트에 대한 GET 요청을 처리하는 함수
    app.get('/point', function (req, res) {
        const { token } = req.query;
        if (token.split('.').length !== 3) {
            return res.json({ err: true, err_msg: "No Token" })
        }
        if (!jwt.verify(token, JWT_SECRET_KEY)) {
            return res.json({ err: true, err_msg: "Invalid Account" })
        }
        const user = jwt.decode(token);
        console.log(user);
        db.collection('user').findOne({ email: user.email }, function (err, result) {
            return res.json({ point: result.point });
        });
    });

    // page 앤드포인트에 대한 GET 요청을 처리하는 함수
    app.get('/page', function (req, res) {
        let { id, url, token } = req.query;
        if (!token) {
            return res.json({ err: true, err_msg: "No Token" })
        }
        if (!jwt.verify(token, JWT_SECRET_KEY)) {
            return res.json({ err: true, err_msg: "Invalid Account" })
        }
        const user = jwt.decode(token);
        console.log(url);

        // 설문 조사를 완료한 경우 보상을 지급하는 함수
        // 이미 해당 설문 조사에 대한 보상을 받았는지 확인, 이미 보상을 받은 경우, 이전 페이지로 리디렉션
        db.collection('reward').findOne({ user: user.email, survey: Mongodb.ObjectId(id) }, function (err, result) {
            if (result) {
                return res.redirect(url);
            }
            console.log(result);
            db.collection('reward').insertOne({ user: user.email, survey: Mongodb.ObjectId(id) }, function (err, result) {

                // 사용자의 포인트를 1 증가
                db.collection('user').update({ email: user.email }, { "$inc": { "point": 1 } }, function (err, result) {
                    if (result) {
                        return res.redirect(url);
                    }
                })

            })
        })

    })

    // post 앤드포인트에 대한 GET 요청을 처리하는 함수
    app.post('/delete', function (req, res) {
        let { _id, token } = req.body;
        if (!token) {
            return res.json({ err: true, err_msg: "No Token" })
        }
        if (!jwt.verify(token, JWT_SECRET_KEY)) {
            return res.json({ err: true, err_msg: "Invalid Account" })
        }
        const user = jwt.decode(token);
        console.log(_id);
        db.collection('post').findOne({ _id: Mongodb.ObjectId(_id) }, function (err, result) {
            if (!result) {
                return;
            }
            if (result.user === user.email) {
                db.collection('post').deleteOne({ _id: Mongodb.ObjectId(_id) }, function (err, result) {
                    console.log("삭제");
                    return res.json({})
                })
            } else {
                return res.json({ err: true, error_msg: "no owner" })
            }

        })
    })

    // Node.js 애플리케이션을 3002번 포트에서 실행
    app.listen(3002, function () {
        console.log('listening on 3002')
    })

    // React 기반의 클라이언트 애플리케이션을 제공하는 코드

    // 정적 파일을 찾을 때 사용
    app.use(express.static(path.join(__dirname, '../surveymapFront/build')));

    // 클라이언트 애플리케이션의 루트 파일(index.html)을 반환함으로써, React 라우터가 클라이언트 측에서 동작하도록 함
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, '../surveymapFront/build/index.html'));
    })


})
