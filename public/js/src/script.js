

/*
|--------------------------------------------------------------------------
| Script
|--------------------------------------------------------------------------
*/

$(function() {

    var MovieList = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: 'http://api.themoviedb.org/3/search/movie?api_key=c9dd61be6a740c461bf22c50cc44d1fb&query=%QUERY',
            wildcard: '%QUERY',
            transform: function(resp) {
            return resp.results;
            }
        }
    });

    $('.typeahead').typeahead(null, {
        name: 'movie',
        displayKey: function(item) {
            return item.title;
        },
        source: MovieList,
        templates: {
            suggestion: function(item) {
                var year = new Date(item.release_date)
                return [
                    '<div class="search-item">',
                        '<img src="' + "http://image.tmdb.org/t/p/w92/" + item.poster_path + '">',
                        '<ul>',
                        '<li>' + item.title + '</li>',
                        '<li>' + year.getFullYear() + '</li>',
                    '</ul>'
                ].join('')
            }
        }
    }).on('typeahead:selected', function(event, data){
        console.log(data)        
        $('.hidden').val(data.id);        
    });

});
