import AddButton from "./AddButton"
import colors from '../assets/colors.json'
import Color from './Color';

const Controls = () => {
  return (
    <div className="flex flex-col gap-4 items-center fixed left-4 top-1/2 transform -translate-y-1/2 bg-[#35363e] p-4 rounded-[40px]
             shadow-[0_1px_1px_hsl(0_0%_0%/_7.5%),
             0_2px_2px_hsl(0_0%_0%/_7.5%),
             0_4px_4px_hsl(0_0%_0%/_7.5%),
             0_8px_8px_hsl(0_0%_0%/_7.5%),
             0_16px_16px_hsl(0_0%_0%/_7.5%)] 
             z-[10000]" >
        <AddButton />
        {colors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
    </div>
  )
}

export default Controls