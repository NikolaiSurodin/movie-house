export const endpoints = {
  me: {
    token: '/authentication/token/new',
    login: '/authentication/token/validate_with_login',
    session: '/authentication/session/new',
    account: '/account?&session_id={:session_id}',
    me: '/account/{:id}',
  },
  cinema: {
    list: 'discover/{:key}',
    item: '/{:key}/{:id}?append_to_response=credits',
    getSearchFilm: '/search/multi',
    recommendations: '/{:key}/{:id}/recommendations',
    credits: '/{:key}/{:id}/credits',
    certifications: '/certification/{:key}/list',
    genres: '/genre/{:key}/list',
    keyWords: '/search/keyword',
    searchFilms: '/search/{:key}',
    trailers: '/{:key}/{:id}/videos',
    getPopularFilmList: '/{:key}/popular?language=en-US&page=1',
    similarFilmList: '/{:key}/{:id}/similar',
    getListByGenre: '/discover/{:key}?with_genres={genres}&page=1',
    likeFilm: '/account/{:account_id}/favorite?session_id={:session_id}',
    favoriteList: '/account/{:id}/favorite/{:key}',
    nowPlaying: '/{:key}/now_playing',
    popular: '/{:key}/popular',
    top: '/{:key}/top_rated',
    upcoming: '/{:key}/upcoming',
    addToFavorite: '/account/{:account_id}/favorite?session_id={:session_id}',
    reviews: '/{:key}/{:id}/reviews',
    images: '/{:key}/{:id}/images?include_image_language=en',
  },
  tv: {
    season: '/tv/{:series_id}/season/{:season_number}'
  },
  person: {
    list: '/person/popular',
    item: '/person/{:id}',
    images: '/person/{:id}/images',
    credits: '/person/{:id}/{:key}_credits',
    social: '/person/{:id}/external_ids',
  }
}