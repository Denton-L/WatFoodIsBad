function rank(locations) {
	for (var i = 0; i < locations.length; i++) {
		rank = 0
		var location = locations[i];
		for (var j = 0; j < location['inspections'].length; j++) {
			var inspection = location['inspections'][j];
			dateInMillis = new Date(date).getTime();
			now = new Date().getTime();
			numYears = (now-dateInMillis)/(365*24*60*60*1000);
			for (var k = 0; k < inspection['infractions'].length; k++) {
				var infraction = inspection['infractions'][k];
				if (infraction['infractionType'] == 'CRITICAL') {
					rank += Math.pow(0.8,numYears);
				}
				else if (infraction['infractionType'] == 'NON-CRITICAL') {
					rank += 0.5*Math.pow(0.8,numYears);
				}
			}	
		}
		location['rank'] = rank/location['inspections'].length;
	}
}



function getTopTen(locations) {
	top = [];
	for (var j = 0; j < locations.length; j++) {
		var location = locations[j];
		rank = location['rank'];
		var i = 0;
		while(i < 10 ) {
			if (rank > top[i]['rank']){
				top.splice(i, 0, location);
				break;
			}
			i += 1;
		}
	}
	return top;
} 