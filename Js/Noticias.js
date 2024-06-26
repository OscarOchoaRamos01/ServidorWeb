let currentSlideIndex = 0;

function fetchNews() {
    fetch("http://34.195.44.244:3000/api/news")
        .then(response => response.json())
        .then(data => {
            const carouselSlide = document.getElementById("carouselSlide");
            const carouselDots = document.getElementById("carouselDots");
            // Limpiar el carrusel antes de agregar nuevas noticias
            carouselSlide.innerHTML = "";
            carouselDots.innerHTML = "";
            // Agregar cada noticia al carrusel una por una
            data.forEach((newsItem, index) => {
                const newsDiv = document.createElement("div");
                newsDiv.classList.add("carousel-item");
                newsDiv.innerHTML = `
                    <div class="carousel-caption">
                        <h2>NOTICIAS</h2>
                        <h3>${newsItem.title}</h3>
                        <p>${newsItem.description}</p>
                        <img id='img-carrusel' src='${newsItem.image_url}'>
                    </div>
                `;
                // Agregar la noticia al carrusel
                carouselSlide.appendChild(newsDiv);

                // Crear puntos de navegación
                const dot = document.createElement("span");
                dot.classList.add("carousel-dot");
                dot.addEventListener("click", () => {
                    showSlide(index);
                });
                carouselDots.appendChild(dot);
            });
            // Iniciar el carrusel después de agregar todas las noticias
            showSlide(currentSlideIndex);
            addSwipeListeners();
        })
        .catch(error => console.error('Error fetching news:', error));
}

function showSlide(index) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    // Ocultar todas las noticias
    carouselItems.forEach(item => {
        item.style.display = 'none';
    });
    // Quitar la clase activa de todos los puntos
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    // Mostrar la noticia actual
    carouselItems[index].style.display = 'block';
    // Agregar la clase activa al punto correspondiente
    dots[index].classList.add('active');
    currentSlideIndex = index;
}

function addSwipeListeners() {
    const carouselContainer = document.getElementById("carrusel-container");
    if (carouselContainer) {
        let startX, endX;

        carouselContainer.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            handleSwipe();
        });

        carouselContainer.addEventListener('mousedown', (event) => {
            startX = event.clientX;
        });

        carouselContainer.addEventListener('mouseup', (event) => {
            endX = event.clientX;
            handleSwipe();
        });

        function handleSwipe() {
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        }
    } else {
        console.error('carouselContainer not found');
    }
}

function nextSlide() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    currentSlideIndex = (currentSlideIndex + 1) % carouselItems.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    currentSlideIndex = (currentSlideIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlideIndex);
}

// Obtener y mostrar las noticias al cargar la página
document.addEventListener("DOMContentLoaded", fetchNews);



