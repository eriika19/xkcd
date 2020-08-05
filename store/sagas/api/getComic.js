import { axios, API_BASE_URL_END } from 'utils';

const getComic = async num => {
  const url = num ? num + API_BASE_URL_END : API_BASE_URL_END;
  return await axios.get(url);
};

export default getComic;
