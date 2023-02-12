import HaterScriptInterpreter from './HaterScriptInterpreter';

const runBtn = document.getElementById('run-btn');
const clearBtn = document.getElementById('clear-btn');
if (runBtn == null || clearBtn == null) throw new Error('Failed to load page');
runBtn.addEventListener('click', runCode);
clearBtn.addEventListener('click', clearOutput);

function showOutput(newOutput: string) {
  const output = <HTMLTextAreaElement>document.getElementById('output');
  if (output.value.length > 0) {
    output.value += '\n';
  }
  output.value += newOutput;
}

function clearOutput() {
  const output = <HTMLTextAreaElement>document.getElementById('output');
  output.value = '';
}

function runCode(): void {
  try {
    const code = (<HTMLTextAreaElement>document.getElementById('input')).value
      .trim()
      .replace(/“|”/g, '"')
      .replace(/’/g, "'");
    if (code == null) throw new Error('Failed to load code');
    const interpreter = new HaterScriptInterpreter(code, showOutput);
    interpreter.runCode();
  } catch (error) {
    showOutput(error + '\nSee console for more details');
    console.error(error);
  }
}
