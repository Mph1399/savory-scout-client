"use strict";(self.webpackChunksavory_scout_dashboard=self.webpackChunksavory_scout_dashboard||[]).push([[172],{3172:function(dn,R,t){t.r(R),t.d(R,{LoginModule:function(){return sn}});var M=t(3144),E=t(5671),Z=t(9808),G=t(3681),Y=t(3721),D=t(127),U=t(9927),H=t(6029),n=t(5e3),X=t(7685),J=t(4902),z=t(7579),F=t(9646),W=t(8306),x=t(8996),K=t(6451),C=t(5363),g=t(3900),P=t(4004),N=t(3151),$=t(590),w=t(576);function Q(u,e){return(0,w.m)(e)?(0,g.w)(function(){return u},e):(0,g.w)(function(){return u})}var S=t(9468),k=t(9300),V=t(6351),v=t(2011),b=t(440),_=new n.OlP("angularfire2.auth.use-emulator"),nn=new n.OlP("angularfire2.auth.settings"),tn=new n.OlP("angularfire2.auth.tenant-id"),un=new n.OlP("angularfire2.auth.langugage-code"),rn=new n.OlP("angularfire2.auth.use-device-language"),en=new n.OlP("angularfire.auth.persistence"),j=function(){var u=(0,M.Z)(function e(i,s,c,l,o,f,A,h,p,I,L,B){(0,E.Z)(this,e);var T=new z.x,y=(0,F.of)(void 0).pipe((0,C.Q)(o.outsideAngular),(0,g.w)(function(){return l.runOutsideAngular(function(){return Promise.resolve().then(t.bind(t,5881))})}),(0,P.U)(function(){return(0,v.on)(i,l,s)}),(0,P.U)(function(r){return function(e,i,s,c,l,o,f,A){return(0,v.cc)("".concat(e.name,".auth"),"AngularFireAuth",e.name,function(){var h=i.runOutsideAngular(function(){return e.auth()});if(s&&h.useEmulator.apply(h,(0,J.Z)(s)),c&&(h.tenantId=c),h.languageCode=l,o&&h.useDeviceLanguage(),f)for(var p=0,I=Object.entries(f);p<I.length;p++){var L=(0,X.Z)(I[p],2);h.settings[L[0]]=L[1]}return A&&h.setPersistence(A),h},[s,c,l,o,f,A])}(r,l,f,h,p,I,A,L)}),(0,N.d)({bufferSize:1,refCount:!1}));if((0,Z.PM)(c))this.authState=this.user=this.idToken=this.idTokenResult=this.credential=(0,F.of)(null);else{y.pipe((0,$.P)()).subscribe();var O=y.pipe((0,g.w)(function(r){return r.getRedirectResult().then(function(a){return a},function(){return null})}),V.iC,(0,N.d)({bufferSize:1,refCount:!1})),fn=y.pipe((0,g.w)(function(r){return new W.y(function(a){return{unsubscribe:l.runOutsideAngular(function(){return r.onAuthStateChanged(function(d){return a.next(d)},function(d){return a.error(d)},function(){return a.complete()})})}})})),hn=y.pipe((0,g.w)(function(r){return new W.y(function(a){return{unsubscribe:l.runOutsideAngular(function(){return r.onIdTokenChanged(function(d){return a.next(d)},function(d){return a.error(d)},function(){return a.complete()})})}})}));this.authState=O.pipe(Q(fn),(0,S.R)(o.outsideAngular),(0,C.Q)(o.insideAngular)),this.user=O.pipe(Q(hn),(0,S.R)(o.outsideAngular),(0,C.Q)(o.insideAngular)),this.idToken=this.user.pipe((0,g.w)(function(r){return r?(0,x.D)(r.getIdToken()):(0,F.of)(null)})),this.idTokenResult=this.user.pipe((0,g.w)(function(r){return r?(0,x.D)(r.getIdTokenResult()):(0,F.of)(null)})),this.credential=(0,K.T)(O,T,this.authState.pipe((0,k.h)(function(r){return!r}))).pipe((0,P.U)(function(r){return(null==r?void 0:r.user)?r:null}),(0,S.R)(o.outsideAngular),(0,C.Q)(o.insideAngular))}return(0,v.pX)(this,y,l,{spy:{apply:function(a,d,cn){(a.startsWith("signIn")||a.startsWith("createUser"))&&cn.then(function(gn){return T.next(gn)})}}})});return u.\u0275fac=function(i){return new(i||u)(n.LFG(v.Dh),n.LFG(v.xv,8),n.LFG(n.Lbi),n.LFG(n.R0b),n.LFG(V.HU),n.LFG(_,8),n.LFG(nn,8),n.LFG(tn,8),n.LFG(un,8),n.LFG(rn,8),n.LFG(en,8),n.LFG(b.nm,8))},u.\u0275prov=n.Yz7({token:u,factory:u.\u0275fac,providedIn:"any"}),u}(),an=t(5620),m=t(9224),ln=function(){var u=function(){function e(i,s,c){(0,E.Z)(this,e),this.afAuth=i,this.router=s,this.store=c}return(0,M.Z)(e,[{key:"ngOnInit",value:function(){var s=this,c=this;this.authStore$=this.store.select(H.oH).subscribe(function(o){if(!o)return s.router.navigateByUrl("/home")}),U.ui.start("#firebaseui-auth-container",{signInSuccessUrl:"/home",signInOptions:[D.Z.auth.GoogleAuthProvider.PROVIDER_ID,D.Z.auth.EmailAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(f,A){return c.store.dispatch(Y._B({email:f.email,uid:f.uid,token:f.accessToken})),console.log("Auth Result: ",f),!0}}})}},{key:"ngOnDestroy",value:function(){U.ui.delete(),this.authStore$.unsubscribe()}}]),e}();return u.\u0275fac=function(i){return new(i||u)(n.Y36(j),n.Y36(G.F0),n.Y36(an.yh))},u.\u0275cmp=n.Xpm({type:u,selectors:[["app-login"]],decls:7,vars:0,consts:[[1,"main-card",2,"width","268px"],[2,"text-align","center","display","block"],["id","firebaseui-auth-container",1,"auth-container"]],template:function(i,s){1&i&&(n.TgZ(0,"mat-card",0),n.TgZ(1,"mat-card-header",1),n.TgZ(2,"mat-card-subtitle"),n.TgZ(3,"h2"),n._uU(4,"Sign In"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(5,"mat-card-content"),n._UZ(6,"div",2),n.qZA(),n.qZA())},directives:[m.a8,m.dk,m.$j,m.dn],styles:[""]}),u}(),sn=function(){var u=(0,M.Z)(function e(){(0,E.Z)(this,e)});return u.\u0275fac=function(i){return new(i||u)},u.\u0275mod=n.oAB({type:u}),u.\u0275inj=n.cJS({imports:[[Z.ez,m.QW,G.Bz.forChild([{path:"",component:ln}])]]}),u}()}}]);