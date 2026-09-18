const SPOTLIGHT_RADIUS = 260;
const SMOOTHING = 0.1;
const INITIAL_POINT = { x: -9999, y: -9999 };

type Point = {
	x: number;
	y: number;
};

const supportsSpotlightMask = (): boolean => {
	if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
		return false;
	}

	const mask = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at 50% 50%, #fff, transparent)`;
	return CSS.supports("mask-image", mask) || CSS.supports("-webkit-mask-image", mask);
};

const setMenuState = (
	root: HTMLElement,
	openButton: HTMLButtonElement,
	backdrop: HTMLElement,
	drawer: HTMLElement,
	isOpen: boolean,
): void => {
	openButton.setAttribute("aria-expanded", String(isOpen));
	backdrop.hidden = !isOpen;
	drawer.hidden = !isOpen;
	drawer.inert = !isOpen;
	drawer.setAttribute("aria-hidden", String(!isOpen));
	root.dataset.menuOpen = String(isOpen);
};

const initSpotlight = (root: HTMLElement): (() => void) => {
	const reveal = root.querySelector<HTMLElement>("#lithos-landing-spotlight");
	if (!reveal || !supportsSpotlightMask()) return () => {};

	const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
	if (!finePointer.matches) return () => {};

	const image = new Image();
	let rafId: number | null = null;
	let cancelled = false;
	let pointer: Point = INITIAL_POINT;
	let smooth: Point = INITIAL_POINT;

	const updateSpotlightPosition = (): void => {
		const bounds = root.getBoundingClientRect();
		reveal.style.setProperty("--lithos-spotlight-x", `${smooth.x - bounds.left}px`);
		reveal.style.setProperty("--lithos-spotlight-y", `${smooth.y - bounds.top}px`);
	};

	const animate = (): void => {
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const smoothing = reduceMotion ? 1 : SMOOTHING;
		smooth = {
			x: smooth.x + (pointer.x - smooth.x) * smoothing,
			y: smooth.y + (pointer.y - smooth.y) * smoothing,
		};
		updateSpotlightPosition();
		if (!cancelled) rafId = requestAnimationFrame(animate);
	};

	const onPointerMove = (event: PointerEvent): void => {
		pointer = { x: event.clientX, y: event.clientY };
	};
	const onPointerEnter = (event: PointerEvent): void => {
		pointer = { x: event.clientX, y: event.clientY };
		smooth = { ...pointer };
		root.dataset.spotlightVisible = "true";
	};
	const onPointerLeave = (): void => {
		root.dataset.spotlightVisible = "false";
	};

	image.decoding = "async";
	image.onload = (): void => {
		if (!cancelled) root.dataset.spotlightReady = "true";
	};
	image.onerror = (): void => {
		root.dataset.spotlightReady = "false";
		root.dataset.spotlightVisible = "false";
	};

	root.addEventListener("pointermove", onPointerMove);
	root.addEventListener("pointerenter", onPointerEnter);
	root.addEventListener("pointerleave", onPointerLeave);
	image.src = reveal.dataset.image ?? "";

	const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
	const onMotionPreferenceChange = (): void => updateSpotlightPosition();
	motionPreference.addEventListener?.("change", onMotionPreferenceChange);
	rafId = requestAnimationFrame(animate);

	return (): void => {
		cancelled = true;
		root.removeEventListener("pointermove", onPointerMove);
		root.removeEventListener("pointerenter", onPointerEnter);
		root.removeEventListener("pointerleave", onPointerLeave);
		motionPreference.removeEventListener?.("change", onMotionPreferenceChange);
		if (rafId !== null) cancelAnimationFrame(rafId);
	};
};

const initMobileMenu = (root: HTMLElement): (() => void) => {
	const openButton = root.querySelector<HTMLButtonElement>("#lithos-menu-open");
	const closeButton = root.querySelector<HTMLButtonElement>("#lithos-menu-close");
	const backdrop = root.querySelector<HTMLElement>("#lithos-mobile-backdrop");
	const drawer = root.querySelector<HTMLElement>("#lithos-mobile-navigation");
	if (!openButton || !closeButton || !backdrop || !drawer) return () => {};

	let previousActiveElement: HTMLElement | null = null;
	const getFocusableElements = (): HTMLElement[] =>
		Array.from(
			drawer.querySelectorAll<HTMLElement>(
				'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			),
		);

	const closeMenu = (): void => {
		setMenuState(root, openButton, backdrop, drawer, false);
		if (previousActiveElement && document.contains(previousActiveElement)) {
			previousActiveElement.focus();
		}
		previousActiveElement = null;
	};

	const openMenu = (): void => {
		previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		setMenuState(root, openButton, backdrop, drawer, true);
		requestAnimationFrame(() => {
			drawer.querySelector<HTMLElement>("[data-menu-first]")?.focus();
		});
	};

	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			event.preventDefault();
			closeMenu();
			return;
		}
		if (event.key !== "Tab" || drawer.hidden) return;

		const focusableElements = getFocusableElements();
		if (focusableElements.length === 0) return;
		const first = focusableElements[0];
		const last = focusableElements[focusableElements.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	openButton.addEventListener("click", openMenu);
	closeButton.addEventListener("click", closeMenu);
	backdrop.addEventListener("click", closeMenu);
	drawer.addEventListener("click", (event) => {
		if (event.target instanceof Element && event.target.closest("[data-menu-link]")) {
			closeMenu();
		}
	});
	document.addEventListener("keydown", onKeyDown);

	return (): void => {
		openButton.removeEventListener("click", openMenu);
		closeButton.removeEventListener("click", closeMenu);
		backdrop.removeEventListener("click", closeMenu);
		document.removeEventListener("keydown", onKeyDown);
		closeMenu();
	};
};

const init = (): void => {
	const root = document.getElementById("lithos-landing");
	if (!root || root.dataset.initialized === "true") return;
	root.dataset.initialized = "true";
	const cleanups = [initSpotlight(root), initMobileMenu(root)];
	window.addEventListener(
		"pagehide",
		() => cleanups.forEach((cleanup) => cleanup()),
		{ once: true },
	);
};

init();
