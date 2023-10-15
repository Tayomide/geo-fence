import { useEffect, useState } from 'react'

const SVG = ({vectors}) => {
  const [points, setPoints] = useState("")

  useEffect(() => {
    if(vectors?.length){
      let points = ""
      for(let i = 0; i < vectors.length; i++){
        points += (vectors[i].lat)+ "," + (vectors[i].long) + " "
      }
      setPoints(points)
    }
  }, [])

  return (
    <polygon points={points} fill='pink' stroke='transparent'/>
  )
}

export default SVG