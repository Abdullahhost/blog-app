

import SideBar from '@/app/components/header/sidebar';
import Topbar from '@/app/components/header/topbar';
import FormBox from './components/FormBox';

export interface BlogInterface {
  title: string;
  description: string;
  role: string;
  image: string;
  public_id?: string
  createdAt?: string
}
const page = () => {

  return (
    <div className="flex items-start justify-start w-full my-4">
      <SideBar />
      <div className="flex flex-col w-full ml-0 lg:ml-[220px]">
        <Topbar />
        <FormBox />
      </div>
    </div>
  )
}

export default page