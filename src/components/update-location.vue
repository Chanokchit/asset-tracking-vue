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
            <v-toolbar-title>Information location update </v-toolbar-title>
          </h2>
        <v-spacer/>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
      <div class="mx-5">
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
            <v-select
              required
              v-model="building.building_name"
              :items="arr_building"
              label="เลือกอาคาร"
              color="teal"
              outlined
              filled
              dense
              :rules="[v => !!v || 'Item is required']"
              @change="getfloor()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Floor</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-select
              required
              v-model="floor.floor_name"
              :items="arr_floor"
              label="เลือกชั้น"
              color="teal"
              outlined
              filled
              dense
              :rules="[v => !!v || 'Item is required']"
              @change="getroom()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Room</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-select
              v-model="room.room_name"
              :items="arr_room"
              label="เลือกห้อง"
              color="teal"
              outlined
              filled
              dense
              @change="getroom_id()"
            ></v-select>
          </v-col>
        </v-row>
        {{building.building_id +'>>>'+ building.building_name +'>>>'+ floor.floor_id+'>>>' + floor.floor_name+'>>>' + room.room_id+'>>>' + room.room_name}}
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
        <v-row class="mt-5">
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
        <!-- {{building_data}} -->
        <div class="text-center my-5">
          <v-btn
            rounded
            block
            color="teal lighten-1"
            dark
            @click="validate()"
          >submit</v-btn>
        </div>
      </div>
      </v-form>
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
      valid: true,
      loading: false,
      resource_name: '',
      arr_building: [],
      arr_floor: [],
      arr_room: [],
      status: '',
      status_submit: '',
      message: '',
      message_submit: '',
      building_data: [],
      floor_data: [],
      room_data: [],
      building: {
        building_id: '',
        building_name: ''
      },
      floor: {
        floor_id: '',
        floor_name: ''
      },
      room: {
        room_id: '',
        room_name: ''
      },
      asset_data: {
        access_token: '',
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
      },
      token: ''
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

  methods: {
    validate () {
      if (this.$refs.form.validate() === false) {
        alert('false')
      } else {
        this.submit()
      }
    },
    reserve () {
      this.loading = true
    },
    async getfloor () {
      this.arr_floor = []
      this.arr_room = []
      this.floor.floor_id = ''
      this.floor.floor_name = ''
      this.room.room_name = ''
      this.room.room_id = ''
      for (let i = 0; i < this.building_data.length; i++) {
        const name = this.building_data[i]
        if (name.building_name === this.building.building_name) {
          this.building.building_id = name.building_id

          var floor = await axios
            .get(
              'http://203.151.199.181:5002/admin/api/v1/floor/get',
              {
                params: {
                  building_id: this.building.building_id,
                  'Content-Type': 'application/json'
                }
              }
            ).then((response) => response.data)
          this.object2 = floor.data
          this.floor_data = floor.data
          for (const [key, value] of Object.entries(this.object2)) {
            console.log(key.floor_name)
            this.arr_floor.push(value.floor_name)
          }
        }
      }
    },
    async getroom () {
      this.arr_room = []
      this.room.room_name = ''
      this.room.room_id = ''
      for (let i = 0; i < this.floor_data.length; i++) {
        const name = this.floor_data[i]
        if (name.floor_name === this.floor.floor_name) {
          this.floor.floor_id = name.floor_id

          var room = await axios
            .get(
              'http://203.151.199.181:5002/admin/api/v1/room/get',
              {
                params: {
                  floor_id: this.floor.floor_id,
                  'Content-Type': 'application/json'
                }
              }
            ).then((response) => response.data)
          this.object2 = room.data
          this.room_data = room.data
          for (const [key, value] of Object.entries(this.object2)) {
            console.log(key.room_name)
            this.arr_room.push(value.room_name)
          }
        }
      }
    },
    getroom_id () {
      for (let i = 0; i < this.room_data.length; i++) {
        const name = this.room_data[i]
        if (name.room_name === this.room.room_name) {
          this.room.room_id = name.room_id
        }
      }
    },
    async getDataGetCheck () {
      try {
        var data = await axios
          .post(
            'http://203.151.199.181:5001/api/v1/scan/checkowner',
            { resource_name: this.resource_name },
            {
              headers: {
                shared_token: this.token,
                'Content-Type': 'application/json'
              }
            }
          ).then((response) => response.data)
        this.asset_data = data.data[0]
        this.status = data.status
        this.message = data.message

        if (this.status === 'fail') {
          this.$router.push('/error')
        }
        var building = await axios
          .get(
            'http://203.151.199.181:5002/admin/api/v1/building/get'
          )
          .then((response) => response.data)
        this.object1 = building.data
        this.building_data = building.data
        for (const [key, value] of Object.entries(this.object1)) {
          console.log(key.building_name)
          this.arr_building.push(value.building_name)
        }
      } catch (err) {
        this.$router.push('/error')
        alert(err + this.message)
      }
    },
    async submit () {
      try {
        var data = await axios
          .put(
            'http://203.151.199.181:5001/api/v1/location/edit',
            { resource_name: this.resource_name, building: this.building, floor: this.floor, room: this.room },
            {
              headers: {
                access_token: this.asset_data.access_token,
                'Content-Type': 'application/json'
              }
            }
          ).then((response) => response.data)
        this.status_submit = data.status
        this.message_submit = data.message
        alert('>>>>' + this.status_submit + this.message_submit)
        if (this.status_submit === 'success') {
          this.$router.push('/success')
        } else if (this.message_submit === 'location is in use') {
          this.building.building_name = ''
          this.floor.floor_name = ''
          this.room.room_name = ''
          alert('location is in use')
        } else {
          this.$router.push('/error')
        }
      } catch (err) {
        this.$router.push('/error')
        alert('>>>>' + err + this.message_submit)
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
    color: #283593;
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
