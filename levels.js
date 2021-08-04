function level1(core, Enemy1){

	let tile = Math.round(core.GAME_WIDTH / 21);
	
	const wave1 = [
		[0, 1000],
		[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
		[1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1]

	]

	const wave2 = [
		[0],
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
	]

	const wave3 = [
		[0, 250, 600],
		[0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
	]

	const wave4 = [
		[0, 1000, 2000, 3600, 4600, 5600,],
		[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0]
	]

	const wave5 = [
		[0, 350, 1000, 1350,],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
		[1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1]
	]
	
	const wave6 = [
		[0, 450, 900, 2000, 2350, 2700, 3300,],
		[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
		[0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0],
		[0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0]

	]
	
	setTimeout(() => {
	for (let i = 1; i < wave1.length; i++) {
		let row = wave1[i];
	
		for (let j = 0; j < row.length; j++) {
			if(row[j] === 1){
				let position = {
					x: tile * j,
					y: -tile ,
				};
	
			setTimeout(() => {
				core.hostileObjects.push(new Enemy1(core, position));
			}, wave1[0][(i - 1)]);
				
	
			}	
		}
	}
	}, 1000);




	setTimeout(() => {
		for (let i = 1; i < wave2.length; i++) {
			let row = wave2[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave2[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 4000);




	setTimeout(() => {
		for (let i = 1; i < wave3.length; i++) {
			let row = wave3[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave3[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 8000);




	setTimeout(() => {
		for (let i = 1; i < wave4.length; i++) {
			let row = wave4[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave4[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 16000);




	setTimeout(() => {
		for (let i = 1; i < wave5.length; i++) {
			let row = wave5[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave5[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 24000);

	setTimeout(() => {
		for (let i = 1; i < wave6.length; i++) {
			let row = wave6[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave6[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 32000);
}
	
export {level1};