require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to fetch data
async function fetchTMDB(endpoint, params = {}) {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'id-ID', // Bahasa Indonesia
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.error('TMDB API Error:', error.message);
        return null;
    }
}

// Routes

// 1. Home Page - Premium Layout
app.get('/', async (req, res) => {
    try {
        const trending = await fetchTMDB('/trending/movie/week');
        const popularAnime = await fetchTMDB('/discover/tv', { with_keywords: '210024', sort_by: 'popularity.desc' });
        const genres = await fetchTMDB('/genre/movie/list'); // Get Genres
        const upcoming = await fetchTMDB('/movie/upcoming'); // Upcoming movies

        // Pick a random featured movie from trending
        const featured = trending && trending.results ? trending.results[0] : null;

        res.render('index', {
            featured: featured,
            trending: trending ? trending.results : [],
            anime: popularAnime ? popularAnime.results : [],
            upcoming: upcoming ? upcoming.results : [],
            genres: genres ? genres.genres : [],
            page: 'home'
        });
    } catch (e) {
        console.error(e);
        res.render('index', { featured: null, trending: [], anime: [], upcoming: [], genres: [], page: 'home' });
    }
});

// 2. Search Page
app.get('/search', async (req, res) => {
    const query = req.query.q;
    let results = [];
    if (query) {
        const data = await fetchTMDB('/search/multi', { query: query });
        if (data) results = data.results;
    }
    res.render('index', { movies: results, anime: [], search: query });
});

// 3. Watch Page (Movie)
app.get('/watch/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await fetchTMDB(`/movie/${movieId}`);

    if (!movie) return res.send('Movie not found');

    res.render('watch', {
        data: movie,
        type: 'movie',
        embedUrl: `https://vidsrc.xyz/embed/movie/${movieId}` // Embed Source
    });
});

// 4. Watch Page (TV/Anime)
app.get('/watch/tv/:id', async (req, res) => {
    const tvId = req.params.id;
    const tv = await fetchTMDB(`/tv/${tvId}`);

    if (!tv) return res.send('TV Show not found');

    // Default to season 1 episode 1 for now
    res.render('watch', {
        data: tv,
        type: 'tv',
        embedUrl: `https://vidsrc.xyz/embed/tv/${tvId}/1/1`
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
