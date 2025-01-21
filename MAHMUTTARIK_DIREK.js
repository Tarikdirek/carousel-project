    (() => {

        const getLocalStorageItem = (key, defaultValue = '{}') => {
            try {
                return JSON.parse(localStorage.getItem(key) || defaultValue);
            } catch (error) {
                console.error(`Error parsing localStorage key "${key}":`, error);
                return JSON.parse(defaultValue);
            }
        };

        const setLocalStorageItem = (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        };

        const init = async () => {
            try {
                self.buildHTML();
                self.buildCSS();
                await self.setEvents();
            } catch (error) {
                console.error('Initialization error:', error);
            }
        };

        const buildHTML = () => {
            const html = `
                <div class="carousel-container">
                    <div class="carousel-header">
                        <h2 class="section-title">You Might Also Like</h2>
                    </div>
                    ${buildNavigationButton('prev')}
                    <div class="carousel-wrapper">
                        <div class="carousel-track"></div>
                    </div>
                    ${buildNavigationButton('next')}
                </div>
            `;

            $('.product-detail').append(html);
        };

        const buildNavigationButton = (direction) => {
            const isNext = direction === 'next';
            return `
                <button class="carousel-button ${direction}" aria-label="${isNext ? 'Next' : 'Previous'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"
                        ${isNext ? 'style="transform: rotate(180deg)"' : ''}>
                        <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" 
                            d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                    </svg>
                </button>
            `;
        };

        const buildCSS = () => {
            const css = `
                body {
                    margin: 0;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 14px;
                }

                .section-title {
                    font-size: 32px;
                    margin: 0 !important;
                    padding: 15px 0;
                    color: #29323b;
                    font-weight: lighter;
                }

                @media (max-width: 992px) {
                    .section-title {
                        font-size: 24px;
                    }
                }

                .carousel-container {
                    position: relative;
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 20px 40px;
                    background-color: #faf9f7;
                }

                .carousel-wrapper {
                    overflow: hidden;
                    position: relative;
                }

                .carousel-track {
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }

                .carousel-item {
                    flex: 0 0 15.4%;
                    padding: 0 8px;
                    box-sizing: border-box;
                }

                .product-card {
                    background: #fff;
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .product-content {
                    padding: 12px;
                    background-color: #fff;
                    margin: 0;
                }

                @media (min-width: 992px) {
                    .product-content {
                        padding: 12px 12px 32px 12px;
                    }
                }

                @media (max-width: 992px) {
                    .product-content {
                        padding: 12px;
                    }
                }

                .product-image {
                    width: 100%;
                    aspect-ratio: 3/4;
                    object-fit: cover;
                    display: block;
                }

                .product-title {
                    font-size: 14px !important;
                    display: -webkit-box;
                    line-height: 1.4;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin: 0;
                    height: 36px;
                    max-height: 36px;
                    color: #333;
                    font-weight: normal;
                    word-break: break-word;
                    text-overflow: ellipsis;
                    white-space: normal;
                    box-sizing: border-box;
                    padding: 0;
                }

                .product-price {
                    color: #193db0;
                    font-weight: bold;
                    font-size: 18px !important;
                    margin: 8px 0 0 0;
                    padding: 0;
                }

                .favorite-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: white;
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    z-index: 2;
                }

                .favorite-button i {
                    color: #999;
                    font-size: 16px;
                }

                .favorite-button.active i {
                    color: #0000ff;
                }

                .carousel-button {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    z-index: 3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: none;
                }

                .carousel-button i {
                    color: #333;
                    font-size: 24px;
                }

                .carousel-button.disabled i {
                    opacity: 0.3;
                }

                .carousel-button.prev {
                    left: 0;
                }

                .carousel-button.next {
                    right: 0;
                    background: linear-gradient(to left, #faf9f7 50%, transparent 50%);
                    padding-left: 10px;
                }

                .add-to-cart-button {
                    display: none;
                    height: 35px;
                    background-color: #193db0;
                    color: #fff;
                    width: 100%;
                    border-radius: 5px;
                    border: none;
                    line-height: 19px;
                    font-size: 14px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    margin-top: 12px;
                }

                @media (max-width: 992px) {
                    .carousel-item {
                        flex: 0 0 33.333%; 
                    }

                    .add-to-cart-button {
                        display: block;
                    }
                }

                @media (max-width: 768px) {
                    .carousel-item {
                        flex: 0 0 50%; 
                    }

                    .product-title {
                        margin-top: 8px;
                    }

                    .product-price {
                        margin-top: 3px;
                    }

                    .product-content {
                        margin: 10px;
                    }

                    .add-to-cart-button {
                        margin-top: 20px;
                    }
                }

                @media (max-width: 576px) {
                    .carousel-item {
                        flex: 0 0 100%; 
                    }

                    .product-title {
                        margin-top: 6px;
                    }

                    .product-price {
                        margin-top: 2px;
                    }

                    .product-content {
                        margin: 10px;
                    }

                    .add-to-cart-button {
                        margin-top: 20px;
                    }
                }

                .carousel-wrapper::after {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 150px;
                    height: 100%;
                    background: #faf9f7;
                    pointer-events: none;
                    z-index: 1;
                }

                @media (min-width: 992px) and (max-width: 1440px) {
                    .carousel-item {
                        flex: 0 0 220px;
                        padding: 0 8px;
                    }

                    .product-image {
                        width: 100%;
                        aspect-ratio: 3/4;
                        object-fit: cover;
                    }

                    .product-title {
                        font-size: 14px;
                    }

                    .carousel-wrapper::after {
                        display: block;
                        width: 180px;
                    }
                }

                @media (max-width: 991px) {
                    .carousel-wrapper::after {
                        display: none;
                    }
                }

                @media (min-width: 1441px) {
                    .carousel-wrapper::after {
                        display: none;
                    }
                }

                .carousel-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .carousel-wrapper {
                    overflow: hidden;
                    position: relative;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                @media (max-width: 992px) {
                    .carousel-wrapper {
                        overflow: auto hidden;
                        -webkit-overflow-scrolling: touch;
                        scroll-snap-type: x mandatory;
                    }

                    .carousel-item {
                        scroll-snap-align: start;
                    }
                }

                .favorite-button svg {
                    width: 20.576px;
                    height: 19.483px;
                }

                .favorite-button svg path {
                    fill: none;
                    stroke: #555;
                    stroke-width: 1.5px;
                    transition: all 0.3s ease;
                }

                .favorite-button.active svg path {
                    fill: #193db0;
                    stroke: #193db0;
                }

                .carousel-button svg {
                    width: 14.242px;
                    height: 24.242px;
                }
            `;

            $('<style>').addClass('carousel-style').html(css).appendTo('head');
        };

        const setEvents = async () => {
            const calculateItemsPerView = () => {
                const width = $(window).width();
                if (width <= 576) return 1;
                if (width <= 768) return 2;
                if (width <= 992) return 3;
                return 6.5;
            };

            let currentPosition = 0;
            let itemsPerView = calculateItemsPerView();
            let totalItems = 0;
            
            const favourites = getLocalStorageItem('favouriteProducts');
            

            const buildFavoriteButton = (productId, isFavorite) => `
                <button class="favorite-button ${isFavorite ? 'active' : ''}" data-product-id="${productId}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                        <path fill="none" stroke="#555" stroke-width="1.5px" 
                            d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" 
                            transform="translate(.756 -1.076)"></path>
                    </svg>
                </button>
            `;

            const createProductCard = (product) => {
                const isFavorite = favourites[product.id] === true;
                return `
                    <div class="carousel-item">
                        <div class="product-card" data-product-url="${product.url}">
                            <img src="${product.img}" alt="${product.name}" class="product-image">
                            ${buildFavoriteButton(product.id, isFavorite)}
                            <div class="product-content">
                                <h3 class="product-title">${product.name}</h3>
                                <p class="product-price">${product.price.toFixed(2)} TL</p>
                                <button class="add-to-cart-button">SEPETE EKLE</button>
                            </div>
                        </div>
                    </div>
                `;
            };

            const attachEventHandlers = () => {
                $('.product-card').on('click', (e) => {
                    if (!$(e.target).closest('.favorite-button, .add-to-cart-button').length) {
                        window.open($(e.currentTarget).data('product-url'), '_blank');
                    }
                });

                $('.favorite-button').on('click', (e) => {
                    e.stopPropagation();
                    const $button = $(e.currentTarget);
                    const productId = $button.data('product-id');
                    $button.toggleClass('active');
                    
                    const favourites = getLocalStorageItem('favouriteProducts');
                    if (favourites[productId]) {
                        delete favourites[productId];
                    } else {
                        favourites[productId] = true;
                    }
                    
                    setLocalStorageItem('favouriteProducts', favourites);
                });
            };

            const renderProducts = (products) => {
                totalItems = products.length;
                const track = $('.carousel-track');
                const productCards = products.map(createProductCard).join('');
                track.html(productCards);

                attachEventHandlers();
                updateCarouselControls();
            };

            const updateCarouselControls = () => {
                if (window.innerWidth > 992) {
                    const itemWidth = 220;
                    const totalWidth = itemWidth * totalItems;
                    const containerWidth = $('.carousel-wrapper').width();
                    const maxPosition = Math.ceil((totalWidth - containerWidth) / itemWidth);

                    if (currentPosition <= 0) {
                        currentPosition = 0;
                        $('.carousel-button.prev').addClass('disabled');
                    } else {
                        $('.carousel-button.prev').removeClass('disabled');
                    }
                    
                    if (currentPosition >= maxPosition) {
                        currentPosition = maxPosition;
                        $('.carousel-button.next').addClass('disabled');
                    } else {
                        $('.carousel-button.next').removeClass('disabled');
                    }

                    const translateX = -(currentPosition * itemWidth);
                    $('.carousel-track').css('transform', `translateX(${translateX}px)`);
                }
            };

            const fetchProducts = async () => {
                try {
                    const cachedProducts = localStorage.getItem('fetchedProducts');
                    
                    if (cachedProducts) {
                        return JSON.parse(cachedProducts);
                    }
                    
                    const response = await $.ajax({
                        url: 'https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json',
                        method: 'GET'
                    });
                    
                    const products = typeof response === 'string' ? JSON.parse(response) : response;
                    localStorage.setItem('fetchedProducts', JSON.stringify(products));
                    return products;
                } catch (error) {
                    console.error('Error fetching products:', error);
                    return [];
                }
            };

            const initializeProducts = async () => {
                const products = await fetchProducts();
                renderProducts(products);
            };

            initializeProducts();

            const debounce = (func, wait) => {
                let timeout;
                return function(...args) {
                    const context = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), wait);
                };
            };

            const handleResponsive = () => {
                const width = $(window).width();
                const carousel = $('.carousel-wrapper');
                const track = $('.carousel-track');
                const buttons = $('.carousel-button.prev, .carousel-button.next');
                
                if (width <= 992) {
                    buttons.css('visibility', 'hidden');
                    
                    track.css('transform', 'none');
                    carousel.css({
                        'overflow-x': 'auto',
                        '-webkit-overflow-scrolling': 'touch',
                        'scroll-behavior': 'smooth',
                        'cursor': 'pointer'
                    });

                    let startX;
                    let scrollLeft;
                    let isDragging = false;
                    let moved = false;
                    const threshold = 10;

                    const startDragging = (e) => {
                        isDragging = true;
                        moved = false;
                        startX = e.pageX || e.touches[0].pageX;
                        scrollLeft = carousel.scrollLeft();
                        e.preventDefault();
                        e.stopPropagation();
                    };

                    const stopDragging = (e) => {
                        isDragging = false;
                        if (moved) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    };

                    const move = (e) => {
                        if (!isDragging) return;
                        e.preventDefault();
                        const x = e.pageX || e.touches[0].pageX;
                        const walk = (x - startX) * 2;
                        carousel.scrollLeft(scrollLeft - walk);
                        if (Math.abs(walk) > threshold) {
                            moved = true;
                        }
                    };

                    const handleClick = (e) => {
                        if (moved) {
                            e.preventDefault();
                        }
                    };

                    carousel.off('mousedown touchstart mousemove touchmove mouseup mouseleave touchend');
                    carousel
                        .on('mousedown', startDragging)
                        .on('mousemove', move)
                        .on('mouseup mouseleave', stopDragging)
                        .on('touchstart', startDragging)
                        .on('touchmove', move)
                        .on('touchend', stopDragging);

                    $('.product-card a').on('click', handleClick);

                } else {
                    buttons.css('visibility', 'visible');
                    
                    carousel
                        .off('mousedown touchstart mousemove touchmove mouseup mouseleave touchend')
                        .css({
                            'overflow-x': 'hidden',
                            '-webkit-overflow-scrolling': 'auto',
                            'scroll-behavior': 'auto',
                            'cursor': 'default'
                        });
                    
                    updateCarouselControls();
                }
            };

            
            $('.carousel-button.next').on('click', function() {
                if (!$(this).hasClass('disabled') && window.innerWidth > 992) {
                    currentPosition += 1;
                    updateCarouselControls();
                }
            });

            $('.carousel-button.prev').on('click', function() {
                if (!$(this).hasClass('disabled') && window.innerWidth > 992) {
                    currentPosition -= 1;
                    updateCarouselControls();
                }
            });

        
            const handleWindowResize = () => {
                const newItemsPerView = calculateItemsPerView();
                if (newItemsPerView !== itemsPerView) {
                    itemsPerView = newItemsPerView;
                    updateCarouselControls();
                    handleResponsive();
                }
            };

            
            $(window).on('resize', handleWindowResize);
        };

        self.buildHTML = buildHTML;
        self.buildCSS = buildCSS;
        self.setEvents = setEvents;

        init();
    })(); 