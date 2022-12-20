type FileListProps = {
  files: File[];
  handleDelete: (File) => void;
};

const FileList = ({ files, handleDelete }: FileListProps) => {
  return (
    <div className="files-list">
      {files.map((file, index) => (
        <div key={index} className="files-list__item">
          <span
            className="mdi mdi-close"
            onClick={(e) => {
              handleDelete(file);
            }}
          ></span>
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FileList;
