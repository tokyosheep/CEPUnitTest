export const createListLayers:(layerlist:string[])=>boolean = layerlist => {
    try{
        for(let i = 0;i < layerlist.length;i++) {
            if (layerlist[i] === '') throw new Error('it received empty name');
            const layer = app.activeDocument.layers.add();
            layer.name = layerlist[i];
        }
        return true;
    } catch (e) {
        alert(e);
        return false;
    }
}