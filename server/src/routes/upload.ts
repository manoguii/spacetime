import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, reply) => {
    const upload = await req.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!upload) {
      return reply.status(400).send({ message: 'Upload not valid.' })
    }

    const mimetype = /^(image|video)\/[a-zA-Z]+/

    const isValidTypeFormat = mimetype.test(upload.mimetype)

    if (!isValidTypeFormat) {
      return reply.status(400).send({ message: 'Invalid file type.' })
    }

    const fileId = randomUUID()

    const extension = extname(upload.filename)

    const filename = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', filename),
    )

    await pump(upload.file, writeStream)

    const fullUrl = req.protocol.concat('://').concat(req.hostname)

    const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString()

    return {
      fileUrl,
    }
  })
}
