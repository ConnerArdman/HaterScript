interface SyntaxTree {
  [propName: string]: Function | SyntaxTree;
}

export default function getSyntaxTree(
  declareFunction: (middleStrings: string[]) => void,
  declareObjectKey: () => void,
  declareVar: (middleStrings: string[]) => void,
  decrement: (endingStrings: string[]) => void,
  endFunction: () => void,
  endIfBlock: () => void,
  endWhileLoop: () => void,
  increment: (endingStrings: string[]) => void,
  invokeFunction: (endingStrings: string[]) => void,
  ifCheck: (endingStrings: string[]) => void,
  log: (endingStrings: string[]) => void,
  whileLoop: (endingStrings: string[]) => void
): SyntaxTree {
  return {
    blocked: endWhileLoop,
    bro: {
      are: {
        you: {
          serious: {
            '??': endFunction,
          },
        },
      },
      is: {
        a: () => invokeFunction(['developer']),
      },
      really: {
        stopped: declareObjectKey,
      },
    },
    completely: {
      wrong: endWhileLoop,
    },
    dislike: () => decrement([]),
    i: {
      feel: {
        dirty: {
          as: () => declareFunction(['for', 'watching']),
        },
      },
      hope: () => invokeFunction(['is', 'satire']),
    },
    in: {
      this: {
        "guy's": {
          mind: () => declareVar(['means']),
        },
      },
    },
    insert: () => decrement(['downvote', 'joke']),
    "i'm": {
      sorry: {
        to: {
          say: {
            but: () => declareVar(['is', 'the', 'worst']),
          },
        },
      },
    },
    listen: {
      buddy: {
        "i'm": {
          not: {
            even: {
              gonna: {
                watch: () => whileLoop(['my', 'opinion', 'is']),
              },
            },
          },
        },
      },
    },
    please: {
      no: {
        more: () => increment([]),
      },
    },
    'pov:': {
      u: {
        code: {
          frontend: endWhileLoop,
        },
      },
    },
    probably: {
      never: {
        seen: {
          a: {
            real: {
              life: {
                app: {
                  ever: endFunction,
                },
              },
            },
          },
        },
      },
    },
    this: {
      is: {
        trash: endIfBlock,
        what: {
          you: {
            get: {
              when: {
                you: {
                  let: () => declareFunction(['talk', 'about']),
                },
              },
            },
          },
        },
      },
      sucks: endIfBlock,
      video: {
        needs: {
          "it's": {
            own: {
              tier: {
                at: () => ifCheck(['nonsense']),
              },
            },
          },
        },
      },
    },
    unsub: {
      from: () => decrement([]),
    },
    why: {
      ar: {
        u: {
          assuming: () => declareVar(['why', 'whyy']),
        },
      },
    },
    you: {
      are: {
        smoking: {
          some: {
            hard: {
              ahh: () => invokeFunction(['brother']),
            },
          },
        },
      },
      "don't": {
        know: () => log(['bud']),
      },
      have: {
        no: {
          right: {
            to: {
              talk: {
                about: () => log([]),
              },
            },
          },
        },
      },
      just: {
        "don't": {
          know: {
            how: {
              to: {
                use: () => ifCheck(['you', 'need', 'to']),
              },
            },
          },
        },
      },
      know: {
        what: {
          makes: {
            me: {
              sick: () => declareFunction([]),
            },
          },
        },
      },
    },
  };
}
