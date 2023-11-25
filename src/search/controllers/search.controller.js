const fs = require('fs');
const fsp = fs.promises;

exports.search = async (req, res) => {
  const fileName = req.body.file_name;
  const lineCount = parseInt(req.body.line_count);
  const query = req.body.query;

  const filePath = `logs/${fileName}`;

  if (!fs.existsSync(filePath)) {
    return res.status(400).json({error: "File does not exist"});
  }

  const result = await readLogFile(filePath, lineCount, query);

  res.json(result);
};

/**
 * Reads a chunk of the size of the buffer and matches with the query
 *
 * @param {string} filePath Path of file being read
 * @param {number} lineCount number of results to return
 * @param {string} query Search query passed by the user
 * @return {Object} result
 */
async function readLogFile(filePath, lineCount, query = '') {
  const file = await fsp.open(filePath, 'r');
  const fileStats = await fsp.stat(filePath);

  let cursor = fileStats.size;
  let result = {data: []};
  let chunk = '';

  while (cursor > 0) {
    const bufferLength = Math.min(20480, cursor);
    const buffer = Buffer.alloc(bufferLength);
    cursor -= bufferLength;
    chunk = await readChunks(
        file,
        buffer,
        bufferLength,
        cursor,
        chunk,
        query,
        lineCount,
        result,
    );

    if (result.data.length === lineCount) {
      break;
    }
  }

  await file.close();

  return result;
}

/**
 * Reads a chunk of the size of the buffer and matches with the query
 *
 * @param {FileHandle} file File being read
 * @param {Buffer} buffer Buffer to store the contents being read from file
 * @param {number} bufferLength Length of the bytes to read from file
 * @param {number} cursor Position to start reading data from
 * @param {string} chunk Partial string from previous read
 * @param {string} query Search query passed by the user
 * @param {number} lineCount number of results to return
 * @param {Object} result Object containing the matching lines from file search
 *
 * @return {string} chunk Partial string from previous read
 */
async function readChunks(
    file,
    buffer,
    bufferLength,
    cursor,
    chunk,
    query,
    lineCount,
    result,
) {
  await file.read(buffer, 0, bufferLength, cursor);

  chunk = buffer + chunk;

  const chunkArray = chunk.split('\n');
  chunk = chunkArray.shift();

  while (chunkArray.length) {
    const line = chunkArray.pop();
    if (line.length > 0 && (query.length === 0 || line.indexOf(query) !== -1)) {
      result.data.push(line);
      if (result.data.length === lineCount) {
        break;
      }
    }
  }

  return chunk;
}
