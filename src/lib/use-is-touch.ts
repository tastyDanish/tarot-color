import { useEffect, useState } from "react";

const useIsTouchDevice = () => {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const update = () => {
			const hasTouch = "ontouchstart" in window ||
				navigator.maxTouchPoints > 0 ||
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(navigator as any).msMaxTouchPoints > 0;

			const ua = navigator.userAgent;
			const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);

			setIsTouch(hasTouch || isMobileUA);
		};

		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return isTouch;
};

export default useIsTouchDevice;
