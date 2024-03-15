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
