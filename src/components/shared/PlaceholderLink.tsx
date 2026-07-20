'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';

type PlaceholderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	alertMessage: string;
};

export default function PlaceholderLink({ alertMessage, onClick, href = '#', ...props }: PlaceholderLinkProps) {
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		onClick?.(event);
		window.alert(alertMessage);
	};

	return <a {...props} href={href} onClick={handleClick} />;
}
