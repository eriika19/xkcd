import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

/**
 * PageTab is used to modify the current browser tab title
 *
 * @param {String} title Browser tab title
 * @param {String} favico Favico path including filename and extension
 */
const PageTab = ({ title, favico }) => (
  <Head>
    <title>{title}</title>
    <link rel='icon' favico={favico} />
  </Head>
);

PageTab.defaultProps = {
  title: 'XKCD',
  favico: '/favicon.ico',
};

PageTab.propTypes = {
  title: PropTypes.string,
  favico: PropTypes.string,
};

export default PageTab;
