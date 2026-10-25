import * as THREE from 'three'
const noiseGLSL=`
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(4.7,8.3);a*=.5;}return v;}
float front(vec2 uv,float burn){vec2 p=uv-.5;float edge=min(min(uv.x,1.-uv.x),min(uv.y,1.-uv.y));return edge-burn*.72+(.5-fbm(uv*13.))* .075* smoothstep(0.,.08,burn);}
`
export function createBurnMaterial(){
 return new THREE.ShaderMaterial({transparent:true,side:THREE.DoubleSide,uniforms:{burn:{value:0},time:{value:0},photo:{value:new THREE.Texture()},hasPhoto:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 vUv;uniform float burn,time,hasPhoto;uniform sampler2D photo;${noiseGLSL}
 void main(){float d=front(vUv,burn);if(d<0.)discard;vec2 p=vUv-.5;float head=1.-smoothstep(.105,.12,length((p-vec2(0.,.13))*vec2(1.,.8)));float body=1.-smoothstep(.18,.22,length((p+vec2(0.,.29))*vec2(.75,1.)));vec3 col=mix(vec3(.16,.19,.19),vec3(.025,.035,.04),max(head,body));if(hasPhoto>.5)col=texture2D(photo,vUv).rgb;
 float burnActive=smoothstep(0.,.035,burn);float charred=(1.-smoothstep(.008,.065,d))*burnActive;col=mix(col,vec3(.022,.012,.008),charred*.97);float ember=exp(-d*260.)*burnActive;col+=vec3(1.,.19,.012)*ember*(.65+.35*noise(vUv*120.+time*3.));gl_FragColor=vec4(col,1.);}`})
}
export function createFlames(paperMaterial){
 const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,uniforms:paperMaterial.uniforms,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 vUv;uniform float burn,time;${noiseGLSL}
 void main(){vec2 uv=(vUv-.5)*vec2(1.48,1.43)+.5;float power=smoothstep(.005,.09,burn)*(1.-smoothstep(.78,1.,burn));if(power<.001)discard;float flame=0.;
 for(int i=0;i<7;i++){float h=float(i)*.017;vec2 q=uv-vec2(0.,h);q.x+=sin(q.y*22.-time*7.+float(i))*.008*(1.+float(i)*.18);float d=abs(front(q,burn));float width=.008+.011*fbm(vec2(q.x*35.,q.y*22.-time*3.));float plume=exp(-d/width)*exp(-float(i)*.34);flame=max(flame,plume);}
 float turbulence=fbm(vec2(uv.x*27.+sin(uv.y*9.-time*4.),uv.y*19.-time*4.5));flame*=smoothstep(.15,.7,turbulence)*power;float alpha=smoothstep(.03,.65,flame);vec3 color=mix(vec3(.95,.055,.002),vec3(1.,.52,.035),smoothstep(.08,.45,flame));color=mix(color,vec3(1.,.9,.48),smoothstep(.5,1.,flame));gl_FragColor=vec4(color*1.5,alpha*.9);}`})
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(3.7,4.576),material);mesh.position.z=.035;return mesh
}

