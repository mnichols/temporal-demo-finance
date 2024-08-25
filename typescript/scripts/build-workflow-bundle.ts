import {bundleWorkflowCode} from '@temporalio/worker';
import {writeFile} from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bundle() {
    const {code} = await bundleWorkflowCode({
        workflowsPath: path.join(__dirname, '../src/domain/workflows'),
    });
    const codePath = path.join(__dirname, '../build/workflow-bundle.js');

    await writeFile(codePath, code);
    console.log(`Bundle written to ${codePath}`);
}

bundle().catch((err) => {
    console.error(err);
    process.exit(1);
});