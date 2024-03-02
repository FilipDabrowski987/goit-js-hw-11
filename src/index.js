import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[type="text"][name="searchQuery"]');
//const button = form.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const emptyGallery = document.querySelector('.empty-gallery');

async function fetchImages() {
    const searchParams = new URLSearchParams({
        key: '42664438-fd58fde2f94660d61e5943804',
        q: input.value.split(' ').join('+'),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });

    try {
        // axios.defaults.headers.common["x-api-key"] = '42664438-fd58fde2f94660d61e5943804';
        const response = await axios
            .get(`https://pixabay.com/api/?${searchParams}`);
        
        const images = response.data.hits.map(image => ({
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
            likes: image.likes,
            views: image.views,
            comments: image.comments,
            downloads: image.downloads,
        }));

        gallery.innerHTML = '';
        const imageCard = images.map(image => `
        <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b><br> ${image.likes}</p>
          <p class="info-item"><b>Views:</b><br> ${image.views}</p>
          <p class="info-item"><b>Comments:</b><br> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b><br> ${image.downloads}</p>
        </div>
      </div>
        `);
        gallery.insertAdjacentHTML('beforeend', imageCard.join(''));

    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
        fetchImages()
        //.then(data => renderSelect(data))
        //.catch(showError);
    } catch (error) {
        console.error(error);
    }
});


//function showError(errorMessage) {
  //console.error(errorMessage);
  //error.classList.remove('hidden');
  //loader.classList.add('hidden');
//};