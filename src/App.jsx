import { useState } from "react";
import MapComponent from "./components/Mapping/MapComponent";
import AddPointForm from "./components/Mapping/AddPointForm";

const App = () => {
	const [showAddPointForm, setShowAddPointForm] = useState(false);
	const [points, setPoints] = useState([]);
	const [targetPoint, setTargetPoint] = useState(null);

	const handleAddToMap = (latitude, longitude) => {
		setPoints([...points, { latitude, longitude }]);
		setTargetPoint([longitude, latitude]);
	};

	return (
		<>
			<MapComponent onAddToMap={handleAddToMap} targetPoint={targetPoint} />
			{showAddPointForm && <AddPointForm onAddToMap={handleAddToMap} />}
			<button
				onClick={() => setShowAddPointForm(!showAddPointForm)}
				className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded"
			>
				{showAddPointForm ? "Hide Form" : "Add Marker"}
			</button>
		</>
	);
};

export default App;

