# 설문조사 링크를 공유하는 웹페이지

## 개요
설문조사를 실시하는 사람을 설문조사 의뢰인이라고 하고, 설문조사에 응답하는 사람을 설문조사 참가인이라고 한다. 구글 폼 링크를 설문 조사 의뢰인과 참가인이 서로 공유하면, 참가인은 설문 조사에 쉽게 응답할 수 있고, 설문조사를 의뢰한 개인이나 단체는 설문조사에 대한 결과를 쉽고 빠르게 확인할 수 있다. 이런 구글 폼 링크를 설문조사 의뢰인과 참가인이 서로 공유할 수 있는 웹페이지를 구현해 보았다.

## 구현 기능
* 회원가입, 로그인, 로그아웃 기능
* 설문조사 링크 생성 기능
* 포인트 기능
    * 설문 조사를 의뢰할 때
        * 설문 조사를 의뢰하고자 구글 폼 링크를 웹페이지상에 공유하려면 10포인트가 필요함.
        * 10포인트가 없다면 구글 폼 링크를 공유하지 못 하도록 막아 놓음.
    * 설문 조사에 참가할 때
        * 설문 조사에 참가하기 위해 구글 폼 링크를 클릭할 경우, 1포인트를 획득함.
        * 구글 폼 링크를 두 번 이상 클릭 시, 포인트가 올라가지 않도록 함.
* 자신이 공유한 설문 조사 링크 외의 다른 유저가 공유한 설문 조사 링크는 삭제하지 못 하도록 막아 놓음.
------------

## front-end

### 사용기술
* react.js
* react-hook-form
* react-router-dom
* tailwind CSS

## back-end

### 사용기술
* node.js
* express.js
* mongoDB

----------

## 한계점

* 포인트 문제점
구글 폼 링크를 클릭하면 1포인트가 올라가는데, 이 때 사용자가 실제로 구글 폼 링크에 접속하여, 참여를 했는지에 대하여 알지 못 한다. 이 문제를 보완해 보려 했으나, 기술적인 문제로 인해 이를 보완하지 못 하였다.

































<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
