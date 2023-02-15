# HaterScript
A programming language for the haters, made exclusively using real negative "hate" comments. [Live Demo](https://connerardman.github.io/HaterScript/)

## Notes & Disclaimers
- Many of the syntax pieces have intentional typos. These were taken directly from comments and left in their original form.
- For the most part, the language is case-insensitive.
- Punctuation matters. Extra or missing punctuation will cause syntax errors.
- Functions don't get hoisted. All functions must be defined before being invoked.
- Debugging code in HaterScript is extremely confusing. Good luck :)
- None of this code has been fully tested, I am sure it has many bugs. If you think something should work and it doesn't there is a good chance it is an interpreter bug.
- The entire interpreter is written in TypeScript. In theory, this was probably a bad idea, but in practice it made the process easier. Some of the type annotations are fairly weak though.
- There are far more efficient ways to implement an interpreter. This should not be seen as a tutorial or a perfect example.
- This is just a fun project, please don't actually use it... but if you do, @ me


## General Syntax
 <table>
  <caption>Variable/Object Assignment</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            In this guy’s mind X means Y
          </li>
          <li>
            I’m sorry to say but X is the worst Y
          </li>
          <li>
            why ar u assuming X why whyy Y
          </li>
        </ul>
      </td>
      <td>Declare a variable named X to value Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Bro really stopped X and went to code Y like Z
          </li>
        </ul>
      </td>
      <td>Set value in in object named X at key Y with value Z</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>If Conditionals</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            This video needs it's own tier at X Nonsense
          </li>
          <li>
            You just don’t know how to use X you need to
          </li>
        </ul>
      </td>
      <td>If conditional X is true, execute code until next end block</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            This is trash
          </li>
          <li>
            This sucks
          </li>
        </ul>
      </td>
      <td>End if block</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Loops</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            Listen buddy I’m not even gonna watch X My opinion is
          </li>
        </ul>
      </td>
      <td>While conditional X is true, execute code</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Pov: U code frontend 
          </li>
          <li>
            Completely wrong 
          </li>
          <li>
            Blocked
          </li>
        </ul>
      </td>
      <td>End loop</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Functions</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            You know what makes me sick X A
          </li>
          <li>
            This is what you get when you let X talk about A
          </li>
          <li>
            I feel dirty as X for watching A
          </li>
        </ul>
      </td>
      <td>Create a function named X with parameters of array A (all strings as names of params)</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Bro are you serious ??
          </li>
          <li>
            Probably never seen a real life app ever
          </li>
        </ul>
      </td>
      <td>End function</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Bro is a X developer A
          </li>
          <li>
            I hope X is satire A
          </li>
          <li>
            You are smoking some hard ahh X brother A
          </li>
        </ul>
      </td>
      <td>Invoke a function named X with parameters array A</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Output</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            You have no right to talk about X
          </li>
          <li>
            You don’t know X bud
          </li>
        </ul>
      </td>
      <td>Log value X to console</td>
    </tr>
  </tbody>
</table>

## Value Position

<table>
  <caption>Primitives</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            must be confused about “X…”
          </li>
          <li>
            HTML developers be like “X…”
          </li>
          <li>
            Alternative title: “X…”
          </li>
        </ul>
      </td>
      <td>String “X…”</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            NERRDDDDD (number of D’s == the number)
          </li>
          <li>
            Soydev soydev (number of soydev == the number)
          </li>
          <li>
            I count N mistakes (N == the number, including negatives and decimals)
          </li>
        </ul>
      </td>
      <td>Integer (decimals can only be created with division)</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            🤡
          </li>
          <li>
            Clown
          </li>
          <li>
            BS
          </li>
        </ul>
      </td>
      <td>Null</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            beta answer
          </li>
          <li>
            cringe
          </li>
        </ul>
      </td>
      <td>True</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Js developers self humiliation
          </li>
          <li>
            Delusional
          </li>
          <li>
            Yikes
          </li>
          <li>
            js ?? dude you're not even a developer
          </li>
          <li>
            👎
          </li>
        </ul>
      </td>
      <td>False</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Objects / Arrays</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            You are kidding about X, X1, X2, … right? 
          </li>
          <li>
            L + ratio + X + X1 + X2 + X3 take
          </li>
        </ul>
      </td>
      <td>Array of values X, X1, X2, etc (Accessed with traditional [index] notation</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Hold this L
          </li>
        </ul>
      </td>
      <td>Empty object</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Where are you getting X information from about Y
          </li>
        </ul>
      </td>
      <td>Value from object named X at property value Y</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Operators</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            When you put X and Y together this bad take is what you get
          </li>
        </ul>
      </td>
      <td>Concatenation or addition of X + Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Tried to downvote X Y times
          </li>
        </ul>
      </td>
      <td>Subtraction X - Y, only in a value position</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Why would you ever think to do X with Y
          </li>
        </ul>
      </td>
      <td>Multiplication of X * Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            I immediately skipped when I heard you put X over Y
          </li>
        </ul>
      </td>
      <td>Division X / Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Clearly X doesn’t know about Y
          </li>
        </ul>
      </td>
      <td>Remainder of X / Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Please no more X
          </li>
        </ul>
      </td>
      <td>Increment variable named X</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Insert X downvote joke
          </li>
          <li>
            Dislike X
          </li>
          <li>
            Unsub from X
          </li>
        </ul>
      </td>
      <td>Decrement variable named X</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Conditionals</caption>
  <thead>
      <tr>
        <th>Syntax</th>
        <th>Meaning</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            Based on this X you haven’t seriously learned Y
          </li>
        </ul>
      </td>
      <td>X Less than Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            L video X has more rizz than Y
          </li>
        </ul>
      </td>
      <td>X Greater than Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            Did he really put X and Y on the same level?
          </li>
        </ul>
      </td>
      <td>X Equal to Y</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>
            I find this X offensive
          </li>
          <li>
            This X is so unfunny
          </li>
        </ul>
      </td>
      <td>Negation of X</td>
    </tr>
  </tbody>
</table>
