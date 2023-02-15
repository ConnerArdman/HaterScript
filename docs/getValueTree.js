export default function getValueTree(addition, arrayValue, division, equalTo, greaterThan, lessThan, multiplication, negation, numberValue, objectGet, remainder, stringValue, subtraction) {
  return {
    alternative: {
      "title:": stringValue
    },
    beta: {
      answer: true
    },
    based: {
      on: {
        this: () => lessThan(["you", "haven't", "seriously", "learned"])
      }
    },
    bs: null,
    clearly: () => remainder(["doesn't", "know", "about"]),
    clown: null,
    "🤡": null,
    cringe: true,
    delusional: false,
    did: {
      he: {
        really: {
          put: () => equalTo(["and"], ["on", "the", "same", "level?"])
        }
      }
    },
    html: {
      developers: {
        be: {
          like: stringValue
        }
      }
    },
    hold: {
      this: {
        l: () => ({})
      }
    },
    i: {
      count: () => numberValue(["mistakes"]),
      find: {
        this: () => negation(["offensive"])
      },
      immediately: {
        skipped: {
          when: {
            i: {
              heard: {
                you: {
                  put: () => division(["over"])
                }
              }
            }
          }
        }
      }
    },
    js: {
      developers: {
        self: {
          humiliation: false
        }
      },
      "??": {
        dude: {
          "you're": {
            not: {
              even: {
                a: {
                  developer: false
                }
              }
            }
          }
        }
      }
    },
    l: {
      "+": {
        ratio: {
          "+": () => arrayValue("+", "take")
        }
      },
      video: () => greaterThan(["has", "more", "rizz", "than"])
    },
    must: {
      be: {
        confused: {
          about: stringValue
        }
      }
    },
    nerd: () => numberValue([]),
    soydev: () => numberValue([]),
    this: () => negation(["is", "so", "unfunny"]),
    tried: {
      to: {
        downvote: () => subtraction(["with"])
      }
    },
    when: {
      you: {
        put: () => addition(["and"], ["together", "this", "bad", "take", "is", "what", "you", "get"])
      }
    },
    where: {
      are: {
        you: {
          getting: () => objectGet(["information", "from", "about"])
        }
      }
    },
    why: {
      would: {
        you: {
          ever: {
            think: {
              to: {
                do: () => multiplication(["with"])
              }
            }
          }
        }
      }
    },
    "yikes!": false,
    you: {
      are: {
        kidding: {
          about: () => arrayValue(",", "right?")
        }
      }
    },
    "👎": false
  };
}
