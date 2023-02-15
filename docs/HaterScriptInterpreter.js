import getSyntaxTree from "./getSyntaxTree.js";
import getValueTree from "./getValueTree.js";
export default class HaterScriptInterpreter {
  #tokens;
  #logFn;
  #savedValues;
  #declaringFunctionName;
  #failedChecks;
  #inWhileLoops;
  #tmpTokenRecord;
  #skipErrorsMode;
  #paramsToRemove;
  constructor(code, logFn) {
    this.#tokens = this.#getTokens(code);
    this.#logFn = logFn;
    this.#savedValues = {};
    this.#declaringFunctionName = null;
    this.#failedChecks = [];
    this.#inWhileLoops = [];
    this.#tmpTokenRecord = null;
    this.#skipErrorsMode = false;
    this.#paramsToRemove = [];
    const shiftFunction = Array.prototype.shift;
    const that = this;
    Array.prototype.shift = function() {
      const result = shiftFunction.call(this);
      if (that.#tmpTokenRecord != null) {
        that.#tmpTokenRecord.push(result);
      }
      if (that.#inWhileLoops.length > 0) {
        that.#inWhileLoops.at(-1).tokens.push(result);
      }
      return result;
    };
  }
  runCode() {
    const syntaxTree = getSyntaxTree(this.#declareFunction.bind(this), this.#declareObjectKey.bind(this), this.#declareVar.bind(this), this.#decrement.bind(this), this.#endFunction.bind(this), this.#endIfBlock.bind(this), this.#endWhileLoop.bind(this), this.#increment.bind(this), this.#invokeFunction.bind(this), this.#ifCheck.bind(this), this.#log.bind(this), this.#whileLoop.bind(this));
    while (this.#tokens.length > 0) {
      const nextToken = this.#tokens.shift();
      if (nextToken == null)
        break;
      let nextInPath = syntaxTree[nextToken.toLowerCase()];
      while (typeof nextInPath !== "function") {
        if (this.#tokens.length === 0 || nextInPath == null)
          this.#throwSyntaxError();
        nextInPath = nextInPath[this.#tokens.shift().toLowerCase()];
      }
      nextInPath();
    }
  }
  #getTokens(code) {
    const baseTokens = code.split(/(\s+)/);
    const tokens = [];
    let currTokenIndex = 0;
    while (currTokenIndex < baseTokens.length) {
      let token = baseTokens[currTokenIndex];
      if (token.length > 1 && (token.endsWith(",") || token.endsWith("+"))) {
        if (token.startsWith('"') && !(token.charAt(token.length - 2) === '"'))
          break;
        baseTokens.splice(currTokenIndex + 1, 0, token.charAt(token.length - 1));
        token = token.slice(0, -1);
      }
      if (token === "," || token === "+" || token.startsWith('"') && token.endsWith('"') && token.length > 1) {
        tokens.push(token);
      } else if (token.startsWith('"')) {
        let combinedToken = token;
        while (true) {
          const currToken = baseTokens[currTokenIndex + 1];
          currTokenIndex++;
          if (currToken == null)
            this.#throwSyntaxError();
          combinedToken += currToken;
          if (currToken.endsWith('"'))
            break;
        }
        tokens.push(combinedToken);
      } else if (token.toLowerCase().startsWith("nerd")) {
        tokens.push("nerd");
        const count = token.match(/d/gi)?.length;
        if (count !== token.length - 3)
          this.#throwSyntaxError();
        tokens.push("" + count);
      } else if (token === "soydev") {
        tokens.push("soydev");
        let count = 1;
        while (currTokenIndex < baseTokens.length - 1 && (baseTokens[currTokenIndex + 1].toLowerCase() === "soydev" || !/\S/.test(baseTokens[currTokenIndex + 1]))) {
          currTokenIndex++;
          if (baseTokens[currTokenIndex].toLowerCase() !== "soydev")
            continue;
          count++;
        }
        tokens.push("" + count);
      } else if (!token.includes('"') && !/\s/g.test(token)) {
        if (/.*\[[0-9]+\]$/.test(token)) {
          const endingLocation = token.lastIndexOf("[");
          tokens.push(token.substring(0, endingLocation));
          tokens.push(token.substring(endingLocation));
        } else {
          tokens.push(token);
        }
      }
      currTokenIndex++;
    }
    return tokens;
  }
  #getNextValue() {
    const nextToken = this.#tokens.shift();
    if (nextToken == null)
      this.#throwSyntaxError();
    if (this.#savedValues.hasOwnProperty(nextToken)) {
      const value = this.#savedValues[nextToken];
      if (Array.isArray(value) && /^\[[0-9]+\]$/.test(this.#tokens[0])) {
        const index = Number(this.#tokens.shift()?.slice(1, -1));
        return value[index] ?? null;
      }
      return value;
    }
    const valueTree = getValueTree(this.#addition.bind(this), this.#arrayValue.bind(this), this.#division.bind(this), this.#equalTo.bind(this), this.#greaterThan.bind(this), this.#lessThan.bind(this), this.#multiplication.bind(this), this.#negation.bind(this), this.#numberValue.bind(this), this.#objectGet.bind(this), this.#remainder.bind(this), this.#stringValue.bind(this), this.#subtraction.bind(this));
    let nextInPath = valueTree[nextToken.toLowerCase()];
    while (typeof nextInPath === "object" && nextInPath != null && !Array.isArray(nextInPath)) {
      if (this.#tokens.length === 0)
        this.#throwSyntaxError();
      nextInPath = nextInPath[this.#tokens.shift().toLowerCase()];
    }
    if (typeof nextInPath === "function") {
      return nextInPath();
    }
    return nextInPath;
  }
  #declareFunction(middleStrings) {
    if (this.#tokens.length <= 1)
      this.#throwSyntaxError();
    const name = this.#tokens.shift();
    this.#declaringFunctionName = name;
    this.#removeStrings(middleStrings);
    const parameters = this.#getNextValue();
    this.#savedValues[name] = {
      parameters,
      tokens: []
    };
    this.#tmpTokenRecord = [];
  }
  #endFunction() {
    if (this.#declaringFunctionName == null) {
      this.#paramsToRemove.forEach((param) => {
        delete this.#savedValues[param];
      });
      return;
    }
    this.#savedValues[this.#declaringFunctionName].tokens = this.#tmpTokenRecord;
    this.#tmpTokenRecord = null;
    this.#declaringFunctionName = null;
  }
  #invokeFunction(endingStrings) {
    const name = this.#tokens.shift();
    const func = this.#savedValues[name];
    this.#removeStrings(endingStrings);
    if (this.#failedChecks.includes(true)) {
      this.#getNextValue();
      return;
    }
    if (func.parameters.length > 0) {
      const args = this.#getNextValue();
      func.parameters.forEach((parameter, i) => {
        const paramName = parameter.slice(1, parameter.length - 1);
        this.#paramsToRemove.push(paramName);
        this.#savedValues[paramName] = args[i];
      });
    }
    this.#tokens.unshift(...func.tokens);
  }
  #declareVar(middleStrings) {
    if (this.#tokens.length <= 1)
      this.#throwSyntaxError();
    const name = this.#tokens.shift();
    this.#removeStrings(middleStrings);
    const value = this.#getNextValue();
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    this.#savedValues[name] = value;
  }
  #declareObjectKey() {
    if (this.#tokens.length <= 1)
      this.#throwSyntaxError();
    const object = this.#getNextValue();
    this.#removeStrings(["and", "went", "to", "code"]);
    const key = this.#tokens.shift();
    this.#removeStrings(["like"]);
    const value = this.#getNextValue();
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    object[key] = value;
  }
  #objectGet(middleStrings) {
    const object = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const key = this.#tokens.shift();
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    console.log(object, key);
    return object?.[key] ?? null;
  }
  #ifCheck(endingStrings) {
    const conditionResult = this.#getNextValue();
    this.#removeStrings(endingStrings);
    this.#failedChecks.push(!conditionResult);
    this.#skipErrorsMode = this.#failedChecks.includes(true);
  }
  #endIfBlock() {
    this.#failedChecks.pop();
    this.#skipErrorsMode = this.#failedChecks.includes(true);
  }
  #whileLoop(endingStrings) {
    if (this.#failedChecks.includes(true) || this.#declaringFunctionName != null) {
      this.#getNextValue();
      this.#removeStrings(endingStrings);
      return;
    }
    this.#tmpTokenRecord = [];
    const conditionResult = this.#getNextValue();
    const conditionalTokens = [...this.#tmpTokenRecord];
    this.#tmpTokenRecord = null;
    this.#removeStrings(endingStrings);
    this.#inWhileLoops.push({
      conditional: conditionalTokens,
      isInside: conditionResult,
      tokens: []
    });
  }
  #endWhileLoop() {
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    const currentWhileLoop = this.#inWhileLoops.at(-1);
    if (currentWhileLoop == null)
      throw SyntaxError();
    this.#tokens.unshift(...currentWhileLoop.conditional);
    const conditionResult = this.#getNextValue();
    if (conditionResult === true) {
      currentWhileLoop.tokens.splice(currentWhileLoop.tokens.length - currentWhileLoop.conditional.length, currentWhileLoop.conditional.length);
      this.#tokens.unshift(...currentWhileLoop.tokens);
      currentWhileLoop.tokens = [];
    } else {
      this.#inWhileLoops.pop();
    }
  }
  #decrement(endingStrings) {
    if (this.#tokens.length === 0)
      this.#throwSyntaxError();
    const variableName = this.#tokens.shift();
    if (!this.#savedValues.hasOwnProperty(variableName))
      this.#throwSyntaxError();
    if (typeof this.#savedValues[variableName] !== "number")
      this.#throwSyntaxError();
    this.#removeStrings(endingStrings);
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    this.#savedValues[variableName]--;
  }
  #increment(endingStrings) {
    if (this.#tokens.length === 0)
      this.#throwSyntaxError();
    const variableName = this.#tokens.shift();
    if (!this.#savedValues.hasOwnProperty(variableName))
      this.#throwSyntaxError();
    if (typeof this.#savedValues[variableName] !== "number")
      this.#throwSyntaxError();
    this.#removeStrings(endingStrings);
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    this.#savedValues[variableName]++;
  }
  #log(endingStrings) {
    if (this.#tokens.length === 0)
      this.#throwSyntaxError();
    let nextValue = this.#getNextValue();
    if (typeof nextValue === "object" && nextValue != null) {
      nextValue = JSON.stringify(nextValue);
    }
    this.#removeStrings(endingStrings);
    if (this.#failedChecks.includes(true))
      return;
    if (this.#declaringFunctionName != null)
      return;
    this.#logFn(nextValue ?? null);
  }
  #arrayValue(delimeter, endingString) {
    const array = [];
    let isDelimeter = false;
    while (this.#tokens.length > 0 && this.#tokens[0] !== endingString) {
      if (isDelimeter) {
        if (this.#tokens.shift() !== delimeter)
          this.#throwSyntaxError();
      } else {
        array.push(this.#getNextValue());
      }
      isDelimeter = !isDelimeter;
    }
    if (this.#tokens.shift() !== endingString)
      this.#throwSyntaxError();
    if (/^\[[0-9]+\]$/.test(this.#tokens[0])) {
      const index = Number(this.#tokens.shift()?.slice(1, -1));
      return array[index] ?? null;
    }
    return array;
  }
  #numberValue(endingStrings) {
    const token = this.#tokens.shift();
    if (token == null || !/^\-?\d+$/.test(token))
      this.#throwSyntaxError();
    this.#removeStrings(endingStrings);
    return Number(token);
  }
  #stringValue() {
    const token = this.#tokens.shift();
    if (token == null || !token?.startsWith('"') || !token.endsWith('"'))
      this.#throwSyntaxError();
    return token;
  }
  #addition(middleStrings, endingStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    this.#removeStrings(endingStrings);
    if (typeof value1 === "string" && typeof value2 === "string") {
      return value1.slice(0, -1) + value2.slice(1);
    } else if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 + value2;
    }
    this.#throwSyntaxError();
  }
  #subtraction(endingStrings) {
    const value1 = this.#getNextValue();
    const value2 = this.#getNextValue();
    this.#removeStrings(endingStrings);
    if (this.#tokens.shift() !== "times")
      this.#throwSyntaxError();
    return value1 - value2;
  }
  #multiplication(middleStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    return value1 * value2;
  }
  #division(middleStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    return value1 / value2;
  }
  #remainder(middleStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    return value1 % value2;
  }
  #greaterThan(middleStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    return value1 > value2;
  }
  #lessThan(middleStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    return value1 < value2;
  }
  #equalTo(middleStrings, endingStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(middleStrings);
    const value2 = this.#getNextValue();
    this.#removeStrings(endingStrings);
    return value1 == value2;
  }
  #negation(endingStrings) {
    const value1 = this.#getNextValue();
    this.#removeStrings(endingStrings);
    return !value1;
  }
  #removeStrings(strings) {
    for (let i = 0; i < strings.length; i++) {
      const str = this.#tokens.shift()?.toLowerCase();
      if (str !== strings[i])
        this.#throwSyntaxError();
    }
  }
  #throwSyntaxError() {
    if (this.#skipErrorsMode === true)
      return;
    throw new Error("Syntax Error");
  }
}
