import { useEffect, useState } from 'react'

const EditSVG = ({vectors}) => {
  const [points, setPoints] = useState("")
  const [editPoint, setEditPoint] = useState()

  const handleMouseMove = (e) => {
    setEditPoint([e.x, e.y])
  }

  useEffect(() => {
    if(vectors?.length){
      let points = ""
      for(let i = 0; i < vectors.length; i++){
        points += (vectors[i].lat)+ "," + (vectors[i].long) + " "
      }
      setPoints(points)
    }
  }, [vectors])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
  <>
    <polygon points={points} fill='pink' stroke='transparent'/>
    {vectors?.length && <>
      {vectors.map((vector, key) => {
        return key < vectors.length-1 &&
        <line
        key={key}
          x1={vectors[key].lat}
          x2={vectors[key+1].lat}
          y1={vectors[key].long}
          y2={vectors[key+1].long}
          stroke="black"
          strokeWidth="1px"
        />
      })}
      {
        editPoint?.length && vectors?.length > 2 &&
        <line
          x1={vectors[vectors.length-1].lat}
          x2={vectors[0].lat}
          y1={vectors[vectors.length-1].long}
          y2={vectors[0].long}
          stroke="#b25d6c"
          strokeWidth="1px"
          strokeDasharray="5 1"
        />
      }
      {
        editPoint?.length && 
        <line
          x1={vectors[vectors.length-1].lat}
          x2={editPoint[0]}
          y1={vectors[vectors.length-1].long}
          y2={editPoint[1]}
          stroke="black"
          strokeWidth="1px"
          strokeDasharray="4 1"
        />
      }
    </>}
  </>
  )
}

export default EditSVG