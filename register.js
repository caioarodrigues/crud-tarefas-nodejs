import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import moduleAlias from 'module-alias';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

moduleAlias.addAliases({
  '@': resolve(__dirname, './src')
});