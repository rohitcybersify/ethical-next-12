import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loaders from '../../../components/loaders/Loaders'

const Slug = () => {
  const router = useRouter()
  const id = router.asPath.split('/').pop()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!isNaN(id) && id !== '') {
      fetch(`https://test.cybersify.tech/Eswag/public/api/sadm/role/${id}`)
        .then((res) => res.json())
        .then((item) => setData(item?.role?.permissions))
    }
  }, [id])

  //   if (data === undefined) {
  //     return (
  //       <>
  //         <Loaders />
  //       </>
  //     )
  //   }

  return (
    <>
      <table>
        <tr>
          <th>Permission</th>
          <th>Edit</th>
          <th>View</th>
          <th>Delete</th>
        </tr>
        {data &&
          data.map((permission, index) => (
            <tr key={index}>
              <td>{permission?.name}</td>
            </tr>
          ))}
      </table>
    </>
  )
}

export default Slug
