<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">

      <q-tabs align="center">
        <q-route-tab to="/" label="홈" />
        <q-route-tab to="/yongsay/submit" label="용세이 작성" />
        <q-route-tab to="/yongniverse" label="용니버스" />
        <q-route-tab to="/yongsay/contest" label="용세이월드컵" />
        <q-route-tab to="/yongeic" label="용익시험" />
        <q-route-tab to="/board" label="방명록" />
      </q-tabs>
      
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped></style>
