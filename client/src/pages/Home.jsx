import styled from 'styled-components'
import Controls from "../components/Controls"
import LeafletMap from "../components/LeafletMap"

const Home = () => {
  return (
    <Container>
      <LeafletMap />
      <Controls />
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