// Dropdown behavior for ResumeBuilder
document.addEventListener('DOMContentLoaded', function () {
	const dropdownToggle = document.getElementById('dropdownMenuTwo');
	const dropdown = document.querySelector('.dropdown');

	if (!dropdownToggle || !dropdown) return;

	let closeTimer = null;
	const CLOSE_DELAY = 150; // ms - small delay to avoid flicker

	const isInside = (el, target) => el && target && (el === target || el.contains(target));

	function openDropdown() {
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

	// Click to toggle (useful for touch/mobile)
	dropdownToggle.addEventListener('click', function (e) {
		e.preventDefault();
		if (dropdown.classList.contains('open')) closeDropdown();
		else openDropdown();
	});

	// Use pointer events for consistent cross-device behavior
	const enterHandler = (e) => {
		// if pointer moved from an element inside toggle/dropdown, do nothing
		openDropdown();
	};

	const leaveHandler = (e) => {
		const related = e.relatedTarget;
		// if moving to an element inside the toggle or dropdown, keep it open
		if (isInside(dropdown, related) || isInside(dropdownToggle, related)) return;
		// otherwise schedule a short close — this prevents flicker when crossing small gaps
		scheduleClose();
	};

	dropdownToggle.addEventListener('pointerenter', enterHandler);
	dropdown.addEventListener('pointerenter', enterHandler);

	dropdownToggle.addEventListener('pointerleave', leaveHandler);
	dropdown.addEventListener('pointerleave', leaveHandler);

	// Close on outside click
	document.addEventListener('click', function (e) {
		if (!isInside(dropdown, e.target) && !isInside(dropdownToggle, e.target)) {
			closeDropdown();
		}
	});

	// Close on ESC
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeDropdown();
	});
});
