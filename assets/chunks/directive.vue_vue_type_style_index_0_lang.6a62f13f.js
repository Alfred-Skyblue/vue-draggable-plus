import{d as v,h as i,E as g,o as a,c as l,k as _,J as d,w as f,a8 as x,F as m,G as y,l as k,R as b,t as w,a0 as J,b as E}from"./framework.c4174f91.js";import{V,u as j}from"./component.8cee9576.js";import{v as C}from"./directive.d70e711a.js";const D={class:"flex justify-between"},T=v({__name:"demo",setup(h){const n=i(!1),e=i([{name:"Joao",id:1},{name:"Jean",id:2},{name:"Johanna",id:3},{name:"Juan",id:4}]);function r(){n.value=!0}function p(){console.log("onEnd"),b(()=>{n.value=!1})}function u(){e.value.sort((s,t)=>s.id-t.id)}return(s,t)=>{const c=g("preview-list");return a(),l(m,null,[_("button",{onClick:u},"还原"),_("div",D,[d(k(V),{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=o=>e.value=o),animation:"150",target:".sort-target",class:"flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded",onStart:r,onEnd:p},{default:f(()=>[d(x,{type:"transition",tag:"ul",name:n.value?null:"fade",class:"sort-target"},{default:f(()=>[(a(!0),l(m,null,y(e.value,(o,$)=>(a(),l("li",{key:o.id,class:"cursor-move h-50px bg-gray-500/5 rounded flex items-center justify-between px-2"},w(o.name),1))),128))]),_:1},8,["name"])]),_:1},8,["modelValue"]),d(c,{list:e.value},null,8,["list"])])],64)}}});const B={class:"flex justify-between"},L=v({__name:"hooks",setup(h){const n=i(!1),e=i([{name:"Joao",id:1},{name:"Jean",id:2},{name:"Johanna",id:3},{name:"Juan",id:4}]),r=i();j(r,e,{animation:150,onStart(){n.value=!0},onEnd(){console.log("onEnd"),b(()=>{n.value=!1})}});const p=()=>{e.value.sort((u,s)=>u.id-s.id)};return(u,s)=>{const t=g("preview-list");return a(),l(m,null,[_("button",{onClick:p},"还原"),_("div",B,[d(x,{class:"flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded",ref_key:"el",ref:r,type:"transition",tag:"ul",name:n.value?null:"fade"},{default:f(()=>[(a(!0),l(m,null,y(e.value,c=>(a(),l("li",{key:c.id,class:"cursor-move h-50px bg-gray-500/5 rounded flex items-center justify-between px-2"},w(c.name),1))),128))]),_:1},8,["name"]),d(t,{list:e.value},null,8,["list"])])],64)}}});const S={class:"flex justify-between"},R=v({__name:"directive",setup(h){const n=i(!1),e=i([{name:"Joao",id:1},{name:"Jean",id:2},{name:"Johanna",id:3},{name:"Juan",id:4}]);function r(){n.value=!0}function p(){console.log("onEnd"),b(()=>{n.value=!1})}function u(){e.value.sort((s,t)=>s.id-t.id)}return(s,t)=>{const c=g("preview-list");return a(),l(m,null,[_("button",{onClick:u},"还原"),_("div",S,[J((a(),E(x,{class:"flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded",type:"transition",tag:"ul",name:n.value?null:"fade"},{default:f(()=>[(a(!0),l(m,null,y(e.value,o=>(a(),l("li",{key:o.id,class:"cursor-move h-50px bg-gray-500/5 rounded flex items-center justify-between px-2"},w(o.name),1))),128))]),_:1},8,["name"])),[[k(C),[e.value,{animation:150,onStart:r,onEnd:p}]]]),d(c,{list:e.value},null,8,["list"])])],64)}}});export{T as _,L as a,R as b};