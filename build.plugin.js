import {
  copyFileSync,
  writeFileSync,
  readFileSync
} from 'fs'
import {
  join
} from 'path'

export default function copyFileBuildPlugin(fileNameList, targetFolderPath) {
  return {
    name: 'build-end',
    resolveId: {
      order: 'post',
      handler(source) {
        fileNameList.forEach(fileName => {
          if (fileName === 'package.json') {
            const packageData = JSON.parse(readFileSync(fileName))
            delete packageData['devDependencies']
            console.log(packageData)
            return writeFileSync(join(targetFolderPath, fileName), JSON.stringify(packageData))
          }
          copyFileSync(`${fileName}`, join(targetFolderPath, fileName))
        })
      }
    }
  };
}
