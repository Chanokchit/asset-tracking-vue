<template>
  <div id="app">
    <div v-if="status === 'success'">
      <v-toolbar
        dark
        flat
        color="teal darken-1"
      >
        <v-spacer/>
          <h2>
            <v-toolbar-title>Information</v-toolbar-title>
          </h2>
        <v-spacer/>
      </v-toolbar>
      <div class="mx-5">
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Owner</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.owner_name"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Asset type</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.asset_type"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="asset_data.asset_type === 'department'" class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Department</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.dept_name"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Thing ID</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.thing_id"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Asset alias</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.resource_name"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Resource tag</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.resource_tag"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Description</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.resource_description"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Building</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.building_name"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Floor</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.floor_name"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Room</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.room_name"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Cost center</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.cost_center"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Purchase order</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              v-model="asset_data.purchase_order"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else>
      <a
          ref="submitBtn"
          href="https://chat-api.one.th/go_api/api/v1/openScanQRcodeWithValue"
          target="_blank"
          class="button">
        <v-card elevation="5" color="#E3F2FD" class="mt-16 rounded-xl center" max-width="500" :loading="loading"  @click="reserve">
          <v-row align="center" justify="center">
            <v-col cols="4">
              <img src="https://sv1.picz.in.th/images/2021/01/27/lvdVgD.th.png" width="100px">
            </v-col>
            <v-col cols="7" class="text font-weight-bold">
              SCAN QR CODE
            </v-col>
          </v-row>
          <template slot="progress">
            <v-progress-linear
              color="indigo darken-1"
              height="10"
            indeterminate
          ></v-progress-linear>
          </template>
        </v-card>
      </a>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      resource_name: '',
      status: '',
      message: '',
      asset_data: {
        asset_type: '',
        building_name: '',
        cost_center: '',
        dept_name: '',
        floor_name: '',
        owner_name: '',
        purchase_order: '',
        resource_description: '',
        resource_name: '',
        resource_tag: '',
        room_name: '',
        thing_id: ''
      }
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    this.token = this.$route.query.a
    this.$refs.submitBtn.click()
    window.addEventListener('oneChatCallBackQRScanner', async (e) => {
      this.resource_name = e.detail.qrcode
      await this.getDataGetCheck()
    })
  },

  created () {},

  methods: {
    reserve () {
      this.loading = true
    },
    async getDataGetCheck () {
      try {
        var data = await axios
          .post(
            'http://203.151.199.181:5001/api/v1/scan',
            { resource_name: this.resource_name },
            {
              headers: {
                shared_token: this.token,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((response) => response.data)
        this.asset_data = data.data[0]
        this.status = data.status
        this.message = data.message

        if (this.status === 'fail') {
          this.$router.push('/error')
          alert('message ' + this.message)
        }
      } catch (err) {
        this.$router.push('/error')
        alert(err + this.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
    border: none;
    text-decoration: none;
    cursor: pointer;
  }
.text {
    color: #1a2641;
    font-size: 19px;
  }
.center {
  margin: auto;
  width: 80%;
  text-align: center;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
