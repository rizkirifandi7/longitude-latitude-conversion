/**
 * Mengonversi koordinat dalam format Degree Minute Second (DMS) ke Decimal Degrees (DD).
 * @param {string} dms - Koordinat dalam format DMS (misalnya "40 26 46 N").
 * @returns {number} Koordinat dalam format DD.
 */
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

/**
 * Mengonversi koordinat dalam format Decimal Degrees (DD) ke Degree Minute Second (DMS).
 * @param {number} dd - Koordinat dalam format DD.
 * @returns {string} Koordinat dalam format DMS.
 */
export function convertDdToDms(dd) {
	const deg = Math.floor(dd);
	const minFloat = (dd - deg) * 60;
	const min = Math.floor(minFloat);
	const sec = Math.round((minFloat - min) * 60);
	return `${deg}° ${min}' ${sec}"`;
}
