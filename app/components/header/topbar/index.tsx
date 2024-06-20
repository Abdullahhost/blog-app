import Search from "../../Search";
import UserExp from "../../UserExp";
import ToggleBtn from "../../Button/ToggleBtn";

export default async function () {



  return (
    <>
      <div className="border-b-[.1px] dark:border-[rgba(145,145,145,0.5)] bg-white dark:bg-black w-full h-[60px] px-6 py-3 flex items-center  md:items-start  gap-4 justify-between">
        <ToggleBtn />
        <Search />

        <div className="hidden md:block">
          <UserExp />
        </div>
      </div>
    </>
  );
};

