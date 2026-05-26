export default async function createdFilesEdit(createdFiles) {

    /* ### debugging createdFiles and check the typeof
        // console.log(createdFiles);
        // console.log(typeof createdFiles);   // object not a array
    */

    // Convert object to array to modify the "createdFiles" content.
    const filesArray = Array.from(createdFiles);

    // To delete items.
    filesArray.pop();

    // To add a new item
    // filesArray.push(join(outDirPath, 'newFile.js'));

    // Reassign back to createdFiles if needed
    createdFiles = filesArray;

    return createdFiles;
}