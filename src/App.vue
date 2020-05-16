<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>

        <v-list-item link @click="$router.push({ name: 'home'})">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>HOME</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="$router.push({ name: 'meshiRandomizer'})">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ランダマイザー</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>


    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ごはんランダマイザー</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--
      <v-btn target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      -->
    </v-app-bar>
    <v-content>
      <v-progress-linear indeterminate color="cyan darken-2" v-if="!isLoaded"></v-progress-linear>
      <router-view></router-view>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; Taguro 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data: () => {
    return {
      drawer: null
    }
  },
  components: {
  },
  created () {
  },
  methods: {
  },
  computed: {
    ...mapState({
      isLoaded: state => state.isLoaded,
      loginUser: state => state.loginUser,
    })
  }
};
</script>
