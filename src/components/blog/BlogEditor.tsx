import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor: React.FC = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content: string) => {
    setContent(content);
    console.log('Contenido del editor:', content);
  };

  return (
    <Editor
      apiKey="k7y34lehfdaabozemtouaky5hrzdvrqhrz4ig5qnbdiqeex6" // API Key aquí
      initialValue="<p>Escribe aquí tu contenido...</p>"
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
