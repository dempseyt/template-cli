import * as fs from 'fs';
const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    
    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      // Rename
      if (file === '.npmignore') file = '.gitignore';
      
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      
      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
  
  const projectName = newProjectPath.substring(0, newProjectPath.indexOf("/"))
  const projectPath = `${CURR_DIR}/${newProjectPath}/`
  if (newProjectPath.slice(-3) === 'src') {
    createSourceFile(`${projectPath}${projectName}.js`);
    createSourceFile(`${projectPath}${projectName}.test.js`)
  }


};

function createSourceFile(pathToSourceFileToBeCreated) {
  const writePath = `${pathToSourceFileToBeCreated}`;
  fs.writeFileSync(writePath, '', 'utf8');
}

export default createDirectoryContents;