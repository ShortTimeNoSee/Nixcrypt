const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const isDevelopment = !app.isPackaged;

const pythonScriptPath = isDevelopment
    ? path.join(__dirname, 'resources', 'encrypt.py')  // For development
    : path.join(process.resourcesPath, 'encrypt.exe'); // For production

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.maximize();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('sign-message', async (event, message, privateKey) => {
    try {
        if (!fs.existsSync(pythonScriptPath)) {
            throw new Error(`Python script not found at path: ${pythonScriptPath}`);
        }

        const escapedMessage = message.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        const escapedPrivateKey = privateKey.replace(/"/g, '\\"').replace(/\n/g, '\\n');

        const result = await new Promise((resolve, reject) => {
            const command = isDevelopment 
                ? `python "${pythonScriptPath}" "${escapedMessage}" "${escapedPrivateKey}"`
                : `"${pythonScriptPath}" "${escapedMessage}" "${escapedPrivateKey}"`;

            exec(command, (error, stdout, stderr) => {
                if (error || stderr) {
                    // Catch and simplify known errors
                    if (stderr.includes('Could not deserialize key data')) {
                        reject('Invalid private key format or unsupported key type.');
                    } else {
                        reject(`Unexpected error: ${stderr || error.message}`);
                    }
                }
                resolve(stdout.trim());
            });
        });
        return result;
    } catch (error) {
        console.error(`IPC Error: ${error}`);
        throw error;
    }
});