// // Importing helper modules
// import { useCallback, useMemo, useRef, useState } from "react";

// // Importing core components
// import QuillEditor from "react-quill";
// import Quill from "quill";


// // Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

// const Editor = () => {
//   // Editor state
//   const [value, setValue] = useState("");

//   // Editor ref
//   const quill = useRef();

//   // Handler to handle button clicked
//   function handler() {
//     console.log(value);
//   }

//   const imageHandler = useCallback(() => {
//     // Create an input element of type 'file'
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     // When a file is selected
//     input.onchange = () => {
//       const file = input.files[0];
//       const reader = new FileReader();

//       // Read the selected file as a data URL
//       reader.onload = () => {
//         const imageUrl = reader.result;
//         const quillEditor = quill.current.getEditor();

//         // Get the current selection range and insert the image at that index
//         const range = quillEditor.getSelection(true);
//         quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
//       };

//       reader.readAsDataURL(file);
//     };
//   }, []);

// // function imageHandler() {
// //   var range = this.quill.getSelection();
// //   var value = prompt("please copy paste the image url here.");
// //   if (value) {
// //     this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
// //   }
// // }



//  const modules = useMemo(
//    () => ({
//      toolbar: {
//        container: [
//          [{ header: [2, 3, 4, false] }],
//          ["bold", "italic", "underline", "blockquote"],
//          [{ color: [] }],
//          [
//            { list: "ordered" },
//            { list: "bullet" },
//            { indent: "-1" },
//            { indent: "+1" },
//          ],
//          ["link", "image"],
//          ["clean"],
//        ],
//        handlers: {
//          image: imageHandler,
//        },
//      },
//     //  clipboard: {
//     //    matchVisual: true,
//     //  },
//    }),
// //    [imageHandler]
//  );

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color",
//     "clean",
//   ];

//   return (
//     <div className={styles.wrapper}>
//       <label className={styles.label}>Editor Content</label>
//       <QuillEditor
//         ref={(el) => (quill.current = el)}
//         className={styles.editor}
//         theme="snow"
//         value={value}
//         formats={formats}
//         modules={modules}
//         onChange={(value) => setValue(value)}
//       />
//       <button onClick={handler} className={styles.btn}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Editor;

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const ReactQuill = (await import("react-quill")).default;

    return ({ forwardedRef, ...rest }) => (
      <ReactQuill ref={forwardedRef} {...rest} />
    );
  },
  {
    ssr: false,
  }
);

// const formats = [
//   "header",
//   "font",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "color",
//   "clean",
// ];

export default function Editor1({ value, onValueChange }) {
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          [{ font: [] }],
          ["bold", "italic", "underline"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  function imageHandler() {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    const value = prompt("Please enter the image URL");

    if (value && range) {
      editor.insertEmbed(range.index, "image", value, "user");
    }
  }

  return (
    // <ReactQuill
    //   forwardedRef={quillRef}
    //   theme="snow"
    //   defaultValue="start writing"
    //   onChange={onValueChange}
    //   modules={modules}
    //   value={value}
    //   formats={formats}
    // />
    // <div className={styles.wrapper}>
    //   <label className={styles.label}>Editor Content</label>
    <ReactQuill
      forwardedRef={quillRef}
      theme="snow"
      onChange={onValueChange}
      modules={modules}
      value={value}
      // formats={formats}
      className="note-editor-content"
      placeholder="Start writing..."
    />
    // </div>
  );
};
