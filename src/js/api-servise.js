import axios from 'axios';
import './allgenres';

export const API_KEY = 'c789b950e94d6ea5adbb471c5a6ee143';
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMG_ARI = 'https://image.tmdb.org/t/p/w400';

export const MEDIA_TYPE = 'movie';
export const TIME_WINDOW = 'week';

export let PER_PAGE = 20;
export let page = 1;
export let pages = 1;

// query потім змінити на пусту строку, query = те, що ввів користува
export let query = 'avatar';
export let filmsTrending = [];
export let searchFilms = [];
// my_movie_id прибрати потім значення, має братися з розмітки при кліку
export let my_movie_id = 76600;

// Отримання популярних фільмів
export const FetchTrending = async () => {
  try {
    const responseTrending = await axios.get(
      `${API_URL}trending/${MEDIA_TYPE}/day?api_key=${API_KEY}`
    );
    if (responseTrending.status !== 200) {
      throw new Error(responseTrending.status);
    }
    filmsTrending = responseTrending.data.results;
    console.log(filmsTrending);
  } catch (error) {
    console.log(error.message);
  }
};
// запуск функції
// FetchTrending();

// Шукаємо фільми по ключовому слову:
export const FetchSearch = async q => {
  try {
    const responseSearch = await axios.get(
      `${API_URL}search/${MEDIA_TYPE}?api_key=${API_KEY}&query=${q}`
    );
    if (responseSearch.status !== 200) {
      throw new Error(responseSearch.status);
    }
    searchFilms = responseSearch.data.results;
    console.log(searchFilms);
  } catch (error) {
    console.log(error.message);
  }
};

// запуск функції
// FetchSearch(query);

// Шукаємо фільм по ID:
export const FetchFilmID = async movie_id => {
  try {
    const responseFetchFilmID = await axios.get(
      `${API_URL}${MEDIA_TYPE}/${movie_id}?api_key=${API_KEY}`
    );
    if (responseFetchFilmID.status !== 200) {
      throw new Error(responseFetchFilmID.status);
    }
    const MyFilmID = responseFetchFilmID.data;
    console.log(MyFilmID);
  } catch (error) {
    console.log(error.message);
  }
};
// запуск функції
// FetchFilmID(my_movie_id);

// опредеоение жанра фильма
let filmsTrendingIdGenres = [];
let mygenres = [];

for (let i = 0; i < filmsTrendingIdGenres.length; i++) {
  for (let index = 0; index < allgenres.length; index++) {
    if (allgenres[index].id === filmsTrendingIdGenres[i]) {
      mygenres.push(allgenres[index].name);
    }
  }
}
console.log(mygenres);
