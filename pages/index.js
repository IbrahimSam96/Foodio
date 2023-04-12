import Image from 'next/image'
import { supabase } from "../utility/supabaseClient"
import { useEffect } from 'react'

const Home = ({ countries }) => {

  console.log(countries)
  useEffect( ()=> {
    let { data } = supabase.from('clients').select()
    console.log(data,"Data")

  })

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[100px,25px,auto,100px] bg-[#131341]`}>

    </div>
  )
}

export async function getServerSideProps() {

  let { data } = await supabase.from('Clients').select()
console.log(data,"Data")
  return {
    props: {
      Clients: data
    },
  }
}


export default Home;