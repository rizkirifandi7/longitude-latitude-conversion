import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { toLonLat } from "ol/proj";

/**
 * Komponen MapComponent untuk menampilkan peta dan menangani interaksi peta.
 * @param {Object} props - Properti yang diteruskan ke komponen.
 * @param {Function} props.onAddToMap - Fungsi yang dipanggil ketika titik ditambahkan ke peta.
 * @param {Array} props.targetPoint - Titik target untuk ditampilkan di peta.
 * @returns {JSX.Element} Elemen JSX yang mewakili komponen peta.
 */

// eslint-disable-next-line react/prop-types
const MapComponent = ({ onAddToMap, targetPoint }) => {
	const mapRef = useRef();
	const [vectorSource] = useState(new VectorSource());

	useEffect(() => {
		if (!mapRef.current) {
			mapRef.current = new Map({
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
					new VectorLayer({
						source: vectorSource,
					}),
				],
				target: "map",
				view: new View({
					center: [0, 0],
					zoom: 2,
				}),
			});

			mapRef.current.on("click", function (event) {
				const lonLat = toLonLat(event.coordinate);
				onAddToMap(lonLat[1], lonLat[0]);
			});
		}

		if (targetPoint) {
			const [longitude, latitude] = targetPoint;
			const view = mapRef.current.getView();
			view.animate({
				center: fromLonLat([longitude, latitude]),
				duration: 1000,
				zoom: 10,
			});

			// Add a new feature for the new point
			const pointFeature = new Feature({
				geometry: new Point(fromLonLat([longitude, latitude])),
			});
			pointFeature.setStyle(
				new Style({
					image: new Icon({
						src: "https://openlayers.org/en/latest/examples/data/icon.png", // replace this with the url of your marker image
					}),
				})
			);
			vectorSource.addFeature(pointFeature);
		}
	}, [onAddToMap, targetPoint, vectorSource]);

	return (
		<div>
			<div id="map" className="w-full h-screen"></div>
		</div>
	);
};

export default MapComponent;
