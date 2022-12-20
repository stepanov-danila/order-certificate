import { FileFieldDataType } from "@order-certificate-types/fields";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../redux/slice";
import {
  EPMTY_FILES_FIELD,
  MAX_FILES_SIZE,
  acceptedFilesExtensions,
  acceptedFilesString,
} from "../OrderCertificate/constants";
import { OrderCertificateFormStateEnum } from "../OrderCertificate/enums";
import { fileToBase64 } from "../OrderCertificate/utils";
import { UploadSvgIcon } from "../Svg/Icons/SvgIcons";
import Text from "../Text/Text";

type DndUploaderProps = {
  onChange: (...event: any[]) => void;
  name?: string;
  error?: boolean;
};

type DndUploaderValidationType = {
  size: boolean;
  ext: boolean;
};

const DndUploader = ({ onChange, name, error = false }: DndUploaderProps) => {
  const dispatch = useDispatch();

  const [myFiles, setMyFiles] = useState<any[]>([]);
  const [validation, setValidation] = useState<DndUploaderValidationType>({
    size: true,
    ext: true,
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const rootProps = getRootProps();
  const inputProps = getInputProps();

  const removeFile = (file: File) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    console.log("newFiles", newFiles);
    setMyFiles(newFiles);
  };

  const handleValidation = (files: File[]) => {
    setValidation({
      size:
        files.reduce(
          (prevValue, currentValue) => prevValue + currentValue.size,
          0
        ) < MAX_FILES_SIZE,
      ext: files.every((file) => acceptedFilesExtensions.includes(file.type)),
    });
  };

  const handleFiles = async (files: File[]) => {
    try {
      const postData = await Promise.all(
        files.map(async (file) => {
          const base64 = await fileToBase64(file);

          return {
            filename: file.name,
            filestream: base64.toString().split(",")[1],
            size: file.size,
            type: file.type,
          } as FileFieldDataType;
        })
      );

      console.log(postData);

      onChange(
        postData.length > 0 && validation.size && validation.ext
          ? postData
          : EPMTY_FILES_FIELD
      );

      return postData;
    } catch (error) {
      console.error(error);
      dispatch(changeStatus(OrderCertificateFormStateEnum.Error));
      return error;
    }
  };

  useEffect(() => {
    console.log("myFiles", myFiles);
    handleValidation(myFiles);
  }, [myFiles]);

  useEffect(() => {
    console.log("validation", validation);
    handleFiles(myFiles);
  }, [validation]);

  return (
    <>
      <div
        className="dnd-uploader"
        data-active={isDragActive}
        data-error={error}
        {...rootProps}
      >
        <input
          {...inputProps}
          name={name}
          multiple
          accept={acceptedFilesString}
        />
        <UploadSvgIcon />
        {isDragActive ? (
          <p>
            Опустите здесь, <br /> чтобы файл загрузился
          </p>
        ) : (
          <p>
            Перетащите файл или <br />
            <span>загрузите его</span>
          </p>
        )}
      </div>
      {!validation.size && myFiles?.length > 0 && (
        <Text style={{ color: "#dd2400", margin: "20px 0" }}>
          Размер загружаемых файлов не должен превышать 10мб.
        </Text>
      )}
      {!validation.ext && myFiles?.length > 0 && (
        <Text style={{ color: "#dd2400", margin: "20px 0" }}>
          Поддерживается следующий формат загружаемых файлов: jpeg, jpg, png,
          gif, pdf, doc, docx, xls, xlsx, txt, rar, zip.
        </Text>
      )}
      {myFiles?.length > 0 && (
        <div className="files-list">
          {myFiles.map((file, index) => (
            <div key={index} className="files-list__item">
              <span className="mdi mdi-close" onClick={removeFile(file)}></span>
              <p>{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DndUploader;
