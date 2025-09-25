export const fileSystem = {
  '/home/janhvi': {
    type: 'folder',
    children: {
      'projects': {
        type: 'folder',
        children: {
          'web-dev': { type: 'folder', children: {} },
          'machine-learning': { type: 'folder', children: {} },
          'mobile-apps': { type: 'folder', children: {} }
        }
      },
      'documents': {
        type: 'folder',
        children: {
          'resume.pdf': { type: 'file', size: '145KB' },
          'transcript.pdf': { type: 'file', size: '89KB' }
        }
      },
      'scripts': {
        type: 'folder',
        children: {
          'deploy.sh': { type: 'file', size: '4KB' },
          'backup.py': { type: 'file', size: '12KB' }
        }
      }
    }
  }
};