import axios from 'axios';
import { useRef, useState } from 'react';

function FileUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string>('');

  const changeHandle = () => {
    const files = fileRef.current!.files;
    if(!files) return
    const formData = new FormData();
    formData.append('file', files[0]);
    axios
      .post('http://localhost:3000/api/v1/common/file', formData)
      .then((res) => {
        setImg('http://localhost:3000/' + res.data.data.url);
      });
  };

  return (
    <div>
      <h1>文件上传-使用FormData方式</h1>
      <input type='file' ref={fileRef} onChange={changeHandle} />
      <img
        src={img}
        style={{ maxWidth: '200px', maxHeight: '280px' }}
        alt='暂无图片'
      />
    </div>
  );
}

export default FileUpload;