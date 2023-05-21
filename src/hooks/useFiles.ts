import { useState } from "react";

export const useFiles = () => {
  type FileInput = {
    name: string;
    url: string;
    size: number;
    type: string;
  };

  const [rawFiles, setRawFiles] = useState<FileList>();
  const [refinedFiles, setRefinedFiles] = useState([] as FileInput[]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRefinedFiles([]);
    if (!e.target.files) return;

    if (refinedFiles?.length >= 5) {
      setErrors((prev) => [...prev, "En fazla 5 dosya yükleyebilirsiniz."]);
      return;
    } else {
      setRawFiles(e.target.files);

      const files = Object.values(e.target.files);

      files.forEach((file) => {
        setRefinedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
          },
        ]);
      });
    }
  };

  return { rawFiles, refinedFiles, handleFiles, errors };
};
