import { InputSearch } from "@/components/ui/customDesign/InputSearch"
import { Input } from "@/components/ui/input"

const NavBar = () => {
  return (
    <>
        <div className="flex items-center h-20 ">
           <div className="">Logo</div>
           <InputSearch />
        </div>
    </>
  )
}

export default NavBar