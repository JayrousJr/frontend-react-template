import { useLoaderData } from "react-router"

const UserDetails = () => {
  const data = useLoaderData()
  console.log(data)

  return <div>UserDetails</div>
}

export default UserDetails
