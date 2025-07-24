const fs = require('fs');
const { execSync } = require('child_process');

module.exports = async () => {
  const reportFolder = 'playwright-report';
  const zipFile = 'playwright_report.zip';

  // Wait until the report folder is created (max 10 seconds)
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(reportFolder)) {
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  if (fs.existsSync(reportFolder)) {
    console.log('Zipping playwright-report...');
    try{
    execSync(`powershell Compress-Archive -Path "${reportFolder}" -DestinationPath "${zipFile}" -Force`, {
      stdio: 'inherit'
    });
    }catch (error){

    }

  } else {
    console.warn('playwright-report folder not found, skipping zip.');
  }
};