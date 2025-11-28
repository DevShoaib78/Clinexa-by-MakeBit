#!/usr/bin/env node

/**
 * Script to update Open Graph URLs in dist/index.html after deployment
 * 
 * Usage:
 *   node update-og-urls.js https://your-site-name.netlify.app
 */

const fs = require('fs');
const path = require('path');

const deployUrl = process.argv[2];

if (!deployUrl) {
  console.error('❌ Error: Please provide your deployment URL');
  console.log('\nUsage: node update-og-urls.js <YOUR_DEPLOY_URL>');
  console.log('Example: node update-og-urls.js https://nexbid.netlify.app');
  process.exit(1);
}

// Ensure URL doesn't end with a slash
const baseUrl = deployUrl.replace(/\/$/, '');
const indexPath = path.join(__dirname, 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: dist/index.html not found. Please run "npm run build" first.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Replace all instances of YOUR_DEPLOY_URL
const updatedHtml = html.replace(/YOUR_DEPLOY_URL/g, baseUrl);

fs.writeFileSync(indexPath, updatedHtml, 'utf8');

console.log('✅ Successfully updated Open Graph URLs!');
console.log(`   Base URL: ${baseUrl}`);
console.log('\n📋 Updated meta tags:');
console.log('   - og:url');
console.log('   - og:image');
console.log('   - twitter:url');
console.log('   - twitter:image');
console.log('   - canonical');
console.log('\n🚀 You can now deploy the dist folder to Netlify!');


