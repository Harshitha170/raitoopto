const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\\\Users\\\\jhars\\\\OneDrive\\\\Desktop\\\\Raittoopto\\\\frontend\\\\public\\\\ref_images';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  'https://demo.laserxprts.com/images/remanufacture-banner.jpeg',
  'https://demo.laserxprts.com/images/remanufacturing.webp',
  'https://demo.laserxprts.com/images/turbo-img.webp',
  'https://demo.laserxprts.com/images/turbo-diagram.webp',
  'https://demo.laserxprts.com/images/fanuc-img.webp',
  'https://demo.laserxprts.com/images/fanuc-diagram.webp',
  'https://demo.laserxprts.com/images/adaptive-1.webp',
  'https://demo.laserxprts.com/images/adaptive-2.webp',
  'https://demo.laserxprts.com/images/adaptive3.webp',
  'https://demo.laserxprts.com/images/oem-img.webp'
];

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  
  // Set a human-like user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  for (let url of images) {
    try {
      console.log('Fetching', url);
      const viewSource = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const filename = path.basename(url);
      const destPath = path.join(targetDir, filename);
      fs.writeFileSync(destPath, await viewSource.buffer());
      console.log('Saved', destPath);
    } catch (e) {
      console.error('Failed to fetch', url, e.message);
    }
  }
  
  await browser.close();
})();
