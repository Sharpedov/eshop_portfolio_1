import { useCallback, useEffect, useState } from "react";

export const useDetectOutsideClick = (ref, initialState) => {
	const [isActive, setIsActive] = useState(initialState);

	const escapeListener = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			setIsActive(false);
		}
	}, []);

	const pageClickEvent = (e) => {
		if (ref.current !== null && !ref.current.contains(e.target)) {
			setIsActive(false);
		}
	};

	useEffect(() => {
		const timeout = () =>
			setTimeout(() => {
				if (isActive && ref.current) {
					document.addEventListener("click", pageClickEvent);
					document.addEventListener("keydown", escapeListener);
				}
			}, 1);
		timeout();

		return () => {
			document.removeEventListener("click", pageClickEvent);
			document.removeEventListener("keydown", escapeListener);
		};
	}, [isActive, ref.current]);

	return [isActive, setIsActive];
};
