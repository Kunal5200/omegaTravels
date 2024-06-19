import Layout from "@/components/layout";
import store from "@/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import Modal from "@/components/modal";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Modal />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
