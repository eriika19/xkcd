import React from 'react';
import App from 'next/app';
// Bulma css
import 'bulma/css/bulma.min.css';
// Redux
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

// Configfuration for redux store
import configureStore from 'store/configureStore';
// Custom css
import 'styles/styles.css';
// Tab Titles
import { TAB_TITLES as titles } from 'utils';
import { Footer, Navbar, PageTab } from 'components';

class XkcdMark extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    const { Component, pageProps, router, store } = this.props;

    return (
      <React.Fragment>
        {/* <Provider store={store}> */}
        <PageTab title={titles[router.pathname]} />
        <Navbar active_route={router.pathname} />
        <Component {...pageProps} />
        <Footer />
        {/* </Provider> */}
      </React.Fragment>
    );
  }
}

export default XkcdMark;

// export default withRedux(configureStore)(withReduxSaga(XkcdMark));
