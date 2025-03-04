import React, { useEffect, useState } from 'react'
import Fedtestcss from '../Fedtest/Fedtestcss.module.css'
import { Canvas, useLoader } from '@react-three/fiber';
import { AdaptiveDpr, Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { RepeatWrapping, TextureLoader } from 'three';




function Phonemodel(props){

const { scene: pmodel } = useGLTF("/models/iphone16.glb")

const b1t = useLoader(TextureLoader, '/textures/b1.jpg' )
const b2t = useLoader(TextureLoader, '/textures/b2.jpg' )
const b3t = useLoader(TextureLoader, '/textures/b3.jpg' )
const f1t = useLoader(TextureLoader, '/textures/f1.jpg' )
const f2t = useLoader(TextureLoader, '/textures/f2.jpg' )
const f3t = useLoader(TextureLoader, '/textures/f3.avif' )


b1t.wrapS = b1t.wrapT = RepeatWrapping;
b1t.repeat.set(1, 10);
b2t.wrapS = b2t.wrapT = RepeatWrapping;
b2t.repeat.set(1, 10);


f1t.wrapS = f1t.wrapT = RepeatWrapping;
f1t.repeat.set(6,6);

f2t.wrapS = f2t.wrapT = RepeatWrapping;
f2t.repeat.set(1, 2);

f3t.wrapS = f3t.wrapT = RepeatWrapping;
f3t.repeat.set(4, 4);

useEffect(()=>{
    pmodel.traverse((child)=>{

        if(child.isMesh)
        {
            if(!props.cover)
            {
                if(child.name === "Mesh001_1") // front side of phone 
                {
                    child.material.map = f1t;
                    child.material.needsUpdate = true;
                }
                if(child.name === "Mesh001") // back side of phone 
                {
                    child.material.map = b3t;
                    child.material.needsUpdate = true;
                }
            }
        }
        }
    )
},[])



useEffect(()=>{
    pmodel.traverse((child)=>{

        if(child.isMesh)
        {

            child.material.roughness = 0;
            child.material.metalness = 0;

            if(props.cover === "")
            {
                if(child.name === "Mesh001_1") // front side of phone 
                {
                    child.material.map = f1t;
                    child.material.needsUpdate = true;
                }
                if(child.name === "Mesh001") // back side of phone 
                {
                    child.material.map = b1t;
                    child.material.needsUpdate = true;
                }
            }

            if(props.cover === "f1")
            {
                if(child.name === "Mesh001_1") // front side of phone 
                {
                    child.material.map = f1t;
                    child.material.needsUpdate = true;
                }
            }
            if(props.cover === "f2")
            {
                if(child.name === "Mesh001_1") // front side of phone 
                {
                    child.material.map = f2t;
                    child.material.needsUpdate = true;
                }
            }
            if(props.cover === "f3")
            {
                if(child.name === "Mesh001_1") // front side of phone 
                {
                    child.material.map = f3t;
                    child.material.needsUpdate = true;
                }
            }
            if(props.cover === "b1")
            {
                if(child.name === "Mesh001") // back side of phone 
                {
                    child.material.map = b1t;
                    child.material.needsUpdate = true;
                }
            }
            if(props.cover === "b2")
            {
                if(child.name === "Mesh001") // back side of phone 
                {
                    child.material.map = b2t;
                    child.material.needsUpdate = true;
                }
            }
            if(props.cover === "b3")
            {
                if(child.name === "Mesh001") // back side of phone 
                {
                    child.material.map = b3t;
                    child.material.needsUpdate = true;
                }
            }
          
        }
        }
    )
}, [pmodel, props.cover])


    return (
        <>       
        <primitive object={pmodel}  position={[0, 0, 0]}  rotation={[0, Math.PI, 0]} />
        </>
    )
}




function Maincanvas(props){
return (
<>
<Canvas shadows onWheel={ (e)=>{ e.stopPropagation();}} style={{ width:'100%', boxSizing:'border-box', height:'90%', }}>
<ambientLight intensity={0.5} />
<directionalLight position={[0, 0, 2]} intensity={1.5} />
<directionalLight position={[0, 0, -2]} intensity={1.5} />

<directionalLight position={[0, 0.5, 0]} intensity={1.5} />
<directionalLight position={[0, -0.5, 0]} intensity={1.5} />
<AdaptiveDpr/>


<Phonemodel/>


<EffectComposer>
<SSAO 
  radius={0.2}        // Shadow spread size
  intensity={30}       // Shadow darkness
  bias={0.03}          // Helps avoid artifacts
/>
</EffectComposer>
<PerspectiveCamera  makeDefault position={[70, 0, 200]}  />
<OrbitControls  target={[0,0,0]} enableRotate={true} enablePan={true} enableZoom={true} /> 
</Canvas>
</>
)
}


function Fedtest() {

    const [ texture , settexture ] = useState();
  

  return (
  <>

  <div className={Fedtestcss.r1}>
    
  <Maincanvas  />

  <Phonemodel cover={texture} />

<div className={Fedtestcss.form}>
<select name="" id={Fedtestcss.btn} onChange={(e) => { settexture(e.target.value) }}>
    <option value="">Back Cover</option>
    <option value="b1">Back Cover 1</option>
    <option value="b2">Back Cover 2</option>
    <option value="b3">Back Cover 3</option>
</select>

<select name="" id={Fedtestcss.btn} onChange={(e) => {settexture(e.target.value)}}>
    <option value="">Front Cover</option>
    <option value="f1">Front Cover 1</option>
    <option value="f2">Front Cover 2</option>
    <option value="f3">Front Cover 3</option>
</select>
</div>

  </div>
  
  </>
  )
}

export default Fedtest
