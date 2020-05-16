<template>
  <div>
    ログインしてくださいな

    <v-btn text @click="login" :disabled="!(loginUser==null)">
      Sign-In (with Google)
    </v-btn>

    <v-btn text @click="logout" :disabled="!(loginUser)">
      SingOut (with Google)
    </v-btn>


  </div>
</template>

<script>
import FirebaseHelper from '@/helper/firebaseHelper'
import { mapState } from 'vuex'

export default {
  name: 'Test',
  data: () => ({
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
    }
  },
  computed: {
    ...mapState({
      isLoaded: state => state.isLoaded,
      loginUser: state => state.loginUser,
    })
  }
};
</script>
