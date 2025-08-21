import { useEffect, useState } from "react";

const useIsSmallScreen = (breakpoint = 768) => {
	const [isSmall, setIsSmall] = useState(
		typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
	);

	useEffect(() => {
		const handler = () => setIsSmall(window.innerWidth < breakpoint);
		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, [breakpoint]);

	return isSmall;
};

export default useIsSmallScreen;
