import{J as r,K as o,L as s,M as m}from"./B8mystvN.js";const i=r((n,l)=>{const a=o();if(console.log("manager middleware"),console.log(!a.user.roles||!a.user.roles.find(e=>e.name==="admin"||e.name==="manager")),!a.user.roles||!a.user.roles.find(e=>e.name==="admin"||e.name==="manager"))return s("intended_url").value=n.path,m({name:"profile-me"})});export{i as default};
