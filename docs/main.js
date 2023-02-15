import HaterScriptInterpreter from "./HaterScriptInterpreter.js";
const runBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
if (runBtn == null || clearBtn == null)
  throw new Error("Failed to load page");
runBtn.addEventListener("click", runCode);
clearBtn.addEventListener("click", clearOutput);
function showOutput(newOutput) {
  const output = document.getElementById("output");
  if (output.value.length > 0) {
    output.value += "\n";
  }
  output.value += newOutput;
}
function clearOutput() {
  const output = document.getElementById("output");
  output.value = "";
}
function runCode() {
  try {
    const code = document.getElementById("input").value.trim().replace(/“|”/g, '"').replace(/’/g, "'");
    if (code == null)
      throw new Error("Failed to load code");
    const interpreter = new HaterScriptInterpreter(code, showOutput);
    interpreter.runCode();
  } catch (error) {
    showOutput(error + "\nSee console for more details");
    console.error(error);
  }
}
