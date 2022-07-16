import { Provider } from "react-redux";
import Layout from "../components/Layout";
import store from "../redux/store";
import { GlobalStyle } from "../styles/globalstyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
