import axios from 'axios';
import Notiflix from 'notiflix';
//import SimpleLightbox from "simplelightbox";

const form = document.querySelector('#search-form');
const input = form.querySelector('input[type="text"][name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

let currentPage = 1;
let currentQuery = '';

async function fetchImages() {
    const searchParams = new URLSearchParams({
        key: '42664438-fd58fde2f94660d61e5943804',
        q: currentQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: 40,
    });

    try {
        const response = await axios
            .get(`https://pixabay.com/api/?${searchParams}`);
        
        const totalHits = response.data.totalHits;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        
        const images = response.data.hits.map(image => ({
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
            likes: image.likes,
            views: image.views,
            comments: image.comments,
            downloads: image.downloads,
        }));

        if (images.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            loadMoreButton.classList.add('hidden');
        } else {
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
        currentPage++;
        if (response.data.totalHits <= currentPage * per_page) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            loadMoreButton.classList.add('hidden');
    }
        }
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Notiflix.Notify.success("Hooray! We found ${totalHits} images.");
    gallery.innerHTML = '';
    loadMoreButton.classList.remove('hidden');
    currentPage = 1;
    currentQuery = input.value.split(' ').join('+');
    try {
        fetchImages()
    } catch (error) {
        console.error(error);
    }
});

loadMoreButton.addEventListener('click', fetchImages);

//const lightbox = new SimpleLightbox('.gallery a', {
        //captions: true,
        //captionType: 'attr',
        //captionsData: 'alt',
        //captionPosition: 'bottom',
        //captionDelay: 250,
    //});