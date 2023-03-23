// Hooks.on("dropCanvasData", async (canvas, document) => { 

// })

/**
 * Called on the dropCanvasData Hook, allows users to drag and drop folders of actors to place all of them at once
 * @param  {...*} args Arguments passed from the hook
 * 
 */
export async function dropfolder(...args){
	const doc = args[1];
	if(doc.type !== "Folder" && doc.documentName !== "Actor") return;

	//get the id from the uuid
	const rootFolder = game.folders.get(doc.uuid.match(/\.(\w+)$/)[1]);
	const ActorGroups = [rootFolder.contents];
	const folders = [];
	folders.push(...rootFolder.children);

	while(folders.length){
		folders.push(...folders[0].children); 
		ActorGroups.push(folders[0].contents);
		folders.shift();
	}

	if(ActorGroups.length == 0) return;

	let xOffset = 0;
	let yOffset = 0;
	
	for (const content of ActorGroups) {
		let largestHeight = 0;

		if(!content.length) continue;
		for (const actor of content) {
			const tokenData = actor.prototypeToken.toJSON();
			tokenData.x = doc.x + xOffset;
			tokenData.y = doc.y + yOffset;
			await TokenDocument.create(tokenData, { parent: canvas.scene });
			xOffset += tokenData.width * canvas.grid.size;

			if(tokenData.height * canvas.grid.size > largestHeight){
				largestHeight = tokenData.height * canvas.grid.size;
			}
		}
		yOffset += largestHeight;
		xOffset = 0;
	}
}
