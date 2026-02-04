#!/usr/bin/env node
/* Generate an ed25519 SSH keypair using Node crypto */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const keyDir = path.join(__dirname, '.ssh');
if (!fs.existsSync(keyDir)) fs.mkdirSync(keyDir, { recursive: true });

const privateKeyFile = path.join(keyDir, 'id_ed25519_my_service');
const publicKeyFile = path.join(keyDir, 'id_ed25519_my_service.pub');

// Generate ed25519 keypair
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// Save private key
fs.writeFileSync(privateKeyFile, privateKey, { mode: 0o600 });
console.log(`✓ Private key saved to: ${privateKeyFile}`);

// Convert public key to OpenSSH format
const publicKeyDer = crypto.createPublicKey(privateKey).export({ format: 'der', type: 'spki' });
const publicKeyBase64 = Buffer.from(publicKeyDer).toString('base64');
const sshPublicKey = `ssh-ed25519 ${publicKeyBase64} Dave870-coder@My-service\n`;

fs.writeFileSync(publicKeyFile, sshPublicKey);
console.log(`✓ Public key saved to: ${publicKeyFile}\n`);

console.log('=== PUBLIC KEY (add to GitHub) ===');
console.log(sshPublicKey);
console.log('=== END PUBLIC KEY ===\n');
console.log('Next steps:');
console.log('1. Copy the public key above');
console.log('2. Go to https://github.com/settings/keys');
console.log('3. Click "New SSH key" and paste it');
console.log('4. Come back here and I\'ll push to GitHub');
