import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[type="text"][name="searchQuery"]');
const button = form.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');

async function fetchImages() {
    const searchParams = new URLSearchParams({
        _key: '42664438-fd58fde2f94660d61e5943804',
        _q: input.value.split(' ').join('+'),
        _image_type: 'photo',
        _orientation: 'horizontal',
        _safesearch: 'true',
    });

    try {
        // axios.defaults.headers.common["x-api-key"] = '42664438-fd58fde2f94660d61e5943804';
        const response = await axios
            .get(`https://pixabay.com/api/?key=42664438-fd58fde2f94660d61e5943804&${searchParams}`);
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
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
        `);

        gallery.insertAdjacentHTML('beforeend', imageCard.join(''));
        //console.log(response.data);
        //console.log(searchParams);
        //.then(response => response.data)
        //.then(console.log(searchParams))
        //.then(console.log(response.data));
        //console.log(images);
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


//<div class="photo-card">
  //<img src="" alt="" loading="lazy" />
  //<div class="info">
    //<p class="info-item">
      //<b>Likes</b>
    //</p>
    //<p class="info-item">
      //<b>Views</b>
    //</p>
    //<p class="info-item">
      //<b>Comments</b>
    //</p>
    //<p class="info-item">
      //<b>Downloads</b>
    //</p>
  //</div>
//</div>