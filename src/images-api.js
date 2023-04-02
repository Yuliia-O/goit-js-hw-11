// const axios = require('axios');
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34999342-3ac7b6b39d9c6b3fab49f4668';

export async function getImage(image, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${image}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return response.data;
}
