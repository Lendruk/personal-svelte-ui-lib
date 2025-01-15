// helper script for creating the index.ts file for all components
import fs from 'fs';

function processIndexFile(indexPath, componentsPath) {
	let indexContent = '';

	function processComponents(folderPath) {
		const components = fs.readdirSync(folderPath);
		const localFolderPath = folderPath.replace('./src/lib/', '');
		for (const component of components) {
			if (component.endsWith('.ts')) {
				continue;
			}

			if (component.includes('.svelte')) {
				const componentName = component.replace('.svelte', '');
				indexContent += `export { default as ${componentName} } from './${localFolderPath}/${component}';\n`;
			} else {
				processComponents(`${folderPath}/${component}`);
			}
		}
	}

	processComponents(componentsPath);

	fs.writeFileSync(indexPath, indexContent);
}

processIndexFile('./src/lib/icons/index.ts', './src/lib/icons');
