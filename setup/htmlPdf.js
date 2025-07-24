// htmlToPdf.js
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Configuration
const inputHtmlFilePath = path.join(__dirname, '../playwright-report', 'index.html'); // Path to your HTML file
const outputPdfFilePath = path.join(__dirname, 'report.pdf'); // Desired output PDF path

async function convertHtmlToPdf() {
  if (!fs.existsSync(inputHtmlFilePath)) {
    console.error(`Error: HTML file not found at ${inputHtmlFilePath}`);
    process.exit(1);
  }

  console.log(`Converting "${inputHtmlFilePath}" to "${outputPdfFilePath}"...`);

  const browser = await chromium.launch(); // Launch Chromium browser
  const page = await browser.newPage();    // Open a new page

  try {
    // Navigate to the local HTML file
    // Playwright needs a file:// URL for local files
    const fileUrl = `file:///${inputHtmlFilePath.replace(/\\/g, '/')}`; // Convert backslashes for URL on Windows
    await page.goto(fileUrl);

    // Wait for network idle or a specific element to ensure content is loaded
    // Adjust this based on your HTML file's complexity (e.g., if it loads data dynamically)
    await page.waitForLoadState('networkidle');

    // Save the page as PDF
    await page.pdf({
      path: outputPdfFilePath,
      format: 'A4',             // Or 'Letter', 'Legal', or custom { width, height }
      printBackground: true,    // Include background colors/images
      // You can add more options like:
      // scale: 0.8,
      // margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      // landscape: true,
      // displayHeaderFooter: true,
      // headerTemplate: '<div>Your Header</div>',
      // footerTemplate: '<div>Your Footer</div>',
    });

    console.log(`PDF saved successfully to: ${outputPdfFilePath}`);

  } catch (error) {
    console.error('Error during HTML to PDF conversion:', error);
  } finally {
    await browser.close(); // Close the browser
  }
}

convertHtmlToPdf();