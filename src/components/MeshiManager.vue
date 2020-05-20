<template>
  <v-container>
    <v-snackbar
      :color="snackbarColor"
      v-model="snackbar"
      top right
      :timeout="3000"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-card
       class="mx-auto"
       max-width="100%"
       outlined
     >
      <v-card-title>
        得意料理の登録
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-meshi-search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="meshis"
        :search="search"
      >

        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" style="margin-left: 10px">New</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <!--
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.ID" label="ID" disabled></v-text-field>
                      </v-col>
                    </v-row>
                    -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="料理名"></v-text-field>
                      </v-col>
                    </v-row>
                    <!--
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.namespace" label="Namespace"></v-text-field>
                      </v-col>
                    </v-row>
                    -->
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-table-edit</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-card-actions>
        <v-btn color="primary" dark class="mb-2" @click="getMeshis" :disabled="!loginUser || !isLoaded">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-btn text @click="$router.push({name: 'meshiRandomizer'})" style="float: right;">戻る</v-btn>
  </v-container>
</template>

<script>
import FirebaseHelper from '@/helper/firebaseHelper'
import MeshiRepository from '@/helper/meshiRepository'
import { mapState } from 'vuex'

export default {
  name: 'MeshiManager',
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    text: "Hello",
    search: '',
    dialog: false,
    editedIndex: -1,
    editedItem: {
        ID: -1,
        name: ''
    },
    defaultItem: {
        ID: -1,
        name: ''
    },
    headers: [
         // { text: 'ID', align: 'left', filterable: false, value: 'ID' },
         { text: 'Name', value: 'name' },
         { text: 'Actions', value: 'action', sortable: false }
    ],
    meshis: [
      // { ID: 'sss', name: 'xxx' }
    ]
  }),
  methods: {
    showSnackbar (color, text) {
        this.text = text
        this.snackbarColor= color
        this.snackbar = true
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
    createMeshi (name) {
      const payload = { name: name }
      return MeshiRepository.createMeshi(payload).then(() => {
        this.showSnackbar("success", `得意料理(${name})の登録に成功`)
        return this.getMeshis ()
      }).catch((err) => {
        console.error(err)
        this.showSnackbar("error", `得意料理(${name})の登録に失敗`)
      })
    },
    getMeshis () {
      return MeshiRepository.getMeshis().then((vals) => {
        let tmp = []
        for (const key in vals) {
          tmp.push({
            ID: key,
            name: vals[key].name
          })
        }
        this.meshis = tmp
        // this.showSnackbar("success", "得意料理の取得に成功")
      })
    },
    updateMeshi (id, name) {
      const payload = {
        name: name
      }
      return MeshiRepository.updateMeshi(id, payload).then(() => {
        this.showSnackbar("success", `得意料理(${id}:${name})の更新に成功`)
      }).catch((err) => {
        console.error(err)
        this.showSnackbar("error", `得意料理(${id}:${name})の更新に失敗`)
      })
    },
    deleteMeshi (id) {
      return MeshiRepository.deleteMeshi(id).then(() => {
        this.showSnackbar("success", `得意料理(${id})の削除に成功`)
        return this.getMeshis ()
      }).catch((err) => {
        console.error(err)
        this.showSnackbar("error", `得意料理(${id})の削除に失敗`)
      })
    },
    editItem(item) {
      this.editedIndex = this.meshis.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.meshis.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (!confirm('Are you sure you want to delete this item?')) {
        return
      }
      if (this.editedIndex > -1) {
        console.log("Deleting existing meshi...")
        console.log(`ID=${this.editedItem.ID}`)
        this.deleteMeshi(this.editedItem.ID)
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.meshis[this.editedIndex], this.editedItem)
        console.log("Editing existing meshi...")
        console.log(`ID=${this.editedItem.ID}`)
        console.log(`name=${this.editedItem.name}`)
        this.updateMeshi(this.editedItem.ID, this.editedItem.name)
      } else {
        // this.meshis.push(this.editedItem)
        console.log("Creating new meshi...")
        console.log(`name=${this.editedItem.name}`)
        this.createMeshi(this.editedItem.name)
      }
      this.close()
    }
  },
  created () {
    if (this.loginUser) {
      this.getMeshis()
    }
  },
  watch: {
    loginUser (val) {
      if (!val) {
        return
      }
      this.getMeshis()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...mapState({
      isLoaded: state => state.isLoaded,
      loginUser: state => state.loginUser,
    })
  }
};
</script>
