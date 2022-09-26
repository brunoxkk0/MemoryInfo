const {app, BrowserWindow} = require("electron");
const path = require("path");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 250,
        height: 219,
        transparent: true,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        webPreferences:{
            preload: path.join(__dirname, 'src/preloader.js')
        }
    });

    window.loadFile("./src/index.html").then(r =>
        console.log("index.html loaded...")
    );

    window.setPosition(0,0);
}

app.whenReady().then(() => {

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })

})

app.addListener("window-all-closed", (event) => {
    if(process.platform !== "darwin"){
        app.quit();
    }
})