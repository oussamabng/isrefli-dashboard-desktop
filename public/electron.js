const { app, BrowserWindow ,Menu,dialog} = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    },
    minHeight: 700,
    minWidth: 1000,
  })
  // Open the DevTools.
  win.webContents.openDevTools()

  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname,"../build/index.html")}`
  )
}

 const template = [
    {
      label: "File",
      submenu: [{ role: "reload" }, { role: "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        {
          role: "undo",
        },
        {
          role: "redo",
        },
        {
          type: "separator",
        },
        {
          role: "cut",
        },
        {
          role: "copy",
        },
        {
          role: "paste",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          role: "zoomIn",
        },
        {
          role: "zoomOut",
        },
        {
          role: "resetZoom",
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})