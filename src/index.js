import { addDefault } from "@babel/helper-module-imports"
import nodePath from 'path'

module.exports =  function ({types: t}) {
    return {
        visitor: {
            VariableDeclaration(path, state) {
                const {node} = path
                let {
                    opts: {libraryName='gingko', targetVar='externalConfig', configName='gingkoconfig'}
                } = state
                if(state.file && state.file.opts) {
                    if(!new RegExp(libraryName).test(state.file.opts.filename)) {
                        return
                    }
                }
                
                let pathRegResult = /(.*)node\_modules/.exec(__dirname)
                let rootpath = pathRegResult ? pathRegResult[1] : __dirname

                node.declarations.forEach(dec => {
                    
                    if(dec.id.name === targetVar) {
                        let importResult = addDefault(path, nodePath.join(rootpath, configName), { nameHint: targetVar })
                        dec.init = t.identifier(importResult.name);
                    }
                })
            }
        }
    }
}