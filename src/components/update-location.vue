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
            <v-autocomplete
              required
              v-model="asset_data.building_name"
              :items="arr"
              label="เลือกอาคาร"
              color="teal"
              outlined
              filled
              dense
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Floor</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-autocomplete
              v-model="asset_data.floor_name"
              :items="floor_name"
              label="เลือกชั้น"
              color="teal"
              outlined
              filled
              dense
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-n10 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
            <b> Room</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-autocomplete
              v-model="asset_data.room_name"
              label="เลือกห้อง"
              color="teal"
              :items="room_name"
              outlined
              filled
              dense
            ></v-autocomplete>
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
        <div class="text-center my-5">
          <v-btn
            rounded
            block
            color="teal lighten-1"
            dark
            @click="submit"
          >submit</v-btn>
        </div>
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
      aa: '',
      arr: [],
      pupan: 'pupan post !!',
      resource_name: '',
      test: [''],
      isMounted: false,
      floor_name: [],
      room: [],
      room_name: [],
      status: '',
      message: '',
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
      key1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      value16: '',
      value17: '',
      value18: '',
      value19: '',
      value20: '',
      value21: '',
      value22: '',
      value23: '',
      value24: '',
      value25: '',
      value26: '',
      value27: '',
      object: '',
      enableds: true,
      token: 'test',
      info: null,
      errored: false,
      responseUser: ''
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

  created () {
  },

  methods: {
    reserve () {
      this.loading = true
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
        // var building = await axios
        //   .get(
        //     'http://203.151.199.181:5002/admin/api/v1/building'
        //     // var data = await axios.post('http://203.150.221.207:4000/user/forDoh', // jolly path
        //   )
        //   .then((response) => response.data)
        // console.log(building.data)
        // this.object1 = building.data
        // // alert(this.object1)
        // for (const [key, value] of Object.entries(this.object1)) {
        //   // alert(value.building_name)
        //   this.arr.push(value.building_name)
        //   if (value.building_name === 'OTA') {
        //     this.floor_name.push(value.floor[0].floor_name)
        //     this.room = value.floor[0].room

        //     for (const [key, value] of Object.entries(this.room)) {
        //       console.log(key)
        //       this.room_name.push(this.test)
        //       this.room_name.push(value.room_name)
        //       // this.room_name = value.room_name
        //     }
        //   }

        //   if (value.building_name === 'OAI') {
        //     // alert(value.floor[1].floor_name)
        //     this.floor_name.push(value.floor[0].floor_name)
        //     this.room = value.floor[0].room
        //     for (const [key, value] of Object.entries(this.room)) {
        //       this.room_name.push(this.test)
        //       // alert(this.test)
        //       this.room_name.push(value.room_name)
        //       console.log(key)
        //     }
        //     this.floor_name.push(value.floor[1].floor_name)
        //     this.room = value.floor[1].room

        //     for (const [key, value] of Object.entries(this.room)) {
        //       // alert(value.room_name)
        //       console.log(key)
        //       this.room_name.push(this.test)
        //       // alert(this.test)
        //       this.room_name.push(value.room_name)
        //       // this.room_name = value.room_name
        //     }
        //   }

        //   console.log(key)
        // }

        // this.object = data.data[0]
        // console.log(data.data)
        // // Object.keys(myObj).length

        // for (const [key, value] of Object.entries(this.object)) {
        //   // this.key1 = key
        //   // this.value1 = value

        //   if (key === 'cost_center') {
        //     this.value1 = value
        //     // alert(typeof (this.value1))
        //     // alert(this.value1)
        //   }
        //   if (key === 'create_date') {
        //     this.value2 = value
        //     // alert(this.value2)
        //   }
        //   if (key === 'employee_id') {
        //     this.value3 = value
        //     // alert(this.value3)
        //   }
        //   if (key === 'end_date') {
        //     this.value4 = value
        //     // alert(this.value4)
        //   }
        //   if (key === 'floor_location') {
        //     this.value5 = value
        //     // alert(this.value5)
        //   }
        //   if (key === 'ga_return') {
        //     this.value6 = value
        //     // alert(this.value6)
        //   }
        //   if (key === 'location_name') {
        //     this.value7 = value
        //     // alert(this.value7)
        //   }
        //   if (key === 'period') {
        //     this.value8 = value
        //     //  alert(this.value8)
        //   }
        //   if (key === 'purchase_order') {
        //     this.value9 = value
        //     //  alert(this.value9)
        //   }
        //   if (key === 'remark') {
        //     this.value10 = value
        //     // alert(this.value10)
        //   }
        //   if (key === 'resource_description') {
        //     this.value11 = value
        //     //  alert(this.value11)
        //   }
        //   if (key === 'resource_group') {
        //     this.value12 = value
        //     //   alert(this.value12)
        //   }
        //   if (key === 'resource_name') {
        //     this.value13 = value
        //     //  alert(this.value13)
        //   }
        //   if (key === 'resource_tag') {
        //     this.value14 = value
        //     //  alert(this.value14)
        //   }
        //   if (key === 'room_id') {
        //     this.value15 = value
        //     // alert(this.value15)
        //   }
        //   if (key === 'room_location') {
        //     this.value16 = value
        //     // alert(this.value16)
        //   }
        //   if (key === 'serial_number') {
        //     this.value17 = value
        //     //   alert(this.value17)
        //   }
        //   if (key === 'start_date') {
        //     this.value18 = value
        //     //  alert(this.value19)
        //   }
        //   if (key === 'status_email') {
        //     this.value19 = value
        //     //  alert(this.value19)
        //   }
        //   if (key === 'thing_id') {
        //     this.value20 = value
        //     //  alert(this.value20)
        //   }
        //   if (key === 'type') {
        //     this.value21 = value
        //     // alert(this.value21)
        //   }
        //   if (key === 'user_create') {
        //     this.value22 = value
        //     // alert(this.value22)
        //   }
        //   if (key === 'value') {
        //     this.value23 = value
        //     //  alert(this.value23)
        //   }
        //   if (key === 'vendor_name') {
        //     this.value24 = value
        //     //  alert(this.value24)
        //   }
        //   if (key === 'warranty_enddate') {
        //     this.value25 = value
        //     //  alert(this.value25)
        //   }
        //   if (key === 'warranty_period') {
        //     this.value26 = value
        //     // alert(this.value26)
        //   }
        //   if (key === 'warranty_startdate') {
        //     this.value27 = value
        //     // alert(this.value27)
        //   }
        // }
      } catch (err) {
        this.$router.push('/error')
        alert(err + this.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.required label::after {
    content: "*";
}
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
