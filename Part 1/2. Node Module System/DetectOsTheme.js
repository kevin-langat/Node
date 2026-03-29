const { exec } = require('child_process');

exec(
  'reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v AppsUseLightTheme',
  (error, stdout) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    const isLight = stdout.includes('0x1');
    console.log(isLight ? 'Light Mode' : 'Dark Mode');
  }
);
