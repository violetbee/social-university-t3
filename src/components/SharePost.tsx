import React, { useState } from "react";
import { SharePost } from "../types/app";
import { trpc } from "../utils/trpc";

const SharePost = () => {
  enum POST_TYPE {
    TEXT = "TEXT",
    DOC = "DOC",
  }
  const { data } = trpc.category.getAll.useQuery();
  const createPost = trpc.post.create.useMutation();
  const ctx = trpc.useContext();

  const [form, setForm] = useState<SharePost>({
    title: "",
    content: "",
    categoryId: "clbhwqhlm00bqvxhcot7bq95r",
    type: POST_TYPE.TEXT,
  });

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost.mutateAsync(form, {
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
