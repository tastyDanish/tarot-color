export const starPath = (r: number, rotation: number = 0): string => {
	const pts = 4;
	const innerR = r * 0.3;
	const cpDist = r * 0.45;

	const parts: string[] = [];

	for (let i = 0; i < pts; i++) {
		const angle = (i / pts) * Math.PI * 2 + rotation;
		const nextAngle = ((i + 1) / pts) * Math.PI * 2 + rotation;
		const midAngle = (angle + nextAngle) / 2;

		const tipX = Math.cos(angle) * r;
		const tipY = Math.sin(angle) * r;
		const waistX = Math.cos(midAngle) * innerR;
		const waistY = Math.sin(midAngle) * innerR;
		const nextTipX = Math.cos(nextAngle) * r;
		const nextTipY = Math.sin(nextAngle) * r;
		const cp1X = Math.cos(angle) * cpDist;
		const cp1Y = Math.sin(angle) * cpDist;
		const cp2X = Math.cos(nextAngle) * cpDist;
		const cp2Y = Math.sin(nextAngle) * cpDist;

		if (i === 0) parts.push(`M ${tipX} ${tipY}`);
		parts.push(`Q ${cp1X} ${cp1Y} ${waistX} ${waistY}`);
		parts.push(`Q ${cp2X} ${cp2Y} ${nextTipX} ${nextTipY}`);
	}

	parts.push("Z");
	return parts.join(" ");
};
