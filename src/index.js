import { getImage } from './images-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const inputEl = document.querySelector('[placeholder="Search images..."]');
const loadBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadClick);

let searchedImg = '';
let pageCount = 1;

async function onFormSubmit(e) {
  e.preventDefault();

  searchVal = inputEl.value;

  if (searchedImg !== searchVal) {
    searchedImg = searchVal;
    pageCount = 1;
    galleryEl.innerHTML = '';
  }

  const data = await getImage(searchVal, pageCount);
  const images = data.hits;

  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderCards(images);
  loadBtn.style.display = 'block';
  pageCount += 1;
}

async function onLoadClick() {
  const data = await getImage(searchVal, pageCount);
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
