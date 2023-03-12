import React, { useState } from "react";
import { SharePost } from "../../types/app";
import { trpc } from "../../utils/trpc";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import ShareFormMain from "./ShareFormMain";

interface Props {
  options: {
    postType: string;
    skip: string;
  };
  form: SharePost;
  setForm: Dispatch<SetStateAction<SharePost>>;
}

const SharePost = ({ options, form, setForm }: Props) => {
  type FileInput = {
    name: string;
    url: string;
    size: number;
    type: string;
  };

  const { data } = trpc.category.getAll.useQuery();
  const createPost = trpc.post.create.useMutation();
  const createDocPost = trpc.post.createDoc.useMutation();
  const ctx = trpc.useContext();

  const [baseFiles, setBaseFiles] = useState<FileList>();
  const [files, setFiles] = useState<FileInput[]>([]);
  const [progress, setProgress] = useState<number>();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.type === "TEXT") {
      await createPost.mutateAsync(form, {
        onSuccess: () => {
          setForm({
            title: "",
            content: "",
            categoryId: data && data[0] && data[0].id ? data[0].id : "",
            type: "TEXT",
            departmentId: "",
          });
          ctx.invalidate();
        },
      });
    } else {
      const formData = new FormData();
      if (!baseFiles) return;
      Object.values(baseFiles).forEach((baseFile) => {
        const fileName = `${Math.random().toString(36).substring(2, 15)}-${
          baseFile.name
        }`;

        formData.append("theFiles", baseFile);
        formData.append("fileName", fileName);
      });
      try {
        axios
          .post("/api/awsUpload", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
            onUploadProgress: (progress) => {
              const percentComplete =
                Math.round(progress.loaded * 100) / (progress.total as number);
              setProgress(percentComplete);
            },
          })
          .then((res) => {
            console.log(res);
          });
      } catch (e) {
        console.log(e);
      }
      if (!files) return;
      await createDocPost.mutateAsync(
        { ...form, files },
        {
          onSuccess: () => {
            setForm({
              title: "",
              content: "",
              categoryId: "",
              type: "TEXT",
              departmentId: "",
            });
            ctx.invalidate();
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-1">
      <h1 className="text-lg font-semibold">Gönderi Paylaş</h1>
      <form onSubmit={handleForm}>
        <div className="space-y-5">
          <>
            <div className="relative z-0 ">
              <input
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-[#333] focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={form.title}
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Başlık
              </label>
            </div>
            <div className="relative z-0 col-span-10">
              <textarea
                name="message"
                rows={5}
                className="peer block max-h-32 w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-[#333] focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={form.content}
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, content: e.target.value };
                  });
                }}
              ></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Mesajın
              </label>
            </div>
          </>
          {form.type === "DOC" && (
            <>
              <div className="relative z-0">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="mb-3 h-10 w-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>

                      {files && files.length > 0 ? (
                        files.map((file, index) => {
                          return (
                            <p key={index} className="text-sm text-gray-600">
                              {file.name}
                            </p>
                          );
                        })
                      ) : (
                        <>
                          <p className="mb-2 text-xs text-[#333]">
                            <span className="font-semibold">
                              Yüklemek için tıklayın
                            </span>{" "}
                            veya dosyayı buraya sürükleyin
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG veya PDF
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      onChange={(e) => {
                        if (!e.target.files) return;
                        if (e.target.files.length > 5)
                          return alert("En fazla 5 dosya yükleyebilirsiniz.");
                        setBaseFiles(e.target.files);
                        const newFiles = Object.values(e.target.files);
                        newFiles.forEach((file) => {
                          setFiles((prev) => [
                            ...prev,
                            {
                              name: file.name,
                              size: file.size,
                              type: file.type,
                              url: URL.createObjectURL(file),
                            },
                          ]);
                        });
                      }}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="mt-5 w-full rounded-md bg-[#333] px-10 py-2 text-white"
        >
          Gönder
        </button>
        {progress}
      </form>
    </div>
  );
};
export default SharePost;
