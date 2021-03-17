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
                v-model="dept_name"
                :items="arr_department"
                label="เลือกแผนก"
                color="teal"
                outlined
                filled
                dense
                :rules="[v => !!v || 'Item is required']"
                @change="getperson()"
              ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" md="3" class="mt-2 text-center" >
              <b> Employee list</b>
          </v-col>
          <v-col cols="12" sm="8" md="8">
              <v-select
                :items="arr_employee"
                label="เลือกรายชื่อพนักงาน"
                outlined
                dense
              ></v-select>
          </v-col>
        </v-row>
        {{personal}}
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
      arr_department: [],
      arr_employee: [],
      resource_name: '',
      tax_id: '',
      depart_id: '',
      access_token: '',
      department: [],
      personal: '',
      dept_name: '',
      status: '',
      token: '',
      loading: false
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
    reserve () {
      this.loading = true
    },
    async getData_department () {
      try {
        var data = await axios
          .post(
            'http://203.151.199.181:5001/api/v1/transfer/department',
            { resource_name: this.resource_name },
            {
              headers: {
                shared_token: this.token,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((response) => response.data)
        this.status = data.status
        this.tax_id = data.data.tax_id
        this.access_token = data.data.access_token
        this.department = data.data.department
        for (const [key, value] of Object.entries(this.department)) {
          console.log(key)
          this.arr_department.push(value.dept_name)
        }
        if (this.status === 'fail') {
          this.$router.push('/error')
          alert('fail')
        }
      } catch (err) {
        alert('error')
        console.log(err)
      }
    },
    async getperson () {
      this.arr_employee = []
      for (let i = 0; i < this.department.length; i++) {
        const base = this.department[i]
        if (base.dept_name === this.dept_name) {
          this.depart_id = base.depart_id
          // alert(this.depart_id)
          var data = await axios
            .post(
              'http://203.151.199.181:5001/api/v1/transfer/person',
              {
                tax_id: this.tax_id,
                depart_id: this.depart_id,
                resource_name: this.resource_name
              },
              {
                headers: {
                  access_token: this.access_token,
                  'Content-Type': 'application/json'
                }
              }
            ).then((response) => response.data)
          this.object2 = data.data.people
          this.personal = data.data.people
          alert(data.message)
          for (const [key, value] of Object.entries(this.object2)) {
            console.log(key)
            this.arr_employee.push(value.first_name_th)
          }
        }
      }
    },
    getroom_id () {
      // for (let i = 0; i < this.room_data.length; i++) {
      //   const name = this.room_data[i]
      //   if (name.room_name === this.room.room_name) {
      //     this.room.room_id = name.room_id
      //   }
      // }
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
