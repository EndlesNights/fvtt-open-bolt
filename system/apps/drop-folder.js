// Hooks.on("dropCanvasData", async (canvas, document) => { 

// })

export async function dropfolder(...args){
	// const canvas = args[0];
	console.log(canvas)
	const doc = args[1];
	console.log(doc)
	if(doc.type !== "Folder" && doc.documentName !== "Actor") return;

	const rootFolder = game.folders.get(doc._id);
	console.log(game.folders);
	console.log(doc.id);
	const ActorGroups = [rootFolder.content];
	const folders = [];
	folders.push(...rootFolder.children);


	console.log(folders)
	while(folders.length){
		folders.push(...folders[0].children); 
		ActorGroups.push(folders[0].content);
		folders.shift();
	}

	if(ActorGroups.length == 0) return;

	let xOffset = 0;
	let yOffset = 0;
	for (const content of ActorGroups) {
		if(!content.length) continue;
		for (const actor of content) {
			const tokenData = actor.data.token.toJSON();
			tokenData.x = doc.x + xOffset;
			tokenData.y = doc.y + yOffset;
			await TokenDocument.create(tokenData, { parent: canvas.scene });
			xOffset += 100;
		}
		yOffset += 100;
		xOffset = 0;
	}
}
