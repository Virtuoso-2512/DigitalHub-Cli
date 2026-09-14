import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const TextInput = ({onChange, state}) => {
  const handleEditorChange = (content, delta, source, editor) => onChange(content);

  const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', "code"],
    [
      {
        'color': [
          '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', 
          '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', 
          '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
          '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', 
          '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', //'#1972d6'
        ]
      },
      {
        'background': [
          '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', 
          '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', 
          '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
          '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', 
          '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', //'#1972d6'
        ]
      }
    ]                                     
  ];

  const quillModules = {
    toolbar: toolbarOptions
  };

  return <div style={{margin:"20px"}}>
    <ReactQuill value={state} style={{width:"40vw", height:"55vh"}} placeholder="Body of the Mail" onChange={handleEditorChange} modules={quillModules}/>
  </div>; 
}

export default TextInput;