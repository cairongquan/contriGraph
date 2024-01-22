import { copyFileSync } from 'fs'
import { join } from 'path'

export default function copyFileBuildPlugin(fileNameList, targetFolderPath) {
	return {
		name: 'build-end',
		resolveId: {
			order: 'post',
			handler(source) {
        fileNameList.forEach(fileName => {
          copyFileSync(`${fileName}`,join(targetFolderPath,fileName))
        })
			}
		}
	};
}
