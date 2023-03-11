type Props = {
  handleSkip: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectUni = ({ handleSkip }: Props) => {
  return (
    <div className="flex w-full flex-col items-center gap-5 p-2">
      <div className="space-y-5 p-10">
        <h2 className="text-xl font-semibold text-red-400">
          Seçili Üniversite
        </h2>
        <p className="text-2xl font-semibold">Samsun Üniversitesi</p>
      </div>

      {/* Skip this page if clicked */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) => {
            handleSkip(e);
          }}
        />
        <p className="break-words text-sm">
          Hangi üniversite için paylaşım yaptığımın farkındayım, bu alanı artık
          görmek istemiyorum
        </p>
      </label>
    </div>
  );
};

export default SelectUni;
