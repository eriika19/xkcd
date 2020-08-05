import { axios } from 'utils';

const getComic = async num => {
  const param = num ? num : 'latest';
  return await axios.get(`/?comic=${param}`);
};

export default getComic;
