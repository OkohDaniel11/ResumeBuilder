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

  // ensure container has enough height so the sticky cards can be scrolled through
  container.style.height = `${cards.length * 50}vh`;

  let ticking = false;

  function setActive(index) {
    cards.forEach((c, i) => {
      c.classList.toggle('visible', i === index);
      // fade-out only for immediate neighbors for smoother transitions
      c.classList.toggle('fade-out', i !== index);
    });
  }

  function updateActiveCard() {
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    setActive(closestIndex);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateActiveCard);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // initial activation
  updateActiveCard();
});
