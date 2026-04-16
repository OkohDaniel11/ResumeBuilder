
/// Location HREF 
const ResumeLoc = document.getElementById("linkpage");

document.addEventListener('DOMContentLoaded', function() {
	if (ResumeLoc) {
		// ensure the anchor has the correct href (relative to index.html)
		ResumeLoc.href = "./ResumeHtml/resumeEx.html";
	}
});
// Dropdown behavior for ResumeBuilder
document.addEventListener('DOMContentLoaded', function () {
	// Resume Dropdown
	const dropdownToggle = document.getElementById('dropdownMenuTwo');
	const dropdown = document.querySelector('.dropdown');
	// Resource Dropdown
	const resourceToggle = document.getElementById('resourceMenu');
	const resourceDropdown = document.querySelector('.resource-dropdown');

	let closeTimer = null;
	const CLOSE_DELAY = 150;
	const isInside = (el, target) => el && target && (el === target || el.contains(target));

	// Helper: close both dropdowns
	function closeAllDropdowns() {
		if (dropdown) dropdown.classList.remove('open');
		if (resourceDropdown) resourceDropdown.classList.remove('open');
	}
 
	// Resume Dropdown Functions
	function openDropdown() {
		closeAllDropdowns();
		clearTimeout(closeTimer);
		dropdown.classList.add('open');
	}
	function closeDropdown() {
		clearTimeout(closeTimer);
		dropdown.classList.remove('open');
	}
	function scheduleClose() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => dropdown.classList.remove('open'), CLOSE_DELAY);
	}

	// Resource Dropdown Functions
	function openResourceDropdown() {
		closeAllDropdowns();
		clearTimeout(closeTimer);
		resourceDropdown.classList.add('open');
	}
	function closeResourceDropdown() {
		clearTimeout(closeTimer);
		resourceDropdown.classList.remove('open');
	}
	function scheduleResourceClose() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => resourceDropdown.classList.remove('open'), CLOSE_DELAY);
	}

	// Resume Dropdown Events
	if (dropdownToggle && dropdown) {
		dropdownToggle.addEventListener('click', function (e) {
			// If the click originated on a real link with an href (not "#"), allow navigation
			const anchor = e.target.closest && e.target.closest('a');
			if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href') !== '#') {
				return; // let the browser follow the link
			}
			e.preventDefault();
			if (dropdown.classList.contains('open')) closeDropdown();
			else openDropdown();
		});
		const enterHandler = (e) => { openDropdown(); };
		const leaveHandler = (e) => {
			const related = e.relatedTarget;
			if (isInside(dropdown, related) || isInside(dropdownToggle, related)) return;
			scheduleClose();
		};
		dropdownToggle.addEventListener('pointerenter', enterHandler);
		dropdown.addEventListener('pointerenter', enterHandler);
		dropdownToggle.addEventListener('pointerleave', leaveHandler);
		dropdown.addEventListener('pointerleave', leaveHandler);
	}

	// Resource Dropdown Events
	if (resourceToggle && resourceDropdown) {
		resourceToggle.addEventListener('click', function (e) {
			e.preventDefault();
			if (resourceDropdown.classList.contains('open')) closeResourceDropdown();
			else openResourceDropdown();
		});
		const resourceEnterHandler = (e) => { openResourceDropdown(); };
		const resourceLeaveHandler = (e) => {
			const related = e.relatedTarget;
			if (isInside(resourceDropdown, related) || isInside(resourceToggle, related)) return;
			scheduleResourceClose();
		};
		resourceToggle.addEventListener('pointerenter', resourceEnterHandler);
		resourceDropdown.addEventListener('pointerenter', resourceEnterHandler);
		resourceToggle.addEventListener('pointerleave', resourceLeaveHandler);
		resourceDropdown.addEventListener('pointerleave', resourceLeaveHandler);
	}

	// Close both dropdowns on outside click
	document.addEventListener('click', function (e) {
		if (dropdown && dropdownToggle && !isInside(dropdown, e.target) && !isInside(dropdownToggle, e.target)) {
			closeDropdown();
		}
		if (resourceDropdown && resourceToggle && !isInside(resourceDropdown, e.target) && !isInside(resourceToggle, e.target)) {
			closeResourceDropdown();
		}
		// If clicking a nav item, close the other dropdown
		if (dropdownToggle && resourceToggle) {
			if (isInside(dropdownToggle, e.target)) {
				closeResourceDropdown();
			}
			if (isInside(resourceToggle, e.target)) {
				closeDropdown();
			}
		}
	});

	// Close on ESC
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeDropdown();
	});
});

window.addEventListener('DOMContentLoaded', () => {
    const topSections = document.querySelector('.TopSections');
    if (topSections) topSections.classList.add('shrink');
    initCvRating();
  });

/* Notes: initCvRating was added so CV star ratings become interactive.
   This creates hover previews, click selection, keyboard support, and
   preserves selected rating for each .cvRating container.
*/

const buttons = document.querySelectorAll('.toggledwn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdown = btn.closest('div').querySelector('.drop');
    dropdown.classList.toggle('show');
    btn.classList.toggle('rotate');
  });
});

document.addEventListener('DOMContentLoaded', () => {
	const cards = Array.from(document.querySelectorAll('.cardScroll'));
	const container = document.querySelector('.scrolls');

	if (!cards.length || !container) return;

	// Each card gets 100vh of scroll height
	container.style.height = `${cards.length * 100}vh`;

	let ticking = false;
	let lastIndex = -1;

	function setActive(index, direction) {
		cards.forEach((c, i) => {
			c.classList.remove('visible', 'fade-out');

			if (i === index) {
				// current active
				c.classList.add('visible');
				c.style.zIndex = 2;
			} else if (
				(direction === 'down' && i < index) ||
				(direction === 'up' && i > index)
			) {
				// fade out depending on scroll direction
				c.classList.add('fade-out');
				c.style.zIndex = 0;
			} else {
				c.style.zIndex = 1;
			}
		});

		lastIndex = index;
  	}

	function updateActiveCard() {
		const viewportCenter = window.innerHeight / 1;
		let closestIndex = 0;
		let closestDist = Infinity;

		cards.forEach((card, i) => {
			const rect = card.getBoundingClientRect();
			const cardCenter = rect.top + rect.height / 1.8;
			const dist = Math.abs(cardCenter - viewportCenter);
			if (dist < closestDist) {
				closestDist = dist;
				closestIndex = i;
			}
		});

		const direction = closestIndex > lastIndex ? 'down' : 'up';
    	if (closestIndex !== lastIndex) setActive(closestIndex, direction);

    	ticking = false;
	}

	function onScroll() {
	if (!ticking) {
		ticking = true;
		requestAnimationFrame(updateActiveCard);
	}}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);

	// initial activation
	updateActiveCard();
});

// Rating persistence notes:
// - Ratings are saved per card using a unique data-rating-id on each .cvRating container.
// - Each click updates total and count in localStorage, then recomputes the average.
const RATING_STORAGE_KEY = 'resumeBuilderCvRatings';

function loadStoredRatings() {
  try {
    const raw = localStorage.getItem(RATING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function saveStoredRatings(store) {
  try {
    localStorage.setItem(RATING_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    // ignore storage errors
  }
}

function getStoredRating(id) {
  const stored = loadStoredRatings();
  return stored[id] || { total: 0, count: 0 };
}

function saveUserRating(id, ratingValue) {
  const stored = loadStoredRatings();
  const record = stored[id] || { total: 0, count: 0 };
  record.total += ratingValue;
  record.count += 1;
  stored[id] = record;
  saveStoredRatings(stored);
  return record;
}

function formatAverageText(record) {
  if (!record.count) return 'No ratings yet';
  const average = (record.total / record.count).toFixed(1);
  return `Average ${average}/5 from ${record.count} rating${record.count === 1 ? '' : 's'}`;
}

function displayStarsForRating(stars, rating) {
  const rounded = Math.round(Math.max(0, Math.min(5, rating)));
  stars.forEach((star, index) => {
    const isSelected = index < rounded;
    star.classList.toggle('fa-solid', isSelected);
    star.classList.toggle('fa-regular', !isSelected);
    star.classList.toggle('selected', isSelected);
    star.setAttribute('aria-checked', isSelected ? 'true' : 'false');
  });
}

function initCvRating() {
  const ratingContainers = document.querySelectorAll('.cvRating');
  if (!ratingContainers.length) return;

  ratingContainers.forEach((container, containerIndex) => {
    const ratingId = container.dataset.ratingId || `rating-${containerIndex + 1}`;
    let record = getStoredRating(ratingId);
    let currentAverage = record.count ? record.total / record.count : 0;

    const stars = Array.from(container.querySelectorAll('i'));
    let summary = container.nextElementSibling;
    if (!summary || !summary.classList.contains('rating-summary')) {
      summary = document.createElement('div');
      summary.className = 'rating-summary';
      container.insertAdjacentElement('afterend', summary);
    }

    const updateStars = (rating) => {
      displayStarsForRating(stars, rating);
      const rounded = Math.max(0, Math.min(5, Math.round(rating)));
      container.setAttribute('aria-label', `Rated ${rounded} out of ${stars.length} stars`);
    };

    const updateSummary = () => {
      summary.textContent = formatAverageText(record);
    };

    stars.forEach((star, index) => {
      const ratingValue = index + 1;
      star.setAttribute('role', 'radio');
      star.setAttribute('tabindex', '0');
      star.setAttribute('aria-label', `${ratingValue} star${ratingValue > 1 ? 's' : ''}`);

      star.addEventListener('mouseenter', () => updateStars(ratingValue));
      star.addEventListener('click', () => {
        record = saveUserRating(ratingId, ratingValue);
        currentAverage = record.total / record.count;
        updateStars(currentAverage);
        updateSummary();
      });
      star.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          record = saveUserRating(ratingId, ratingValue);
          currentAverage = record.total / record.count;
          updateStars(currentAverage);
          updateSummary();
        }
      });
    });

    container.addEventListener('mouseleave', () => updateStars(currentAverage));
    updateStars(currentAverage);
    updateSummary();
  });
}

function AccessFunctions() {
  const section = document.getElementById("accessibilitySection");
  if (section) section.classList.toggle("hidden");
}

/* Notes: Added guard checks for DOM elements that may not exist on every page.
   This prevents errors when loading main.js on pages with no accessibility controls.
*/

// Font Size
const fontSizeRange = document.getElementById("fontSizeRange");
if (fontSizeRange) {
  fontSizeRange.addEventListener("input", e => {
    document.body.style.fontSize = e.target.value + "px";
  });
}

// High Contrast
const contrastToggle = document.getElementById("contrastToggle");
if (contrastToggle) {
  contrastToggle.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });
}

// Dyslexic Font
const dyslexicFontToggle = document.getElementById("dyslexicFontToggle");
if (dyslexicFontToggle) {
  dyslexicFontToggle.addEventListener("click", () => {
    document.body.classList.toggle("dyslexic-font");
  });
}

// Highlight Links
const highlightLinksToggle = document.getElementById("highlightLinksToggle");
if (highlightLinksToggle) {
  highlightLinksToggle.addEventListener("click", () => {
    document.body.classList.toggle("highlight-links");
  });
}

// Reset
const resetAccessibility = document.getElementById("resetAccessibility");
if (resetAccessibility) {
  resetAccessibility.addEventListener("click", () => {
    document.body.style.fontSize = "16px";
    document.body.classList.remove("high-contrast", "dyslexic-font", "highlight-links");
    if (fontSizeRange) fontSizeRange.value = 16;
  });
}