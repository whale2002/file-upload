import './App.css';
import FileUpload from './FileUpload';
import FileUploadBase64 from './FileUploadBase64';

const App = () => {
  return (
    <div className="content">
      <FileUpload />
      <FileUploadBase64 />
    </div>
  );
};

export default App;
