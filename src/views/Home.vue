<template>
  <div>
    <div></div>
    <div>
      <div id="app">
        <div v-if="status === 'success'" class="mt-n3 mx-3">
          <v-row>
            <v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> Asset alias</b></div>
                <br />
                <v-text-field
                  v-model="value13"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> Description</b></div>
                <br />
                <v-text-field
                  v-model="value11"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> building</b></div>
                <br />
                <v-text-field
                  v-model="value7"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> Floor</b></div>
                <br />
                <v-text-field
                  v-model="value5"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> Room</b></div>
                <br />
                <v-text-field
                  v-model="value16"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> Cost center</b></div>
                <br />
                <v-text-field
                  v-model="value1"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div ><b> Purchase order</b></div>
                <br />
                <v-text-field
                  v-model="value9"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>
        </div>
        <h1 v-else  style="center">
          <a

            ref="submitBtn"
            @click="submit"
            href="https://chat-api.one.th/go_api/api/v1/openScanQRcodeWithValue"
            target="_blank"
            >--------Scan QR----------</a
          >
        </h1>
      </div>
    </div>

    <!-- <v-btn @click="getDataGetCheck()"> button axios </v-btn> -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      pupan: 'pupan post !!',
      resource_name: '',
      isMounted: false,
      status: '',
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
    this.$refs.submitBtn.click()
    window.addEventListener('oneChatCallBackQRScanner', async (e) => {
      // alert(e.detail.qrcode)

      this.resource_name = e.detail.qrcode
      await this.getDataGetCheck()
    })

    // window.addEventListener('oneChatBluetootchCallBackData', async (e) => {
    //   this.data = e.detail
    //   alert(this.data)
    // })
  },

  created () {},

  methods: {
    submit () {
      console.log('submit')
    },
    async getDataGetCheck () {
      // async getDataGetCheck () {
      try {
        // alert(this.resource_name)
        var pupan1 = await axios
          .post(
            'http://203.151.199.181:5001/api/v1/scan',
            // var pupan1 = await axios.post('http://203.150.221.207:4000/user/forDoh', // jolly path
            { resource_name: this.resource_name },
            {
              headers: {
                shared_token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpTVXpJMU5pSXNJbXAwYVNJNklqUmtOamczWlRNNFlqazVOR1V3TmpGa1pUY3dNVFpqT0dKbU1tTXdPVEUxT1dRek16YzJNak5qTlRGa09UWXpaVFZtWTJFd05qTmxNRGsyTmpFMFpEUTJZVGhoWldNNE1UUTVaV05rWXpReElpd2lhMmxrSWpvaUluMC5leUpoZFdRaU9pSXlJaXdpYW5ScElqb2lOR1EyT0RkbE16aGlPVGswWlRBMk1XUmxOekF4Tm1NNFltWXlZekE1TVRVNVpETXpOell5TTJNMU1XUTVOak5sTldaallUQTJNMlV3T1RZMk1UUmtORFpoT0dGbFl6Z3hORGxsWTJSak5ERWlMQ0pwWVhRaU9qRTJNVFF3TnpjMk1qTXNJbTVpWmlJNk1UWXhOREEzTnpZeU15d2laWGh3SWpveE5qRTBNRGMzT1RJekxDSnpkV0lpT2lJNE1UZzJOVE16TXpjd09EZ2lMQ0oxYzJWeWJtRnRaU0k2SW5CMWNHRnVjRzhpZlEuaWpDc2hnWEExNF9BNWFfcUtDcUhVcGdIbU1kMVhlRk9PeUZYYXVHTHRjU1d2XzhoREFEdEFhYTZObWtXVXZCVTRxQnIzUUZGTnF4NWhiVU05ajVjYlRraE44bktxTk92djhiMlJDWUtmTVctby16YmpOQ2RzY2dJUW1mQkNjN1JuSUpaT1pURXlOMEI2YldqVFVSNlFUeTV4QWhUQUdfRFhpcjBaaHUwVnJNN2E5U25EeDNFa05VWjdXd2J6TlFqNFhwSDByRzYxUnVMNVBJSVBGa24zQ0VMdUdsdVAzRlNGMlJfNzg3TWJRdDRnWWRWT213VF9rYmZWeHBVOEZJSUVDa0JvcTNMV2Z2Nkl0VGNzbTlxd3htcEJ4aEVOQ3ZtVS0xdXBIbS1FSENYT1dGcFFjajBqQWF1YTBFRWdWQV9EN1pSOTkybDdtUGZWTEZ5cE1YSnVBIn0.Fx46lrP1yrvE6lHM5BbnTytjERKirMQfFu5fNGgjDQs',
                'Content-Type': 'application/json'
              }
            }
          )
          .then((response) => response.data)
        // JSON.parse(JSON.parse(JSON.stringify(pupan1.data[0])))
        this.object = pupan1.data[0]
        // console.log(pupan1.data)
        this.status = pupan1.status
        // alert(this.status)

        if (this.status === 'fail') {
          this.$router.push('/error')
        }
        for (const [key, value] of Object.entries(this.object)) {
          // this.key1 = key
          // this.value1 = value

          if (key === 'cost_center') {
            this.value1 = value
            // alert(this.value1)
          }
          if (key === 'create_date') {
            this.value2 = value
            // alert(this.value2)
          }
          if (key === 'employee_id') {
            this.value3 = value
            // alert(this.value3)
          }
          if (key === 'end_date') {
            this.value4 = value
            // alert(this.value4)
          }
          if (key === 'floor_location') {
            this.value5 = value
            // alert(this.value5)
          }
          if (key === 'ga_return') {
            this.value6 = value
            // alert(this.value6)
          }
          if (key === 'location_name') {
            this.value7 = value
            // alert(this.value7)
          }
          if (key === 'period') {
            this.value8 = value
            //  alert(this.value8)
          }
          if (key === 'purchase_order') {
            this.value9 = value
            //  alert(this.value9)
          }
          if (key === 'remark') {
            this.value10 = value
            // alert(this.value10)
          }
          if (key === 'resource_description') {
            this.value11 = value
            //  alert(this.value11)
          }
          if (key === 'resource_group') {
            this.value12 = value
            //   alert(this.value12)
          }
          if (key === 'resource_name') {
            this.value13 = value
            //  alert(this.value13)
          }
          if (key === 'resource_tag') {
            this.value14 = value
            //  alert(this.value14)
          }
          if (key === 'room_id') {
            this.value15 = value
            // alert(this.value15)
          }
          if (key === 'room_location') {
            this.value16 = value
            // alert(this.value16)
          }
          if (key === 'serial_number') {
            this.value17 = value
            //   alert(this.value17)
          }
          if (key === 'start_date') {
            this.value18 = value
            //  alert(this.value19)
          }
          if (key === 'status_email') {
            this.value19 = value
            //  alert(this.value19)
          }
          if (key === 'thing_id') {
            this.value20 = value
            //  alert(this.value20)
          }
          if (key === 'type') {
            this.value21 = value
            // alert(this.value21)
          }
          if (key === 'user_create') {
            this.value22 = value
            // alert(this.value22)
          }
          if (key === 'value') {
            this.value23 = value
            //  alert(this.value23)
          }
          if (key === 'vendor_name') {
            this.value24 = value
            //  alert(this.value24)
          }
          if (key === 'warranty_enddate') {
            this.value25 = value
            //  alert(this.value25)
          }
          if (key === 'warranty_period') {
            this.value26 = value
            // alert(this.value26)
          }
          if (key === 'warranty_startdate') {
            this.value27 = value
            // alert(this.value27)
          }
        }
        // await axios
        //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        //   .then((response) => {
        //     this.info = response.data.bpi
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //     this.errored = true
        //   })
        //   .finally(() => (this.loading = false))
        // await axios.post('http://203.150.221.207:4000/user/forDoh', this.object)
        //   .then(function (response) {
        //     alert(response.data)
        //     alert('misson complete')
        //   })
        //   .catch(function (error) {
        //     console.log(error)
        //   })

        // alert('end try loop')
        // alert(pupan1.data)
        // alert(pupan1.message)
        // alert(pupan1.status)
        // alert(pupan1.data[0])
        // this.isMounted = true
      } catch (err) {
        this.$router.push('/error')
        // alert(' error')
        alert(err)
        // console.log(err) // handle errors here...
      }

      // },
      // render () {
      //   if (this.state.result !== '') {
      //     if (this.state.action === 'get-check') {
      //       if (this.state.data === null) {
      //         this.getDataGetCheck()
      //       } else {
      //         return (
      //           <Redirect
      //             to={{
      //               pathname: '/info',
      //               state: this.state.data
      //             }}
      //           />
      //         )
      //       }
      //     }
      //   }
      //   return (
      //     <div>
      //       <QrReader
      //         delay={300}
      //         onError={this.handleError}
      //         onScan={this.handleScan}
      //         style={{ width: '100%' }}
      //       />
      //     </div>
      //   )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
