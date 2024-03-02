import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[type="text"][name="searchQuery"]');
const button = form.querySelector('button[type="submit"]');

//const qInput = input.value;

async function fetchImages() {
    const searchParams = new URLSearchParams({
        _key: '42664438-fd58fde2f94660d61e5943804',
        _q: input.value.split(' ').join('+'),
        _image_type: 'photo',
        _orientation: 'horizontal',
        _safesearch: 'true',
    });
       // axios.defaults.headers.common["x-api-key"] = '42664438-fd58fde2f94660d61e5943804';
        return axios
        .get(`https://pixabay.com/api/?key=42664438-fd58fde2f94660d61e5943804`)
        .then(response => response.data)
        .then(console.log('obraz'))
        .then(console.log(searchParams));
};

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