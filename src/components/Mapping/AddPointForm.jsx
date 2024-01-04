import { useState } from "react";
import { convertDmsToDd, convertDdToDms } from "../../utils/conversionUtils";

/**
 * Komponen AddPointForm untuk menambahkan titik ke peta.
 * @param {Object} props - Properti yang diteruskan ke komponen.
 * @param {Function} props.onAddToMap - Fungsi yang dipanggil ketika titik ditambahkan ke peta.
 */

// eslint-disable-next-line react/prop-types
const AddPointForm = ({ onAddToMap }) => {
	const [tab, setTab] = useState("DMS to DD");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [output, setOutput] = useState("");

	/**
	 * Menangani konversi koordinat.
	 */
	const handleConvert = () => {
		if (latitude && longitude) {
			if (tab === "DMS to DD") {
				const latDd = convertDmsToDd(latitude);
				const lonDd = convertDmsToDd(longitude);
				setOutput({ lat: `${latDd}°`, lon: `${lonDd}°` });
			} else {
				const latDms = convertDdToDms(parseFloat(latitude));
				const lonDms = convertDdToDms(parseFloat(longitude));
				setOutput({ lat: `${latDms}`, lon: `${lonDms}` });
			}
		}
	};

	/**
	 * Menangani penambahan titik ke peta.
	 */
	const handleAddToMap = () => {
		if (output) {
			onAddToMap(parseFloat(output.lat), parseFloat(output.lon));
		}
	};

	return (
		<div className="absolute top-0 right-0 m-4 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
			<h2 className="text-lg font-semibold mb-4 text-blue-600">Add Point to Map</h2>
			<div className="flex space-x-4 mb-4">
				<button
					onClick={() => setTab("DMS to DD")}
					className={`px-4 py-2 rounded w-full h-12 ${
						tab === "DMS to DD" ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-500"
					}`}
				>
					DMS to DD
				</button>
				<button
					onClick={() => setTab("DD to DMS")}
					className={`px-4 py-2 rounded w-full h-12 ${
						tab === "DD to DMS" ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-500"
					}`}
				>
					DD to DMS
				</button>
			</div>
			<div className="flex flex-col mb-4">
				<label htmlFor="latitude" className="mb-2 text-gray-600">
					Latitude (
					{tab === "DMS to DD" ? "DMS format: degrees minutes seconds direction" : "DD format: decimal degrees"}):
				</label>
				<input
					type="text"
					id="latitude"
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
					placeholder={tab === "DMS to DD" ? "e.g. 40 26 46 N" : "e.g. 40.446"}
					className="border border-gray-300 rounded p-2 w-full h-12"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<label htmlFor="longitude" className="mb-2 text-gray-600">
					Longitude (
					{tab === "DMS to DD" ? "DMS format: degrees minutes seconds direction" : "DD format: decimal degrees"}):
				</label>
				<input
					type="text"
					id="longitude"
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
					placeholder={tab === "DMS to DD" ? "e.g. 73 58 56 W" : "e.g. -73.982"}
					className="border border-gray-300 rounded p-2 w-full h-12"
				/>
			</div>
			<button onClick={handleConvert} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full h-12">
				Convert
			</button>
			<div className="flex flex-col mb-4">
				<label htmlFor="outputLat" className="mb-2 text-gray-600">
					Latitude:
				</label>
				<input
					type="text"
					id="outputLat"
					value={output.lat}
					readOnly
					className="border border-gray-300 rounded p-2 w-full h-12"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<label htmlFor="outputLon" className="mb-2 text-gray-600">
					Longitude:
				</label>
				<input
					type="text"
					id="outputLon"
					value={output.lon}
					readOnly
					className="border border-gray-300 rounded p-2 w-full h-12"
				/>
			</div>
			<button onClick={handleAddToMap} className="bg-blue-500 text-white px-4 py-2 rounded w-full h-12">
				Add to Map
			</button>
		</div>
	);
};

export default AddPointForm;
