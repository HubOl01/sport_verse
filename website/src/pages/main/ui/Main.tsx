import CardEvent from "./cardEvent";
import CardMain from "./cardMain";

export default function Main() {
  return (
    <div className='mr-5 ml-5 mt-5'>
      <div className="flex ">
        <CardMain />

        <CardEvent />
      </div>
    </div >
  )
}
