import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { PythonShell } from 'python-shell'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  // Handle download requests from the frontend
  ipcMain.handle('start-download', async (event, options) => {
    return new Promise((resolve, reject) => {
      const pythonPath = path.join(__dirname, '../pyscripts/main.py')
      
      let pyshell = new PythonShell(pythonPath, {
        mode: 'json',
        pythonOptions: ['-u'], // unbuffered output
      })

      pyshell.send(JSON.stringify(options))

      pyshell.on('message', (message) => {
        resolve(message)
      })

      pyshell.on('error', (error) => {
        reject(error)
      })

      pyshell.end((err) => {
        if (err) reject(err)
      })
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})