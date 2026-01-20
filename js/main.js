/* ===================================================================
 * Hudson 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

    'use strict';


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function () {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader')) {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


    /* move header
     * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function () {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    }; // end ssMoveHeader


    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function (e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function (link) {

            link.addEventListener("click", function (event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function () {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


    /* highlight active menu link on pagescroll
     * ------------------------------------------------------ */
    const ssScrollSpy = function () {

        const sections = document.querySelectorAll('.target-section');
        if (!sections) return;

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {

            // Get current scroll position
            let scrollY = window.pageYOffset;

            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function (current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                /* If our current scroll position enters the space where current section 
                 * on screen is, add .current class to parent element(li) of the thecorresponding 
                 * navigation link, else remove it. To know which link is active, we use 
                 * sectionId variable we are getting while looping through sections as 
                 * an selector
                 */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }

    }; // end ssScrollSpy


    /* glightbox
     * ------------------------------------------------------ */
    const ssGLightbox = function () {

        const lightbox = GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: false,
            autoplayVideos: true,
            svg: {
                close: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>',
                prev: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>',
                next: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>'
            }
        });

    } // end ssGLightbox


    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function () {

        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 50
                },
                // when window width is > 1180px
                1181: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function (box) {

            box.addEventListener('click', function (e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function () {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function () {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function () {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


    /* Goodreads
    * ------------------------------------------------------ */
    const ssGoodreads = function () {
        const container = document.getElementById('goodreads-books');
        if (!container) return;

        // RSS to JSON proxy
        const rssUrl = encodeURIComponent('https://www.goodreads.com/review/list_rss/166500511?key=4aXwl33WzfWeCxROER0dLcXmUzxmt6Nb58LF0DLlzBwnsFCj&shelf=currently-reading');
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

        fetch(apiUrl)
            .then(function (response) {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(function (data) {
                if (data.items && data.items.length > 0) {
                    let html = '';
                    data.items.forEach(function (item) {
                        // Extract image from description if book_image_url isn't present in top level
                        // rss2json sometimes puts custom tags in a weird place or ignores them.
                        // However, let's try to see if we can get a standard mapping or just use a fallback.
                        // For this specific valid Goodreads RSS, usually rss2json maps standard fields.

                        // Fallback logic for high-res image if available
                        let coverUrl = item.thumbnail; // Standard rss2json field from 'enclosure' or 'media:content' or 'image'

                        // If specific goodreads keys are passed through (rss2json might not pass custom tags by default on free plan)
                        // We might need to rely on the fact that Goodreads RSS often includes the image in the description HTML?
                        // Actually the provided RSS has it as a separate tag. 
                        // Let's assume 'thumbnail' captures it or we settle for a generic placeholder if missing.

                        // Better approach: regex the description for the image since rss2json usually preserves description HTML
                        if (!coverUrl && item.description) {
                            const imgMatch = item.description.match(/src="([^"]+)"/);
                            if (imgMatch) coverUrl = imgMatch[1];
                        }

                        // As a last lookup, Goodreads RSS images in description are usually small.
                        // Let's try to get the large image if possible.
                        // Since I can't be sure what rss2json returns for custom tags, I will stick to what I can find.
                        if (!coverUrl) coverUrl = "images/book-placeholder.jpg";

                        // High Quality Image Fix: Remove the sizing suffix (e.g., ._SY75_)
                        // Regex looks for "._S" followed by letters/numbers and "_.jpg" or similar
                        coverUrl = coverUrl.replace(/\._S[XY]\d+_/, '');

                        const title = item.title;
                        const author = item.author;
                        const link = item.link;

                        html += `
                        <div class="book-item" style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                            <a href="${link}" target="_blank" style="flex-shrink: 0; width: 60px; margin-right: 1.5rem; border-radius: 2px; overflow: hidden; box-shadow: 2px 2px 0 rgba(0,0,0,0.1); border: 1px solid #eee;">
                                <img src="${coverUrl}" alt="${title}" style="width: 100%; display: block; height: auto;">
                            </a>
                            <div class="book-info">
                                <h4 style="margin-bottom: 0.2rem; font-size: 2rem; line-height: 1.2; font-family: 'Patrick Hand', cursive;"><a href="${link}" target="_blank" style="color: inherit;">${title}</a></h4>
                                <p style="font-size: 1.4rem; margin-bottom: 0; color: #777; font-family: 'Patrick Hand', cursive;">${author}</p>
                            </div>
                        </div>
                        `;
                    });
                    container.innerHTML = html;
                } else {
                    container.innerHTML = '<div class="column"><p>Not reading anything right now.</p></div>';
                }
            })
            .catch(function (error) {
                console.error('Error fetching Goodreads:', error);
                container.innerHTML = '<div class="column"><p>Currently unable to load reading list.</p></div>';
            });

    }; // end ssGoodreads


    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function (trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssGLightbox();
        ssSwiper();
        ssAlertBoxes();
        ssMoveTo();
        ssGoodreads();

    })();

})(document.documentElement);