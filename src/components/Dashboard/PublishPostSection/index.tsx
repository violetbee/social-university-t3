/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { IPostSlicer } from "../../../types/post";
import {
  AnketForm,
  GonderiForm,
  EtkinlikForm,
  DosyaForm,
  SoruCevapForm,
  IlanForm,
} from "./particles";
import { memo, useState } from "react";
import { TfiFiles, TfiLayoutListPost } from "react-icons/tfi";
import { MdEmojiEvents } from "react-icons/md";
import { RiQuestionAnswerLine, RiSurveyLine } from "react-icons/ri";
import { SiHomeadvisor } from "react-icons/si";

const PublishPostSection = () => {
  const isOpen = useSelector((state: IPostSlicer) => state.app.isShareOpen);

  const [subContent, setSubContent] = useState<string>("");

  const cancelProcess = () => {
    setSubContent("");
  };

  const handleSubContent = (subContent: string) => {
    switch (subContent) {
      case "anket":
        return <AnketForm cancelProcess={cancelProcess} />;
      case "etkinlik":
        return <EtkinlikForm cancelProcess={cancelProcess} />;
      case "dosya":
        return <DosyaForm cancelProcess={cancelProcess} />;
      case "gonderi":
        return <GonderiForm cancelProcess={cancelProcess} />;
      case "soru-cevap":
        return <SoruCevapForm cancelProcess={cancelProcess} />;
      case "ilan":
        return <IlanForm cancelProcess={cancelProcess} />;
      default:
        return (
          <>
            <div
              className={`grid w-full grid-cols-1 justify-between divide-y divide-darkHelper dark:bg-darkSecondary lg-m:grid-cols-2 lg:grid-cols-6 lg:divide-x`}
            >
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
                <TfiLayoutListPost className="h-6 w-6" />
                Gönderi Paylaş
                <input
                  type="radio"
                  value="gonderi"
                  className="hidden"
                  onChange={(e) => {
                    setSubContent(e.target.value);
                  }}
                />
              </label>
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
                <TfiFiles className="h-6 w-6" />
                Dosya Paylaş
                <input
                  type="radio"
                  value="dosya"
                  className="hidden"
                  onChange={(e) => {
                    setSubContent(e.target.value);
                  }}
                />
              </label>
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
                <MdEmojiEvents className="h-6 w-6" />
                Etkinlik Oluştur
                <input
                  type="radio"
                  value="etkinlik"
                  className="hidden"
                  onChange={(e) => {
                    setSubContent(e.target.value);
                  }}
                />
              </label>
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
                <RiQuestionAnswerLine className="h-6 w-6" />
                Soru Sor
                <input
                  type="radio"
                  value="soru-cevap"
                  className="hidden"
                  onChange={(e) => {
                    setSubContent(e.target.value);
                  }}
                />
              </label>
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
                <RiSurveyLine className="h-6 w-6" />
                Anket Oluştur
                <input
                  type="radio"
                  value="anket"
                  className="hidden"
                  onChange={(e) => {
                    setSubContent(e.target.value);
                  }}
                />
              </label>
              <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
                <SiHomeadvisor className="h-6 w-6" />
                İlan Oluştur
                <input
                  type="radio"
                  value="ilan"
                  className="hidden"
                  onChange={(e) => {
                    setSubContent(e.target.value);
                  }}
                />
              </label>
            </div>
          </>
        );
    }
  };

  return (
    <div
      className={`${
        isOpen
          ? "my-5 grid-rows-[1fr] opacity-100"
          : "mt-0 grid-rows-[0fr] opacity-0"
      }  col-span-7 grid transition-all duration-300 ease-in-out`}
    >
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-md bg-white shadow-md dark:border dark:border-darkHelper dark:bg-darkSecondary">
        {handleSubContent(subContent)}
      </div>
    </div>
  );
};

export default memo(PublishPostSection);
