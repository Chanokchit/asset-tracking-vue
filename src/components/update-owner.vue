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
            <v-toolbar-title>Transfer asset</v-toolbar-title>
          </h2>
        <v-spacer/>
      </v-toolbar>
      <div class="mx-5">
        <v-row class="mb-n8 mt-5">
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center">
              <b> Department</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
              <v-autocomplete
                required
                :items="arr"
                label="เลือกแผนก"
                outlined
                dense
              ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center" >
              <b> Employee list</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
              <v-select
                :items="floor_name"
                label="เลือกรายชื่อพนักงาน"
                outlined
                dense
              ></v-select>
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
        {{fern}}
      </div>
    </div>
    <div v-else style="center">
     <a
        ref="submitBtn"
        href="https://chat-api.one.th/go_api/api/v1/openScanQRcodeWithValue"
        target="_blank"
        class="button">
        <v-card  class="ma-16" max-width="374">
          <img src="https://sv1.picz.in.th/images/2021/01/27/lvdVgD.th.png" >
      Scan</v-card></a>
    </div>
    <!-- <a v-else
          ref="submitBtn"
          href="https://chat-api.one.th/go_api/api/v1/openScanQRcodeWithValue"
          target="_blank"
          class="button"><v-card  class="ma-16" max-width="374">
      <img src="https://sv1.picz.in.th/images/2021/01/27/lvdVgD.th.png" >Scan
      </v-card></a> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      arr: [],
      pupan: 'pupan post !!',
      fern: '',
      resource_name: '',
      test: [''],
      isMounted: false,
      status: '',
      floor_name: [],
      room: [],
      room_name: [],
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
      loading: true,
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
      await this.getData_department()
    })
  },

  created () {

  },

  methods: {
    async getData_department () {
      alert('this>>>' + this.resource_name)
      try {
        var pupan1 = await axios
          .post(
            'http://203.151.199.181:5001/api/v1/transfer/department',
            { resource_name: this.resource_name },
            {
              headers: {
                sharedtoken:
                this.token,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((response) => response.data)
        this.status = pupan1.status
        alert(this.status)
        this.fern = pupan1.data.department
        for (const [key, value] of Object.entries(this.fern)) {
          this.aa = key
          this.arr.push(value.dept_name)
        }
        // alert(pupan1)
        if (this.status === 'fail') {
          this.$router.push('/error')
          alert('fail')
        // } else {
        }
        // }
        // var building = await axios
        //   .get(
        //     'http://203.151.199.181:5002/admin/api/v1/building'
        //     // var pupan1 = await axios.post('http://203.150.221.207:4000/user/forDoh', // jolly path
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

        // this.object = pupan1.data[0]
        // console.log(pupan1.data)
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
        alert(' error')
        // alert('>>>' + err)
        console.log(err) // handle errors here...
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
    color: rgb(241, 173, 173);
    font-size: 20px;
    margin: -20% -20px;
    text-decoration: none;
    cursor: pointer;
  }
.align-lable{
  column-span: right;
}
@media only screen and(max-width: 600px) {
  .align-lable {
    text-align: right;
  }
}
</style>
