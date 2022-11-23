import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
//import "../styles/globals.css";
//추가적으로 css파일을 임포트 하고 싶다면 반드시 _app.js에 임포트 시켜야 한다.
//만약 다른 pages에 컴포넌트 파일에 임포트하면 app컴포넌트만 하라고 에러가 뜬다.
//컴포넌트 파일내에서 임포트는 반드시 component.module.css만 된다는 뜻

export default function App({Component, pageProps}) { //_app.js는 모든 pages컴포넌트의 가장 베이스인 블루스크린과 같다.
    return(
        <Layout>
            <NavBar/>
            <Component {...pageProps}/>
            {/* NavBar를 가장 위에 먼저 실행해주고 Component는 받아온 컴포넌트이고 pageProps는 모든 pages내의 컴포넌트이다. */}

            {/* global 속성을 넣어주면 전역에 적용된다. global속성을 적용시키기 가장 적합한 컴포넌트는 _app.js다 */}
            <style jsx global>
                {`
a {
color: white;
}
                `}
            </style>
        </Layout>
    )
}