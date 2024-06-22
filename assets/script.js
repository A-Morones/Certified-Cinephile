//Finds trailer based on search//
//Will change once TMDB API's in Place//
$(document).ready(function() {
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

    $('#search-form').submit(function(event) {
        event.preventDefault();
        const movieTitle = $('#movie-title').val();

        $.ajax({
            url: SEARCH_URL,
            method: 'GET',
            data: {
                part: 'snippet',
                q: `${movieTitle} trailer`,
                type: 'video',
                key: API_KEY,
                maxResults: 1
            },
            success: function(response) {
                if (response.items && response.items.length > 0) {
                    const videoId = response.items[0].id.videoId;
                    const trailerUrl = `https://www.youtube.com/embed/${videoId}`;
                    $('#trailer-container').html(`<iframe width="560" height="315" src="${trailerUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
                } else {
                    $('#trailer-container').html('<p>No trailer found</p>');
                }
            },
            error: function(error) {
                console.error('Error:', error);
                $('#trailer-container').html('<p>An error occurred while fetching the trailer</p>');
            }
        });
    });
});