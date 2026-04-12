const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Função auxiliar para extrair a classificação indicativa corretamente
const getClassification = (json, type) => {
  if (type === 'movie') {
    const release = json.release_dates?.results.find(r => r.iso_3166_1 === 'BR') || json.release_dates?.results[0];
    return release?.release_dates[0]?.certification || 'N/A';
  } else {
    const rating = json.content_ratings?.results.find(r => r.iso_3166_1 === 'BR') || json.content_ratings?.results[0];
    return rating?.rating || 'N/A';
  }
};

const getContentDetails = async (id, mediaType) => {
  const type = mediaType === 'tv' ? 'tv' : 'movie';
  const append = type === 'movie' ? 'release_dates' : 'content_ratings';
  
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=${append}&language=pt-BR`);
  const json = await res.json();

  return {
    id: json.id,
    title: json.title || json.name,
    poster: json.poster_path,
    overview: json.overview || 'Sem descrição disponível.',
    rating: json.vote_average || 0,
    genres: json.genres?.map(g => g.name).slice(0, 2).join(', ') || 'N/A',
    classification: getClassification(json, type),
    mediaType: type
  };
};

export const searchAnimations = async (query) => {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&language=pt-BR`);
  const json = await res.json();

  const results = json.results
    .filter(item => item.media_type !== 'person')
    .slice(0, 10);
  
  const detailedData = await Promise.all(
    results.map(item => getContentDetails(item.id, item.media_type))
  );

  return detailedData.filter(item => 
    item.genres.toLowerCase().includes('animação') || 
    item.genres.toLowerCase().includes('animation')
  );
};