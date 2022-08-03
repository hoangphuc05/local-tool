const {app, BrowserWindow, ipcMain, dialog} = require('electron')
let examplePage = {
    displayName: "Example Page",
    page: () => {
        return (```
            <h1 className="text-3xl">This is an example page</h1>
            ```
        )
    },
    ipcName: "exampleFilePicker",
    mainFunction: async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog();
        if (canceled) {
            return;
        } else {
            return filePaths[0];
        }
    }
}

module.exports = examplePage;