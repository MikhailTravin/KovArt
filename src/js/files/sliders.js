/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Список слайдеров

if (document.querySelector(".produce__slider")) {
	var produceSlider = null;
	var mediaQuerySize = 767.98;

	function produceSliderInit() {
		if (!produceSlider) {
			produceSlider = new Swiper(".produce__slider", {
				modules: [Pagination, Navigation],
				observer: true,
				observeParents: true,
				speed: 800,
				spaceBetween: 16,
				autoHeight: true,

				pagination: {
					el: '.produce__pagination-bullets',
					type: 'custom',
					renderCustom: function (swiper, current, total) {
						// Обновляем фракцию
						document.querySelector('.swiper-pagination-current').textContent = current;
						document.querySelector('.swiper-pagination-total').textContent = total;

						// Генерируем буллеты (максимум 6 видимых)
						let bullets = '';
						const maxVisible = 6;
						let start = 1;
						let end = Math.min(total, maxVisible);

						// Если слайдов больше 6, центрируем активный буллет
						if (total > maxVisible) {
							start = Math.max(1, current - Math.floor(maxVisible / 2));
							start = Math.min(start, total - maxVisible + 1);
							end = start + maxVisible - 1;
						}

						// Генерируем буллеты
						for (let i = start; i <= end; i++) {
							bullets += `<span class="swiper-pagination-bullet ${current === i ? 'swiper-pagination-bullet-active' : ''}" data-index="${i}"></span>`;
						}

						return bullets;
					}
				},

				navigation: {
					prevEl: ".produce__arrow-prev",
					nextEl: ".produce__arrow-next"
				},

				breakpoints: {
					0: {
						slidesPerView: 1.1,
					},
					480: {
						slidesPerView: 1.5,
					},
				}
			});

			// Обработчик клика по буллетам
			document.querySelector('.produce__pagination-bullets').addEventListener('click', function (e) {
				if (e.target.classList.contains('swiper-pagination-bullet')) {
					const index = parseInt(e.target.getAttribute('data-index'));
					produceSlider.slideTo(index - 1);
				}
			});
		}
	}

	function produceSliderDestroy() {
		if (produceSlider) {
			produceSlider.destroy();
			produceSlider = null;
		}
	}

	window.addEventListener("resize", (function (e) {
		var windowWidth = window.innerWidth;
		if (windowWidth <= mediaQuerySize) produceSliderInit(); else produceSliderDestroy();
	}));

	window.addEventListener("load", (function (e) {
		var windowWidth = window.innerWidth;
		if (windowWidth <= mediaQuerySize) produceSliderInit(); else produceSliderDestroy();
	}));
}

if (document.querySelector(".reviews__slider")) {
	const reviewsSlider = new Swiper(".reviews__slider", {
		modules: [Pagination, Navigation],
		observer: true,
		observeParents: true,
		speed: 800,
		slidesPerView: 3,
		spaceBetween: 16,
		autoHeight: false,
		loop: false,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
		resistance: true,
		resistanceRatio: .85,
		preventInteractionOnTransition: true,
		pagination: {
			el: ".reviews__pagination-bullets",
			type: "custom",
			renderCustom: function (swiper, current, total) {
				const fractionElement = document.querySelector(".reviews__pagination-fraction");
				if (fractionElement) {
					fractionElement.querySelector(".swiper-pagination-current").textContent = current;
					fractionElement.querySelector(".swiper-pagination-total").textContent = total;
				}
				let bullets = "";
				const maxVisible = 6;
				let start = 1;
				let end = Math.min(total, maxVisible);
				if (total > maxVisible) {
					start = Math.max(1, current - Math.floor(maxVisible / 2));
					start = Math.min(start, total - maxVisible + 1);
					end = start + maxVisible - 1;
				}
				for (let i = start; i <= end; i++) bullets += `<span class="swiper-pagination-bullet ${current === i ? "swiper-pagination-bullet-active" : ""}" data-index="${i}"></span>`;
				return bullets;
			}
		},
		navigation: {
			prevEl: ".reviews__arrow-prev",
			nextEl: ".reviews__arrow-next"
		},
		breakpoints: {
			0: {
				slidesPerView: 1.15
			},
			479.98: {
				slidesPerView: 1.5
			},
			767.98: {
				slidesPerView: 2.5
			},
			1200: {
				slidesPerView: 3
			}
		}
	});
	document.querySelector(".reviews__pagination-bullets")?.addEventListener("click", (function (e) {
		if (e.target.classList.contains("swiper-pagination-bullet")) {
			const index = parseInt(e.target.getAttribute("data-index"));
			reviewsSlider.slideTo(index - 1);
		}
	}));
}