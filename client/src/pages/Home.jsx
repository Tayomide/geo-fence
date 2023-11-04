import styled from 'styled-components'
import GoogleMap from "../components/GoogleMap"
import Controls from "../components/Controls"
import LeafletMap from "../components/LeafletMap"
import { useContext } from 'react'
import AppContext from '../hooks/AppContext'

const Home = () => {
  const { token, loggedIn } = useContext(AppContext)
  return (
    <Container>
      {/* <LeafletMap /> */}
      {/* <Controls /> */}
      {token && loggedIn && <GoogleMap />}
    </Container>
  )
}

export default Home

const Container = styled.div`
  > button{
    position: relative;
    z-index: 100;
  }
  .boundary-container{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    svg{
      width: 100%!important;
      height: 100%!important;
      &.editing{
        cursor: crosshair;
      }
    }
  }
`