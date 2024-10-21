import{_ as w}from"./rdLTq2yI.js";import{u as M,_ as $,a as C,b as B}from"./cOrkYD7J.js";import{e as H,K as N,N as L,u as S,o as d,c as i,a as e,l as n,f as x,w as o,t as p,d as m,G as V,b as s,F as f,r as j,_ as k,m as F}from"./B8mystvN.js";import"./wYf66LjI.js";const D={class:"w-full fixed top-0 bg-white border-gray-200 dark:bg-gray-900 z-20 border border-gray-200"},R={class:"flex flex-wrap items-center justify-between mx-auto p-4"},E={class:"flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"},G={class:"flex items-center"},K={class:"px-4 py-3"},O={class:"block text-sm text-gray-900 dark:text-white"},P={class:"block text-sm text-gray-500 truncate dark:text-gray-400"},T={class:"py-2"},q={class:"py-2"},I={class:"items-center justify-between hidden w-full md:flex md:w-auto md:order-1",id:"navbar-user"},J={class:"flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"},Q=H({__name:"header",setup(c){const a=M(),r=N(),g=L(),_=a.get("header");return a.get("headerMobile"),S({title:"Slovo-book.ru"}),(de,t)=>{const u=w,h=$,z=C,A=B;return d(),i(f,null,[e("nav",D,[e("div",R,[t[8]||(t[8]=e("a",{href:"https://flowbite.com/",class:"flex items-center space-x-3 rtl:space-x-reverse"},[e("img",{src:"https://flowbite.com/docs/images/logo.svg",class:"h-8",alt:"Flowbite Logo"}),e("span",{class:"self-center text-2xl font-semibold whitespace-nowrap dark:text-white"},"Slovo-book.ru")],-1)),e("div",E,[n(r).user?(d(),x(h,{key:0},{trigger:o(()=>{var l,y,v,b;return[e("div",G,[t[3]||(t[3]=e("button",{type:"button",class:"flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",id:"user-menu-button","aria-expanded":"false","data-dropdown-toggle":"user-dropdown","data-dropdown-placement":"bottom"},[e("svg",{class:"mx-auto text-gray-500 w-10 h-10 dark:text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z","clip-rule":"evenodd"})])],-1)),e("div",K,[e("span",O,p((y=(l=n(r))==null?void 0:l.user)==null?void 0:y.name),1),e("span",P,p((b=(v=n(r))==null?void 0:v.user)==null?void 0:b.email),1)])])]}),content:o(()=>[e("ul",T,[e("li",null,[n(r).checkAdmin?(d(),x(u,{key:0,to:{name:"admin-panel"},class:"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"},{default:o(()=>t[4]||(t[4]=[m("Панель администратора")])),_:1})):V("",!0)]),e("li",null,[s(u,{to:{name:"profile"},class:"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"},{default:o(()=>t[5]||(t[5]=[m("Личный кабинет")])),_:1})]),e("li",null,[e("button",{onClick:t[0]||(t[0]=l=>n(r).logout()),class:"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"},"Выйти из уч. записи")])])]),_:1})):(d(),x(h,{key:1},{trigger:o(()=>t[6]||(t[6]=[e("div",{class:"flex items-center space-x-3 md:space-x-0"},[e("button",{type:"button",class:"flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",id:"user-menu-button","aria-expanded":"false","data-dropdown-toggle":"user-dropdown","data-dropdown-placement":"bottom"},[e("svg",{class:"mx-auto text-gray-500 w-10 h-10 dark:text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z","clip-rule":"evenodd"})])])],-1)])),content:o(()=>[e("ul",q,[e("li",null,[e("button",{onClick:t[1]||(t[1]=l=>n(g).activateLogin()),class:"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"},"Войти")]),e("li",null,[e("button",{onClick:t[2]||(t[2]=l=>n(g).activateRegister()),class:"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"},"Зарегистрироваться")])])]),_:1})),t[7]||(t[7]=e("button",{"data-collapse-toggle":"navbar-user",type:"button",class:"inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600","aria-controls":"navbar-user","aria-expanded":"false"},[e("span",{class:"sr-only"},"Open main menu"),e("svg",{class:"w-5 h-5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 17 14"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 1h15M1 7h15M1 13h15"})])],-1))]),e("div",I,[e("ul",J,[(d(!0),i(f,null,j(n(_),l=>(d(),i("li",null,[s(u,{href:l.link,class:"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700","aria-current":"page"},{default:o(()=>[m(p(l.text),1)]),_:2},1032,["href"])]))),256))])])])]),s(z),s(A)],64)}}}),U={},W={id:"sidebar",class:"fixed top-0 left-0 z-10 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width hidden","aria-label":"Sidebar"},X={class:"relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"},Y={class:"flex flex-col flex-1 pt-5 pb-4 overflow-y-auto"},Z={class:"flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"},ee={class:"pb-2 space-y-2"},te={class:"pt-2 space-y-2"};function re(c,a){const r=w;return d(),i("aside",W,[e("div",X,[e("div",Y,[e("div",Z,[e("ul",ee,[e("li",null,[s(r,{to:{name:"admin-panel-users"},exactActiveClass:"bg-gray-100",class:"flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"},{default:o(()=>a[0]||(a[0]=[e("svg",{class:"w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"})],-1),e("span",{class:"ml-3"},"Пользователи",-1)])),_:1})]),e("li",null,[s(r,{to:{name:"admin-panel-categories"},exactActiveClass:"bg-gray-100",class:"flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"},{default:o(()=>a[1]||(a[1]=[e("svg",{class:"flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"})],-1),e("span",{class:"ml-3"},"Категории",-1)])),_:1})])]),e("div",te,[s(r,{to:{name:"admin-panel-settings"},exactActiveClass:"bg-gray-100",class:"flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"},{default:o(()=>a[2]||(a[2]=[e("svg",{class:"w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},[e("path",{"clip-rule":"evenodd","fill-rule":"evenodd",d:"M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"})],-1),e("span",{class:"ml-3"},"Настройки",-1)])),_:1})])])])])])}const ae=k(U,[["render",re]]),oe={},se={class:"wrapper"},le={id:"main-content",class:"relative h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"};function ne(c,a){const r=Q,g=ae;return d(),i(f,null,[s(r),e("div",se,[s(g),e("div",le,[F(c.$slots,"default")])])],64)}const xe=k(oe,[["render",ne]]);export{xe as default};