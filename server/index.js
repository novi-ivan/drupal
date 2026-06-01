import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createApp } from './app.js'

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const port = Number(process.env.PORT || 4173)
const dataFile = process.env.SUBMISSIONS_DB || join(rootDir, 'server/data/submissions.json')
const publicDir = process.env.PUBLIC_DIR || join(rootDir, 'build')
const basePath = process.env.BASE_PATH || ''

const app = createApp({ dataFile, publicDir, basePath })

app.listen(port, () => {
    console.log(`Submission service listening on http://localhost:${port}${basePath}`)
})
