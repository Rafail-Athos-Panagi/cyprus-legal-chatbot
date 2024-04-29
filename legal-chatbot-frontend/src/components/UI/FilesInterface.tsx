import File from "./File";

const FilesInterface = ({
  files,
  onRemoveFiles,
}: {
  files: any;
  onRemoveFiles: (index: number) => void;
}) => {
  const removeFileHander = (index: number) => {
    onRemoveFiles(index);
  };

  console.log(files);

  return files.map((file: any, index: number) => {
    return (
      <File
        pdf={file.name}
        key={index}
        index={index}
        onRemoveFile={removeFileHander}
      />
    );
  });
};

export default FilesInterface;
