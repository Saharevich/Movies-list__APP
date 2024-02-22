    const moviesInputNode = document.querySelector('.js-movies-push');
    const moviesPushBtn = document.querySelector('.js-push-btn');
    let moviesListNode = document.querySelector('.js-movies-list');
    
    moviesPushBtn.addEventListener('click', renderMoviesList);  
    
    window.addEventListener('DOMContentLoaded', () => {
        const saveMovies = JSON.parse(localStorage.getItem('movies')) || [];
        saveMovies.forEach(movie => {
            const movieID = movie.id;
            const newMovies = movie.content;
            let MOVIES = `
                <li class='movies-item'>
                    <input type='checkbox' class='checking-movies'>
                    <p class='movies-text'>${newMovies}</p>
                    <button class='delete-movies' data-movie-id='${movieID}'></button>
                </li>
            `;
            moviesListNode.insertAdjacentHTML('beforeend', MOVIES);
        });
        addDeleteMovies();
        checkMovies();
    })

    function renderMoviesList() {
        const newMovies = moviesInputNode.value;
        if (!newMovies) {
            alert('Введите название фильма!!!')
            return;
        }

        const movieID = Date.now();
        
        
        let MOVIES = `
        <li class='movies-item'>
            <input type='checkbox' class='checking-movies'>
            <p class='movies-text'>${newMovies}</p>
            <button class='delete-movies' data-movie-id='${movieID}'></button>
        </li>
        `;
        
        moviesListNode.insertAdjacentHTML('beforeend', MOVIES);

        const saveMovies = JSON.parse(localStorage.getItem('movies')) || [];
        saveMovies.push({ id: movieID, content: newMovies});
        localStorage.setItem('movies', JSON.stringify(saveMovies));

        addDeleteMovies();
        checkMovies();
    
        clearInput();

        return newMovies;
    };

    function addDeleteMovies() {
        const deleteMoviesBtns = document.querySelectorAll('.delete-movies');
        deleteMoviesBtns.forEach(btn => {
            btn.removeEventListener('click', deleteMovies);
        });
        deleteMoviesBtns.forEach(btn => {
            btn.addEventListener('click', deleteMovies);
        });
    }

    function deleteMovies() {
        const movieID = this.getAttribute('data-movie-id');
        const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
        const updatedMovies = savedMovies.filter(movie => movie.id !== parseInt(movieID));
        localStorage.setItem('movies', JSON.stringify(updatedMovies));

        this.parentElement.remove();
    }

    function checkMovies() {
        let moviesItemText = document.querySelectorAll('.movies-text');
        const checkMoviesNode = document.querySelectorAll('.checking-movies');
        checkMoviesNode.forEach((checkbox, index) => {
            checkbox.addEventListener('click', function() {
                if (this.checked) {
                    moviesItemText[index].classList.add('movies-item-active');
                } else {
                    moviesItemText[index].classList.remove('movies-item-active');
                }
            })
        });
    }

    function clearInput() {
        moviesInputNode.value = '';
    }
    


