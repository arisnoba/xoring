import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const read = path => readFileSync(join(root, path), 'utf8');

const fail = message => {
	console.error(`verify:motion-foundation failed: ${message}`);
	process.exit(1);
};

const ensureIncludes = (content, needle, label) => {
	if (!content.includes(needle)) fail(`${label} missing "${needle}"`);
};

const ensureNotIncludes = (content, needle, label) => {
	if (content.includes(needle)) fail(`${label} unexpectedly includes "${needle}"`);
};

const revealOnScroll = read('src/components/shared/RevealOnScroll.tsx');
const motion = read('src/lib/motion.ts');
const page = read('src/app/page.tsx');

if (!revealOnScroll.startsWith("'use client';")) {
	fail('RevealOnScroll.tsx must start with \'use client\';');
}

['fadeUp', 'fadeIn', 'scaleUp'].forEach(name => {
	ensureIncludes(motion, `export const ${name}`, 'src/lib/motion.ts');
});

const clientSections = [
	'src/components/sections/HeroSection.tsx',
	'src/components/sections/TwoModesSection.tsx',
];

const serverSections = [
	'src/components/sections/BeyondScreenSection.tsx',
	'src/components/sections/SocialModeSection.tsx',
	'src/components/sections/PrivateModeSection.tsx',
	'src/components/sections/AIAgentSection.tsx',
	'src/components/sections/ApplicationSection.tsx',
	'src/components/sections/PocSection.tsx',
	'src/components/sections/Web3Section.tsx',
	'src/components/sections/PioneerSection.tsx',
];

clientSections.forEach(path => {
	const content = read(path);
	if (!content.startsWith("'use client';")) fail(`${path} must remain a client component`);
});

serverSections.forEach(path => {
	const content = read(path);
	if (content.startsWith("'use client';")) fail(`${path} must remain a server component`);
});

const pageOrder = [
	'<Header />',
	'<HeroSection />',
	'<BeyondScreenSection />',
	'<TwoModesSection />',
	'<SocialModeSection />',
	'<PrivateModeSection />',
	'<AIAgentSection />',
	'<ApplicationSection />',
	'<PocSection />',
	'<Web3Section />',
	'<PioneerSection />',
	'<Footer />',
];

let previousIndex = -1;
pageOrder.forEach(token => {
	const nextIndex = page.indexOf(token);
	if (nextIndex === -1) fail(`src/app/page.tsx missing ${token}`);
	if (nextIndex <= previousIndex) fail(`src/app/page.tsx order regression at ${token}`);
	previousIndex = nextIndex;
});

ensureIncludes(revealOnScroll, 'useReducedMotion', 'RevealOnScroll.tsx');
ensureIncludes(revealOnScroll, "from '@/lib/motion'", 'RevealOnScroll.tsx');
ensureNotIncludes(revealOnScroll, 'AnimatePresence', 'RevealOnScroll.tsx');
ensureNotIncludes(revealOnScroll, 'staggerChildren', 'RevealOnScroll.tsx');

console.log('verify:motion-foundation passed');
