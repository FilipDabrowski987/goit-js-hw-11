import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[type="text"][name="searchQuery"]');
const button = form.querySelector('button[type="submit"]');

const fetchImages = () => { 
    axios.defaults.headers.common["x-api-key"] = '42664438-fd58fde2f94660d61e5943804';
    return axios
        .get(`https://pixabay.com/api/`)
        .then(response => response.data);
};