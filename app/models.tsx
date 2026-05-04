import { Canvas } from '@react-three/fiber';
import {
  View
} from 'react-native';

const models = () => {
    //put logic here



    return (
      <View>
        <Canvas/>
        <mesh>
          <boxGeometry/>
          <meshStandardMaterial/>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
        </mesh>
      </View>
    )
}

