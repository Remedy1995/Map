
import shortid from 'shortid';
import { MapContainer, Marker, ZoomControl,TileLayer,LayerGroup,Circle,Popup} from 'react-leaflet';

const Map = (props) =>{
props = props?.data?.data; 
console.log(props)
  const fillBlueOptions = { fillColor: 'black' };
 return (
 <div>
      <div> 
      {
        props && props.map(mapp=>(
      <MapContainer key={shortid.generate()}
          center={[mapp.geometry?.coordinates[1], mapp?.geometry?.coordinates[0]]}
          zoom={3} scrollWheelZoom={false} 
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer key={shortid.generate()}
 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
{
        props && props.map(mapp=>(
          <div>
          <LayerGroup key={shortid.generate()}>
        <Circle key={shortid.generate()}
          center={[mapp.geometry?.coordinates[1], mapp?.geometry?.coordinates[0]]}
          pathOptions={fillBlueOptions}
          radius={900}
        />
      </LayerGroup>
          <Marker key={shortid.generate()} position={[mapp.geometry?.coordinates[1], mapp?.geometry?.coordinates[0]]}>
          <Popup key={shortid.generate()}>
            {mapp.type}
      </Popup>
          </Marker>
          
        </div>
        ))
      }
        <ZoomControl position='topright'/>
      </MapContainer>
        ))}
</div>
 </div>)
}

export default Map;

