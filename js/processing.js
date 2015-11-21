function rank(locations) {
	for (location in locations) {
		rank = 0
		for (inspection in location['inspections']) {
			dateInMillis = new Date(date).getTime();
			now = new Date().getTime();
			numYears = (now-dateInMillis)/(365*24*60*60*1000);
			for (infraction in inspection['infractions']) {
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
	for (location in locations) {
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