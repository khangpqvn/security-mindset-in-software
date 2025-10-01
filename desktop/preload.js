const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('env', {
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
});


