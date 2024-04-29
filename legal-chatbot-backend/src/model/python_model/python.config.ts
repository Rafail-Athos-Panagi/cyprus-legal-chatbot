import { Options } from 'python-shell';
import { Logger } from '@nestjs/common';

const loggerOptions: Options & { timestamp?: boolean } = { timestamp: true };
const logger = new Logger('Python Shell', loggerOptions);

export const config: Options = {
  mode: 'text',
  pythonPath: 'C:/Program Files/Python312/python.exe',
  scriptPath: './src/model/python_model/',
  pythonOptions: ['-u'],
  stderrParser: (log) => logger.verbose(log),
};
