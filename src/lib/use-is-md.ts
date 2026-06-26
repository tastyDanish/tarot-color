import { useEffect, useState } from "react";

export const useIsMd = () => {
	const [isMd, setIsMd] = useState(() =>
		window.matchMedia("(min-width: 768px)").matches
	);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	return isMd;
};
