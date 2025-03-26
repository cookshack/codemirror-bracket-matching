import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/matchbrackets.ts',
  external: id => id != 'tslib' && !/^(\.?\/|\w:)/.test(id),
  output: [ { file: 'dist/index.cjs', format: 'cjs' },
            { file: 'dist/index.js', format: 'es' } ],
  plugins: [ nodeResolve(), typescript() ]
}
