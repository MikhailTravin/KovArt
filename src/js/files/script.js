function indents() {
    const header = document.querySelector('.header');
    const page = document.querySelector('.page');

    //Оступ от шапки
    let hHeader = window.getComputedStyle(header, false).height;
    hHeader = Number(hHeader.slice(0, hHeader.length - 2));
    if (page) {
        page.style.paddingTop = hHeader + 'px';
    }

}

window.addEventListener('scroll', () => {
    indents();
});

window.addEventListener('resize', () => {
    indents();
});

indents();


const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            const sources = video.querySelectorAll('source');

            sources.forEach(source => {
                if (source.dataset.src) {
                    source.src = source.dataset.src;
                }
            });

            video.load();
            videoObserver.unobserve(video);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.popup__item-video').forEach(video => {
    videoObserver.observe(video);
});

class VideoPopup {
    constructor(container) {
        this.popups = document.querySelectorAll(container);
        this.init();
    }

    init() {
        this.popups.forEach(popup => {
            const video = popup.querySelector('video');
            const closeBtn = popup.querySelector('[data-close]');

            // Ленивая загрузка при открытии
            popup.addEventListener('click', (e) => {
                if (e.target.closest('[data-close]') || e.target === popup) {
                    video.pause();
                } else if (!video.src && video.dataset.src) {
                    video.querySelector('source').src = video.dataset.src;
                    video.load();
                }
            });
        });
    }
}

new VideoPopup('.popup.video');