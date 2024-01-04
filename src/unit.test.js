import { convertDmsToDd, convertDdToDms } from "./utils/conversionUtils";

// Test untuk convertDmsToDd
test("Convert DMS to DD - Northern Hemisphere", () => {
	const result = convertDmsToDd("49 30 10 N");
	expect(result).toBeCloseTo(49.50278);
});

test("Convert DMS to DD - Southern Hemisphere", () => {
	const result = convertDmsToDd("49 30 10 S");
	expect(result).toBeCloseTo(-49.50278);
});

// Test untuk convertDdToDms
test("Convert DD to DMS - Positive Value", () => {
	const result = convertDdToDms(49.50278);
	expect(result).toEqual("49° 30' 10\"");
});

test("Convert DD to DMS - Negative Value", () => {
	const result = convertDdToDms(-49.50278);
	expect(result).toEqual("-50° 29' 50\"");
});
