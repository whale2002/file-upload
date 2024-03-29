import { useRef, useState } from 'react';
import axios from 'axios';

function FileUploadBase64() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string>('')

  const changeHandle = () => {
    const files = inputRef.current?.files;
    if(!files) return
    // FileReader读文件，可以转为base64
    const reader = new FileReader();
    reader.readAsDataURL(files[0]); // 把选择的文件作为参数
    reader.onload = () => {
      // console.log(reader.result);
      axios
        .post('http://localhost:3000/api/v1/common/file_base64', {
          file: reader.result,
        })
        .then((res) => {
          setImg('http://localhost:3000' + res.data.data);
        });
    };
  };
  return (
    <div>
      <h1>base64方式上传</h1>
      <input type='file' ref={inputRef} onChange={changeHandle} />
      <img
        src={img}
        style={{ maxWidth: '200px', maxHeight: '280px' }}
        alt='暂无图片'
      />
    </div>
  );
}

export default FileUploadBase64;