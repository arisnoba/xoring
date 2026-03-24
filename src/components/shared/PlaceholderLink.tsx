'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { PLACEHOLDER_ALERT_MESSAGE } from '@/lib/site';

type PlaceholderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function PlaceholderLink({ onClick, href = '#', ...props }: PlaceholderLinkProps) {
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		onClick?.(event);
		window.alert(PLACEHOLDER_ALERT_MESSAGE);
	};

	return <a {...props} href={href} onClick={handleClick} />;
}
