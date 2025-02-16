"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const python_shell_1 = require("python-shell");
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        autoHideMenuBar: true,
    });
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173');
    }
    else {
        mainWindow.loadFile(path_1.default.join(__dirname, '../dist/index.html'));
    }
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    // Handle download requests from the frontend
    electron_1.ipcMain.handle('start-download', async (event, options) => {
        return new Promise((resolve, reject) => {
            const pythonPath = path_1.default.join(__dirname, '../pyscripts/main.py');
            let pyshell = new python_shell_1.PythonShell(pythonPath, {
                mode: 'json',
                pythonOptions: ['-u'], // unbuffered output
            });
            pyshell.send(JSON.stringify(options));
            pyshell.on('message', (message) => {
                resolve(message);
            });
            pyshell.on('error', (error) => {
                reject(error);
            });
            pyshell.end((err) => {
                if (err)
                    reject(err);
            });
        });
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
