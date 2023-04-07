import { getImage } from './images-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const inputEl = document.querySelector('[placeholder="Search images..."]');
const loadBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadClick);

let searchedImg = '';
let pageCount = 2;

async function onFormSubmit(e) {
  e.preventDefault();

  if (searchedImg === inputEl.value) {
    return;
  } else {
    pageCount = 2;
  }

  searchedImg = inputEl.value;
  galleryEl.innerHTML = '';

  const response = await getImage(inputEl.value, 1);
  const images = response.hits;

  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderCards(images);
  loadBtn.style.display = 'block';
}

async function onLoadClick() {
  const data = await getImage(searchedImg, pageCount);
  const images = data.hits;

  renderCards(images);

  pageCount += 1;
}

function renderCards(images) {
  const imageCardMarkup = images
    .map(
      image =>
        `<div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${image.downloads}
        </p>
      </div>
    </div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup);
}
