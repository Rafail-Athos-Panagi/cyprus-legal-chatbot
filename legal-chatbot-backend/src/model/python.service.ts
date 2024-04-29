import { Injectable, Logger } from '@nestjs/common';
import { config } from './python_model/python.config';
import { Options, PythonShell } from 'python-shell';
import { Observable, fromEvent, EMPTY } from 'rxjs';

@Injectable()
export class PythonService {
  loggerOptions: Options & { timestamp?: boolean } = { timestamp: true };
  private readonly logger = new Logger(PythonService.name, this.loggerOptions);
  private shell: PythonShell;

  async python() {
    this.shell = new PythonShell('model.py', config);
    await this.startup(); // Wait for startup to complete
  }

  private async startup() {
    this.logger.log('PYTHON STARTUP');
    // const data = {query: "Ποια δικαστίκη απόφαση περιλαμβάνει υπόθεση με αυτοκινητιστικό δυστήχημα? Και ποιοι ήταν οι άμεσα εμπλεκόμενοι? Και ποιος ήταν ο δικαστής?"}
    const data = {query: "Which case involves car accident?"}

    this.process(data);
  }

  public get Response(): Observable<any> {
    if (!this.shell) {
      console.error("this.shell is not initialized");
      return EMPTY; // Return an empty Observable or handle it as needed
    }
    return fromEvent(this.shell, 'message');
  }

  private process(data: any) {
    if (!this.shell) {
      console.error("this.shell is not initialized");
      return;
    }
    this.shell.send(data);
  }
}
