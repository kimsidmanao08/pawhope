import React, { useState } from 'react';
import { encryptAES, decryptAES, encryptCaesar, decryptCaesar } from '../cryptoUtils';

export default function CryptoDemo() {
  const [textInput, setTextInput] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('AES');
  const [encryptedOutput, setEncryptedOutput] = useState('');
  const [decryptedOutput, setDecryptedOutput] = useState('');

  const handleEncrypt = async () => {
    if (!textInput) return;
    if (selectedMethod === 'AES') {
      const encrypted = await encryptAES(textInput);
      setEncryptedOutput(encrypted);
    } else {
      const encrypted = encryptCaesar(textInput, 5);
      setEncryptedOutput(encrypted);
    }
    setDecryptedOutput('');
  };

  const handleDecrypt = async () => {
    if (!encryptedOutput) return;
    if (selectedMethod === 'AES') {
      const decrypted = await decryptAES(encryptedOutput);
      setDecryptedOutput(decrypted);
    } else {
      const decrypted = decryptCaesar(encryptedOutput, 5);
      setDecryptedOutput(decrypted);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '20px', color: '#fff' }}>
      <h2>PawHope Encryption & Decryption Module</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Select Algorithm: </label>
        <select 
          value={selectedMethod} 
          onChange={(e) => {
            setSelectedMethod(e.target.value);
            setEncryptedOutput('');
            setDecryptedOutput('');
          }}
          style={{ padding: '6px', marginLeft: '10px' }}
        >
          <option value="AES">AES-256-GCM (Modern Symmetric)</option>
          <option value="Caesar">Caesar Cipher (Classic Shift)</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter sensitive string..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>

      <button onClick={handleEncrypt} style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}>
        Encrypt
      </button>
      <button onClick={handleDecrypt} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Decrypt
      </button>

      {encryptedOutput && (
        <div style={{ marginTop: '20px', background: '#1e1e1e', padding: '15px', borderRadius: '6px' }}>
          <strong>Ciphertext ({selectedMethod}):</strong>
          <p style={{ wordBreak: 'break-all', color: '#4caf50', fontFamily: 'monospace' }}>{encryptedOutput}</p>
        </div>
      )}

      {decryptedOutput && (
        <div style={{ marginTop: '15px', background: '#1e1e1e', padding: '15px', borderRadius: '6px' }}>
          <strong>Decrypted Output:</strong>
          <p style={{ color: '#ffb74d', fontFamily: 'monospace' }}>{decryptedOutput}</p>
        </div>
      )}
    </div>
  );
}