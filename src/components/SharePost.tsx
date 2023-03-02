import React, { useState } from "react";
import { SharePost } from "../types/app";
import { trpc } from "../utils/trpc";
import axios from "axios";

const SharePost = () => {
  enum POST_TYPE {
    TEXT = "TEXT",
    DOC = "DOC",
  }

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

  const [form, setForm] = useState<SharePost>({
    title: "",
    content: "",
    categoryId: "clbhwqhlm00bqvxhcot7bq95r",
    type: POST_TYPE.TEXT,
  });

  const [baseFiles, setBaseFiles] = useState<FileList>();
  const [files, setFiles] = useState<FileInput[]>([]);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.type === POST_TYPE.TEXT) {
      await createPost.mutateAsync(form, {
        onSuccess: () => {
          setForm({
            title: "",
            content: "",
            categoryId: "clbhwqhlm00bqvxhcot7bq95r",
            type: POST_TYPE.TEXT,
          });
          ctx.invalidate();
        },
      });
    } else {
      const formData = new FormData();
      if (!baseFiles) return;
      Object.values(baseFiles).forEach((baseFile) => {
        formData.append("theFiles", baseFile);
      });
      axios.post("/api/fileUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!files) return;
      await createDocPost.mutateAsync(
        { ...form, files },
        {
          onSuccess: () => {
            setForm({
              title: "",
              content: "",
              categoryId: "clbhwqhlm00bqvxhcot7bq95r",
              type: POST_TYPE.TEXT,
            });
            ctx.invalidate();
          },
        }
      );
    }
  };

  return (
    <div className="rounded-md border-2 bg-white p-6 shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-4">
            <h1 className="mb-1 text-lg font-semibold">Gönderi Paylaş</h1>
            <form onSubmit={handleForm}>
              <div className="grid gap-6">
                <div>
                  <label className="text-sm text-gray-500" htmlFor="">
                    Gönderi tipinizi seçiniz
                  </label>
                  <div className="z-0 border-0 border-b border-gray-500">
                    <select
                      onChange={(e) => {
                        setForm((prev) => {
                          return { ...prev, type: e.target.value as POST_TYPE };
                        });
                      }}
                      className="h-full w-full focus:outline-none"
                    >
                      <option value={POST_TYPE.TEXT} id="text">
                        Yazı
                      </option>
                      <option value={POST_TYPE.DOC} id="docs">
                        Doküman
                      </option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm text-gray-500" htmlFor="">
                    Lütfen bir kategori seçiniz
                  </label>
                  <div className="z-0 border-0 border-b border-gray-500">
                    <select
                      onChange={(e) => {
                        setForm((prev) => {
                          return { ...prev, categoryId: e.target.value };
                        });
                      }}
                      className="h-full w-full pr-2 focus:outline-none"
                    >
                      {data?.map((category) => {
                        return (
                          <option
                            key={category.id}
                            value={category.id}
                            id={category.name}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <>
                  <div className="relative z-0 col-span-2">
                    <input
                      type="text"
                      name="name"
                      className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
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
                  <div className="relative z-0 col-span-2">
                    <textarea
                      name="message"
                      rows={5}
                      className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
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
                {form.type === POST_TYPE.DOC && (
                  <>
                    <div className="relative z-0 col-span-2">
                      <div className="flex w-full items-center justify-center">
                        <label
                          htmlFor="dropzone-file"
                          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
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
                                  <p
                                    key={index}
                                    className="text-sm text-gray-600"
                                  >
                                    {file.name}
                                  </p>
                                );
                              })
                            ) : (
                              <>
                                <p className="mb-2 text-xs text-black">
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
                                return alert(
                                  "En fazla 5 dosya yükleyebilirsiniz."
                                );
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
                className="mt-5 rounded-md bg-black px-10 py-2 text-white"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SharePost;
