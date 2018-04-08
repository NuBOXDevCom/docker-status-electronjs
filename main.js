const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Tray = electron.Tray

let mainWindow

function createWindow() {
    const tray = new Tray('assets/logo.png')
    tray.setToolTip('NuBOX DevCom Docker Status')
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 800,
        center: true,
        movable: true,
        closable: true,
        fullscreen: false,
        autoHideMenuBar: true,
        icon: 'assets/logo.png',
        title: 'NuBOX DevCom Docker Status',
        frame: true
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})