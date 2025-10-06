import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputSearch() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="text" placeholder="Search a todo" />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </div>
  )
}




