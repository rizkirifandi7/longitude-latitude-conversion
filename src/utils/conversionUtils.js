// Convert DMS to DD
export function convertDmsToDd(dms) {
	const parts = dms.split(" ");
	let degrees = parseFloat(parts[0]);
	let minutes = parseFloat(parts[1]);
	let seconds = parseFloat(parts[2]);
	let direction = parts[3];

	let dd = degrees + minutes / 60 + seconds / (60 * 60);

	if (direction === "S" || direction === "W") {
		dd = dd * -1;
	} // Negate the result if it is in south or west

	return dd;
}

// Convert DD to DMS
export function convertDdToDms(dd) {
	const deg = Math.floor(dd);
	const minFloat = (dd - deg) * 60;
	const min = Math.floor(minFloat);
	const sec = Math.round((minFloat - min) * 60);
	return `${deg}° ${min}' ${sec}"`;
}
