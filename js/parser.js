var locationsDict = {};
var inspectionsDict = {};
var notifyLocationsDone;
var notifyInspectionsDone;
var notifyInfractionsDone;

function parseLocations(file, cb) {
		Papa.parse(file, {
				header: true,
				worker: true,
				chunk: locationChunk,
				complete: function(results, file) {
                    console.log("yolo1");
						cb();
				}
		});
}

function parseInspections(file, cb) {
		Papa.parse(file, {
				header: true,
				worker: true,
				chunk: inspectionChunk,
				complete: function(results, file) {
					console.log("yolo2");	
                    cb();
				}
		});
}

function parseInfractions(file, cb) {
		Papa.parse(file, {
				header: true,
				worker: true,
				chunk: infractionChunk,
				complete: function(results, file) {
						delete inspectionsDict;
                    console.log("yolo3");
						cb();
				}
		});
}

function locationChunk(results, parser) {
		for (var i = 0; i < results.length; i++) {
				locationsDict[results[i].FACILITYID] = {
						name: results[i].BUSINESS_NAME,
						address: results[i].ADDR,
						city: results[i].CITY,
						numCritical: 0,
						numNonCritical: 0,
						inspections: []
				};
		}
}

function inspectionChunk(results, parser) {
		for (var i = 0; i < results.length; i++) {
				locationsDict[results[i].FACILITYID].inspections.push(inspectionsDict[results[i].INSPECTION_ID] = {
						date: INSPECTION_DATE,
						requireInspection: REQUIRE_INSPECTION,
						infractions: []
				});
		}
}

function infractionChunk(results, parser) {
		for (var i = 0; i < results.length; i++) {
				inspectionsDict[results[i].INSPECTION_ID].infractions.push({
						description: category_code,
						infractionType: INFRACTION_TYPE
				});
		}
}
