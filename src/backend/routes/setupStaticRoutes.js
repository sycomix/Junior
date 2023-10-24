import path from 'path';
import express from 'express';

export function setupStaticRoutes(app) {
    const currentFilePath = new URL(import.meta.url).pathname;
    const currentDirPath = path.dirname(currentFilePath);

    let levelsUp = currentFilePath.includes('dist/backend/') ? 2 : 4;
    const projectRoot = path.resolve(currentDirPath, ...Array(levelsUp).fill('..'));
    const frontendDistPath = path.join(projectRoot, 'dist', 'frontend');
    app.use('/', express.static(frontendDistPath));
}

