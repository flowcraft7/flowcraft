import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';


export function mountConveyor(host){
const reduced=matchMedia("(prefers-reduced-motion: reduce)");let renderer;
renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
let renderScale=Math.min(devicePixelRatio,1);
renderer.setPixelRatio(renderScale);renderer.setClearColor(0x071010,0);renderer.shadowMap.enabled=false;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;host.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x071010,.029);
const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(9,10,14);camera.lookAt(0,.1,0);
const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.035);scene.environment=environment.texture;room.dispose();pmrem.dispose();
scene.environmentIntensity=.68;
scene.add(new THREE.HemisphereLight(0xc5fff0,0x071010,.85));
const key=new THREE.DirectionalLight(0xedfff9,3.4);key.position.set(-3,9,5);scene.add(key);
const rim=new THREE.DirectionalLight(0x27e6bc,4);rim.position.set(5,4,-7);scene.add(rim);
const teal=new THREE.PointLight(0x16efbb,32,12,2);teal.position.set(0,2,0);scene.add(teal);
const platform=new THREE.Group();scene.add(platform);
const metal=new THREE.MeshStandardMaterial({color:0x313f3c,metalness:.86,roughness:.28});
const shell=new THREE.MeshStandardMaterial({color:0x3e5b50,metalness:.88,roughness:.20});
const dark=new THREE.MeshStandardMaterial({color:0x071915,metalness:.58,roughness:.19});
const tealMat=new THREE.MeshStandardMaterial({color:0x23d5bc,emissive:0x12dfa8,emissiveIntensity:2.3,metalness:.45,roughness:.25});
const geometryCache=new Map();
function rounded(w,h,d,r,mat,x=0,y=0,z=0){const key=[w,h,d,r].join(',');if(!geometryCache.has(key))geometryCache.set(key,new RoundedBoxGeometry(w,h,d,2,r));const m=new THREE.Mesh(geometryCache.get(key),mat);m.position.set(x,y,z);return m;}
function cyl(radius,height,mat,x,y,z){const m=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,height,12),mat);m.position.set(x,y,z);return m;}

// Procedural perforation is a repeating industrial material, not a flat hero illustration.
const tile=document.createElement('canvas');tile.width=tile.height=512;const c=tile.getContext('2d');c.fillStyle='#48544f';c.fillRect(0,0,512,512);
for(let y=12;y<512;y+=24)for(let x=12;x<512;x+=24){c.fillStyle='#172721';c.beginPath();c.arc(x,y,2.7,0,Math.PI*2);c.fill();c.fillStyle='#6a7a72';c.fillRect(x-1,y+3,3,1);}
c.strokeStyle='#819287';c.lineWidth=2;c.strokeRect(10,10,492,492);
const texture=new THREE.CanvasTexture(tile);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
const panelMat=new THREE.MeshStandardMaterial({map:texture,metalness:.77,roughness:.36,bumpMap:texture,bumpScale:.045,color:0x61776a});
platform.add(rounded(4.9,.44,29,.06,metal,0,-.48,0));
const belt=[];for(let i=0;i<15;i++){const p=rounded(4.55,.14,1.94,.025,panelMat,0,-.18,(i-7)*2);platform.add(p);belt.push(p);}
const beltMesh=new THREE.InstancedMesh(belt[0].geometry,panelMat,belt.length);beltMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);belt.forEach((p,i)=>{p.updateMatrix();beltMesh.setMatrixAt(i,p.matrix);platform.remove(p);});platform.add(beltMesh);
for(const x of [-2.46,2.46]){
 platform.add(rounded(.09,.15,29,.025,shell,x,-.17,0));
 platform.add(rounded(.03,.035,28,.008,tealMat,x,.015,0));
}
// Scanner: a physical frame surrounding a translucent animated energy plane.
for(const x of [-2.33,2.33]){
 platform.add(cyl(.09,3.8,shell,x,1.65,0));platform.add(cyl(.055,3.64,tealMat,x,1.65,.01));
 platform.add(cyl(.24,.12,metal,x,-.15,0));
}
platform.add(rounded(4.78,.08,.11,.03,shell,0,3.55,0));
const glassMat=new THREE.MeshBasicMaterial({color:0x20dcad,transparent:true,opacity:.27,side:THREE.DoubleSide,depthWrite:false});
const glass=new THREE.Mesh(new THREE.PlaneGeometry(4.62,3.56),glassMat);glass.position.set(0,1.73,0);platform.add(glass);
const scan=rounded(4.57,.035,.05,.008,tealMat,0,1.65,.035);platform.add(scan);
const crossbars=[];for(let j=0;j<14;j++){const m=rounded(4.58,.009,.016,.003,new THREE.MeshBasicMaterial({color:0x50ffcf,transparent:true,opacity:.10}),0,.03+j*.26,.04);platform.add(m);crossbars.push(m);}
const barsGeometry=mergeGeometries(crossbars.map(m=>{m.updateMatrix();return m.geometry.clone().applyMatrix4(m.matrix);}));crossbars.forEach(m=>platform.remove(m));platform.add(new THREE.Mesh(barsGeometry,crossbars[0].material));
const units=[];
for(let i=0;i<4;i++){
 const g=new THREE.Group();const size=1.74;
 const casing=rounded(size,1.55,1.48,.28,shell,0,1.02,0);g.add(casing);
 const bezelMaterial=new THREE.MeshStandardMaterial({color:0x39675a,metalness:.65,roughness:.2,emissive:0x0b7255,emissiveIntensity:.4});
 g.add(rounded(1.45,1.16,.13,.25,bezelMaterial,0,1.01,.711));
 g.add(rounded(1.31,1.02,.13,.22,dark,0,1.01,.79));
 const eyes=[];
 for(const x of [-.31,.31]){const e=rounded(.35,.20,.06,.088,tealMat.clone(),x,1.03,.875);g.add(e);eyes.push(e);}
 for(const x of [-.48,.48]){const pin=cyl(.08,.36,shell,x,1.91,0);pin.rotation.z=x*.3;g.add(pin);g.add(cyl(.083,.06,tealMat,x,2.105,0));}
 g.add(rounded(1.02,.055,.03,.012,metal,0,.52,.874));
 // Tiny ventilation slots in the shell make the object read as engineered hardware.
 for(let j=0;j<6;j++)g.add(rounded(.026,.22,.04,.006,dark,.872,.87,j*.13-.33));
 g.position.z=(i-1.5)*5.8;platform.add(g);units.push({g,eyes,bezelMaterial,phase:i*5.8});
}
// Floor and subtle mounting feet anchor the conveyor in the scene.
const floor=new THREE.Mesh(new THREE.PlaneGeometry(160,160),new THREE.MeshStandardMaterial({color:0x07100e,metalness:.2,roughness:.54}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.2;floor.receiveShadow=true;scene.add(floor);
for(const z of [-9,-3,3,9])for(const x of [-1.8,1.8])platform.add(rounded(.22,.64,.8,.04,metal,x,-.92,z));

// Batch fixed parts by material: one draw call per material instead of per screw/slot.
function batch(group,excluded){const buckets=new Map();for(const child of [...group.children]){if(!child.isMesh||child.isInstancedMesh||excluded.has(child)||child.material.transparent)continue;child.updateMatrix();const geom=(child.geometry.index?child.geometry.toNonIndexed():child.geometry.clone()).applyMatrix4(child.matrix);const items=buckets.get(child.material)||[];items.push(geom);buckets.set(child.material,items);group.remove(child);}for(const [material,geoms]of buckets){const merged=mergeGeometries(geoms);group.add(new THREE.Mesh(merged,material));geoms.forEach(g=>g.dispose());}}
units.forEach(u=>batch(u.g,new Set(u.eyes)));batch(platform,new Set([...belt,scan,glass,...crossbars]));
// A small additive texture supplies soft glow without full-screen bloom passes.
const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=64;const gc=glowCanvas.getContext('2d');const grad=gc.createRadialGradient(32,32,0,32,32,32);grad.addColorStop(0,'rgba(35,255,190,.45)');grad.addColorStop(.35,'rgba(35,230,180,.13)');grad.addColorStop(1,'rgba(35,230,180,0)');gc.fillStyle=grad;gc.fillRect(0,0,64,64);const glowTexture=new THREE.CanvasTexture(glowCanvas);for(const x of [-2.33,2.33]){const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.set(x,2.7,.03);glow.scale.set(1.5,2.9,1);platform.add(glow);}
let pointer={x:0,y:0};const onPointer=e=>{if(reduced.matches)return;const r=host.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;};const onPointerLeave=()=>{pointer={x:0,y:0};};host.addEventListener('pointermove',onPointer);host.addEventListener('pointerleave',onPointerLeave);
let dirty=true;
function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=innerWidth<761?43:35;camera.updateProjectionMatrix();dirty=true;}
const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
let last=performance.now(),time=3.2,inView=true,frameCount=0,frameElapsed=0;const onVisibility=()=>{last=performance.now();dirty=true;};const onMotion=()=>{dirty=true;};document.addEventListener('visibilitychange',onVisibility);reduced.addEventListener('change',onMotion);const intersectionObserver=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;last=performance.now();dirty=true;});intersectionObserver.observe(host);let stopped=false,raf=0;
function animate(now){if(stopped)return;raf=requestAnimationFrame(animate);const elapsed=now-last;last=now;if(document.hidden||!inView)return;if(reduced.matches&&!dirty)return;const dt=Math.min(elapsed/1000,.05);if(!reduced.matches)time+=dt;dirty=false;
 for(const u of units){const z=((time*.92+u.phase)%23.2)-11.6;u.g.position.z=z;u.g.position.y=Math.sin(time*2+u.phase)*.025;u.g.rotation.z=Math.sin(time+u.phase)*.006;const on=z>.15;for(const e of u.eyes){e.material.emissiveIntensity=on?3.1:.13;e.material.color.setHex(on?0x8dffce:0x487366);e.scale.y=on?.82+.18*Math.sin(time*1.5):.5;}u.bezelMaterial.emissiveIntensity=on?.65:.02;}
 belt.forEach((p,i)=>{p.position.z=((i*2+time*.92)%30)-15;p.updateMatrix();beltMesh.setMatrixAt(i,p.matrix);});beltMesh.instanceMatrix.needsUpdate=true;scan.position.y=.2+((time*.65)%3.2);glassMat.opacity=.24+.035*Math.sin(time*3);
 camera.position.x+=(9+pointer.x*.6-camera.position.x)*.03;camera.position.y+=(10-pointer.y*.4-camera.position.y)*.03;camera.lookAt(0,.25,0);renderer.render(scene,camera);
 if(!reduced.matches&&elapsed<150){frameCount++;frameElapsed+=elapsed;if(frameCount===90){host.dataset.fps=String(Math.round(90000/frameElapsed));host.dataset.drawCalls=String(renderer.info.render.calls);host.dataset.triangles=String(renderer.info.render.triangles);if(frameElapsed/90>24&&renderScale>.65){renderScale=Math.max(.65,renderScale-.15);renderer.setPixelRatio(renderScale);resize();}frameCount=0;frameElapsed=0;}}
}
raf=requestAnimationFrame(animate);

return ()=>{
 stopped=true;cancelAnimationFrame(raf);resizeObserver.disconnect();intersectionObserver.disconnect();
 document.removeEventListener('visibilitychange',onVisibility);reduced.removeEventListener('change',onMotion);
 host.removeEventListener('pointermove',onPointer);host.removeEventListener('pointerleave',onPointerLeave);
 const geometries=new Set(),materials=new Set();scene.traverse(obj=>{if(obj.geometry)geometries.add(obj.geometry);if(obj.material)materials.add(obj.material);});
 geometries.forEach(g=>g.dispose());geometryCache.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());
 texture.dispose();glowTexture.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();
};
}
