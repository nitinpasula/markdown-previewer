import React, { useState } from "react";
import "./App.css";

// declare key word tells compiler that module exists already and is usually from
// a js library you included, here in this case marked.js
declare const marked: any;

const App: React.FC = () => {
  marked.setOptions({
    breaks: true,
  });
  // renderer to open a link in new tab
  const renderer = new marked.Renderer();
  renderer.link = (href: string, title: string, text: string) => {
    return `<a href=${href} target="_blank">${text}</a>`;
  };
  const initialText: string = `
  # Welcome to my React Markdown Previewer!
  ## This is a sub-heading...
  ### And here's some other cool stuff:
  Here's some code, \`<div></div>\`, between 2 back ticks.
  \`\`\`
  // this is multi-line code:
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.

  There's also [links](https://www.freecodecamp.com), and

  > Block Quotes!
  
And if you want to get really crazy, even tables:
  
| Wild Header      | Crazy Header    | Another Header?    |
| ---------------- | --------------- | ------------------ |
| Your content can | be here, and it | can be here....    |
| And here.        | Okay.           | I think we get it. |
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want! 
  1. But the list goes on...

  - Even if you use dashes or asterisks.

  * And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `;
  const [text, setText] = useState(initialText);

  const getRawMarkup = () => {
    return { __html: marked(text, { renderer: renderer }) }; // object to set raw html
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };
  return (
    <div className="container">
      <div className="textEditor">
        <textarea id="editor" onChange={handleChange} value={text}></textarea>
      </div>
      <div id="preview" dangerouslySetInnerHTML={getRawMarkup()}></div>
    </div>
  );
};

export default App;
