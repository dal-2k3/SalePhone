// SpecialQuillEditor.js
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS bản chuẩn

// Import bản đặc biệt của React-Quill
// import SpecialQuill from 'special-quill/dist/quill.special.css';

const SpecialQuillEditor = ({ content, setContent }) => {
    return (
        <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            modules={{
                toolbar: [
                    // [{ 'header': [1, 2, false] }],
                    // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    // ['link', 'image', 'video',],
                    // ['clean']

                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ script: "sub" }, { script: "super" }],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
                    ["link", "image", "video"],
                    ["clean"],

                ],
            }}
        />
    );
};

export default SpecialQuillEditor;