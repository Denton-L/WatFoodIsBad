var locationsDict = {};
var inspectionsDict = {};

function parseLocations(file, cb) {
		Papa.parse(file, {
				header: true,
				worker: true,
				chunk: function(results, parser) {
						locationChunk(results.data, parser);
				},
				complete: function(results, file) {
						cb();
				}
		});
}

function parseInspections(file, cb) {
		Papa.parse(file, {
				header: true,
				worker: true,
				chunk: function(results, parser) {
						inspectionChunk(results.data, parser);
				},
				complete: function(results, file) {
                   		cb();
				}
		});
}

function parseInfractions(file, cb) {
		Papa.parse(file, {
				header: true,
				worker: true,
				chunk: function(results, parser) {
						infractionChunk(results.data, parser);
				},
				complete: function(results, file) {
						delete inspectionDict;
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
				if (locationsDict[results[i].FACILITYID] === undefined)
						continue;
				locationsDict[results[i].FACILITYID].inspections.push(inspectionsDict[results[i].INSPECTION_ID] = {
						date: results[i].INSPECTION_DATE,
						requireInspection: results[i].REQUIRE_INSPECTION,
						infractions: []
				});
		}
}

function infractionChunk(results, parser) {
		for (var i = 0; i < results.length; i++) {
				if (inspectionsDict[results[i].FACILITYID] === undefined)
						continue;
				inspectionsDict[results[i].INSPECTION_ID].infractions.push({
						description: results[i].category_code,
						infractionType: results[i].INFRACTION_TYPE
				});
		}
}
