import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractResume() {
  const resumePath = path.join(__dirname, '../attached_assets', 'K A Ranjan Resume - 2025.pdf');

  try {
    const dataBuffer = await readFile(resumePath);
    const pdfData = await pdf(Buffer.from(dataBuffer));
    console.log('Resume Content:');
    console.log('------------------------');
    console.log(pdfData.text);
  } catch (err) {
    console.error('Error reading PDF:', err);
    process.exit(1);
  }
}

extractResume();