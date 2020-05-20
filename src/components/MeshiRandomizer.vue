<template>
  <v-container>
    <v-snackbar
      :color="snackbarColor"
      v-model="snackbarEnable"
      top right
      :timeout="3000"
    >
      {{ snackbarText }}
      <v-btn
        color="pink"
        text
        @click="snackbarEnable = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-layout
      text-center
      wrap
    >
     <v-flex xs12 style="margin-top: 10px">
       <v-btn text @click="$router.push({name: 'meshiManager'})" style="float: right;">
         得意料理の管理(登録・削除)
       </v-btn>
     </v-flex>

     <v-flex xs12 style="margin-top: 10px">
       <v-card
          class="mx-auto"
          max-width="100%"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
               <div class="overline mb-4">
               </div>
               <v-list-item-title class="headline mb-1">
                 本日のごはん
               </v-list-item-title>
               <v-list-item-subtitle>
                 下のランダマイズ実行を押してみましょう
               </v-list-item-subtitle>
             </v-list-item-content>
             <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
           </v-list-item>
         <v-card-text>
           <div class="text-center">
             <span class="pink--text display-1">{{ msg }} </span>
           </div>
         </v-card-text>
         <v-card-actions>
           <v-btn text @click="doRandomize" :disabled="!isLoaded">
             ランダマイズ実行
           </v-btn>
         </v-card-actions>
       </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import FirebaseHelper from '@/helper/firebaseHelper'
import MeshiRepository from '@/helper/meshiRepository'
import { mapState } from 'vuex'

export default {
  name: 'MeshiRandomizer',
  data: () => ({
    msg: "",
    snackbarEnable: false,
    snackbarColor: "error",
    snackbarText: "Hello",
  }),
  methods: {
    login () {
      // eslint-disable-next-line
      console.log("Login")
      FirebaseHelper.signIn()
    },
    logout () {
      // eslint-disable-next-line
      console.log("LogOut")
      FirebaseHelper.signOut()
    },
    showSnackbar (color, text) {
        this.text = text
        this.snackbarColor= color
        this.snackbar = true
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random()*(max+1-min))+min 
    },
    doRandomize () {
        MeshiRepository.getMeshis().then((vals) => {
          if (!vals) { return }
          const idx = this.getRandomInt(0, Object.keys(vals).length-1)
          const selectedItem = Object.values(vals)[idx]
          console.log(selectedItem)
          this.msg= `今日は「${selectedItem.name}」を食べよう`
        })
    },
    generateFirebaseCustomToken () {
      FirebaseHelper.getCurrentToken()
      .then((token) => {
        this.gotFirebaseJwt = token
      })
      .catch((err) => {
        this.gotFirebaseJwt = err
      })
    },
  },
  computed: {
    ...mapState({
      isLoaded: state => state.isLoaded,
      loginUser: state => state.loginUser,
    })
  }
};
</script>
